import "server-only"; // 🛡️ Security Guard
import { Groq } from "groq-sdk";
import { aiQuery } from "./db";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const readOnlyTools = [
  {
    type: "function" as const,
    function: {
      name: "executeSQL",
      description:
        "Executes a read-only PostgreSQL query to extract real-time library assets. ONLY SELECT queries are permitted.",
      parameters: {
        type: "object",
        properties: {
          sqlSentence: {
            type: "string",
            description:
              "The raw PostgreSQL query statement. Schema tables: 'books' (columns: id, title, price, pages, author_id), 'authors' (columns: id, name, bio).",
          },
        },
        required: ["sqlSentence"],
      },
    },
  },
];

export async function askLibraryAI(userPrompt: string): Promise<any[]> {
  // 🟢 LOG 1: Track what the user typed into the textarea
  console.log("=== 📥 STEP 1: AI ASSISTANT TRIGGERED ===");
  console.log("User Input Received:", userPrompt);

  const messages: any[] = [
    {
      role: "system",
      content: `You are a strict natural-language-to-SQL compiler.
    
    CRITICAL INSTRUCTIONS:
    1. Ignore conversational greetings, pleasantries, or introductory phrases (like "Hi", "Hello", "I am searching for", "please give me").
    2. Isolate ONLY the core data request filters (e.g., price, pages, titles, authors) mentioned by the user.
    3. Generate a clean, read-only SQL SELECT statement based purely on those core filters.
    
    SCHEMA DETAILS:
    - Table 'books' has columns: id, title, price, pages, author_id
    - Table 'authors' has columns: id, name, bio`,
    },
    { role: "user", content: userPrompt },
  ];

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: messages,
    tools: readOnlyTools,
    tool_choice: { type: "function", function: { name: "executeSQL" } },
  });

  const toolCalls = response.choices[0].message.tool_calls;

  // 🟡 LOG 2: Check if Groq actually attempted to use the tool
  console.log("=== 🤖 STEP 2: GROQ RESPONSE ===");
  console.log("Did Groq call a tool?:", !!toolCalls);

  if (toolCalls && toolCalls[0].function.name === "executeSQL") {
    const args = JSON.parse(toolCalls[0].function.arguments);
    const rawSql = args.sqlSentence.trim();

    // 🟠 LOG 3: See the EXACT SQL query string that Groq wrote
    console.log("=== 📜 STEP 3: SQL STATEMENT GENERATED ===");
    console.log("SQL Query Text:", rawSql);

    // 🛡️ Code-level security check
    if (!rawSql.toLowerCase().startsWith("select")) {
      console.error(
        "🛑 SECURITY EXCEPTION TRIGGERED: Query does not start with SELECT!",
      );
      throw new Error(
        "Security Violation: Only SELECT statements are permitted.",
      );
    }

    try {
      // 🌟 THE HIT: Run the statement on your read-only connection pool
      const dbResult = await aiQuery(rawSql);

      // 🔵 LOG 4: See the exact database rows returned by PostgreSQL
      console.log("=== 🗄️ STEP 4: DATABASE RESULTS ===");
      console.log(
        `Database Rows Found (${dbResult.rows.length}):`,
        dbResult.rows,
      );

      return dbResult.rows;
    } catch (dbError: any) {
      // 🔴 LOG 5: Catch database specific errors (syntax mistakes, etc.)
      console.error("=== ❌ DATABASE EXECUTION FAILURE ===");
      console.error("Error Message:", dbError.message);
      throw dbError;
    }
  }

  console.warn("⚠️ Groq did not generate a tool call.");
  return [];
}
