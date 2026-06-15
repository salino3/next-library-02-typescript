import "server-only"; // 🛡️ Security Guard
import { Groq } from "groq-sdk";
import { aiQuery } from "./db";
import {
  SearchAuthorResponse,
  SearchBookResponse,
} from "@/app/service/interface";
import { pageContextAi } from "@/app/store/interface";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const availableTools = [
  {
    type: "function" as const,
    function: {
      name: "executeSQL",
      description:
        "Executes a read-only PostgreSQL query to extract real-time library assets. Use ONLY when specific filters (price, pages, titles, authors) are detected. ONLY SELECT queries are permitted.",
      parameters: {
        type: "object",
        properties: {
          sqlSentence: {
            type: "string",
            description:
              "The raw PostgreSQL query statement. Schema tables: 'books' (id, title, price, pages, author_id), 'authors' (id, name, bio).",
          },
        },
        required: ["sqlSentence"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "reportVagueInput",
      description:
        "Call this function if the user prompt is conversational fluff, completely vague, or missing database filter parameters entirely.",
      parameters: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            description:
              "The specific reason why the prompt cannot be translated to a query.",
          },
        },
        required: ["reason"],
      },
    },
  },
];

export async function askLibraryAI(
  userPrompt: string,
  pageContext: pageContextAi,
): Promise<SearchAuthorResponse | SearchBookResponse> {
  // 🟢 LOG 1: Track what the user typed into the textarea
  console.log("=== 📥 STEP 1: AI ASSISTANT TRIGGERED ===");
  console.log("User Input Received:", userPrompt);

  const messages: any[] = [
    {
      role: "system",
      content: `You are a strict natural-language-to-SQL compiler for a library app. The user is currently on the "${pageContext}" page.
    
    CRITICAL READ-ONLY SECURITY RULES:

    1. You are strictly a READ-ONLY service. You are only allowed to generate "SELECT" statements to fetch data.
    2. You must NEVER generate statements that modify, create, update, or destroy data, tables or data base (e.g., NO "INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "CREATE", "TRUNCATE", etc.).
    3. If a user explicitly asks you to change, delete, add, or modify anything in the database, you MUST consider this an invalid request and call 'reportVagueInput' stating that modifications are disallowed.

    CRITICAL INSTRUCTIONS:
    1. Ignore conversational greetings, pleasantries, or introductory phrases (like "Hi", "Hello", "I am searching for", "please give me").
    2. Isolate ONLY the core data request filters (e.g., price, pages, titles, authors) mentioned by the user.
    3. Generate a clean, read-only SQL SELECT statement based purely on those core filters.
    4. If you don't understand what user wants, you must call 'reportVagueInput' with a helpful error explanation. Do NOT guess a query

    SCHEMA DETAILS:
    - Table 'books' columns: id, title, price, pages, author_id
    - Table 'authors' columns: id, name, bio`,
    },
    { role: "user", content: userPrompt },
  ];

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: messages,
    tools: availableTools,
    tool_choice: "auto", // 🌟 Allows Groq to choose between SQL or Reporting an error dynamically!
  });

  const toolCalls = response.choices[0].message.tool_calls;

  if (!toolCalls || toolCalls.length === 0) {
    throw new Error(
      "The AI Assistant could not process this request. Please add search parameters.",
    );
  }
  // 🟡 LOG 2: Check if Groq actually attempted to use the tool
  console.log("=== 🤖 STEP 2: GROQ RESPONSE ===");
  console.log("Did Groq call a tool?:", !!toolCalls);
  const selectedTool = toolCalls[0].function.name;

  // ❌ CASE A: Groq explicitly recognized the input as unmappable/vague
  if (selectedTool === "reportVagueInput") {
    const args = JSON.parse(toolCalls[0].function.arguments);
    console.warn("⚠️ AI flagged input as vague. Reason given:", args.reason);

    // Throwing an error breaks the pipeline cleanly and routes it directly to state.error on the frontend!
    throw new Error(`Unclear Request: ${args.reason}`);
  }

  //  CASE B: Clean path to database query
  if (selectedTool === "executeSQL") {
    const args = JSON.parse(toolCalls[0].function.arguments);
    const rawSql = args.sqlSentence.trim();

    console.log("=== 📜 STEP 3: SQL STATEMENT GENERATED ===");
    console.log("SQL Query Text:", rawSql);

    if (!rawSql.toLowerCase().startsWith("select")) {
      throw new Error(
        "Security Violation: Only SELECT statements are permitted.",
      );
    }

    try {
      const dbResult = await aiQuery(rawSql);
      console.log(
        `=== 🗄️ DATABASE RESULTS ROWS: (${dbResult.rows.length}) ===`,
      );

      return {
        total: dbResult.rows.length,
        results: dbResult.rows,
      };
    } catch (dbError: any) {
      console.error("=== ❌ DATABASE EXECUTION FAILURE ===");
      throw new Error(
        "Failed to execute database lookup. Please adjust your text parameters.",
      );
    }
  }

  throw new Error("Unexpected routing error processing query parameters.");
}
