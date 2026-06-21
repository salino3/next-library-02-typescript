import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

// Initialize Groq SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

export async function POST(request: Request) {
  try {
    // 1️⃣ Extract input from your frontend request
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 },
      );
    }

    if (!FIRECRAWL_API_KEY) {
      return NextResponse.json(
        { error: "FIRECRAWL_API_KEY is not configured on the server" },
        { status: 500 },
      );
    }

    // 2️⃣ Call Firecrawl's global web search engine
    const firecrawlResponse = await fetch(
      "https://api.firecrawl.dev/v2/search",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `${query} book page count author biography history summary`,
          limit: 3,
        }),
      },
    );

    if (!firecrawlResponse.ok) {
      const errorText = await firecrawlResponse.text();
      console.error("Firecrawl API error response:", errorText);
      return NextResponse.json(
        { error: "Failed to extract web data from Firecrawl" },
        { status: 500 },
      );
    }

    const searchData = await firecrawlResponse.json();

    // Firecrawl can return items inside .data, .results, or directly as the object if it's an array root
    // 1️⃣ Extract the clean search array from the 'web' key provided by Firecrawl
    const searchItems = Array.isArray(searchData)
      ? searchData
      : searchData.web || searchData.data || searchData.results || [];

    if (!searchItems || searchItems.length === 0) {
      return NextResponse.json(
        { error: "No relevant web data found for this book query" },
        { status: 404 },
      );
    }

    // 2️⃣ Build the context safely. We rename the inner parameter to 'resultItem' to avoid any 'web' keyword clashes!
    const webContext = searchItems.web
      .map((resultItem: any) => {
        const title = resultItem?.title || "Untitled";
        const url = resultItem?.url || "N/A";
        const content =
          resultItem?.markdown ||
          resultItem?.description ||
          resultItem?.snippet ||
          "";

        return `Source Title: ${title}\nURL: ${url}\nContent:\n${content}`;
      })
      .join("\n\n---\n\n");

    // 3️⃣ Send the rich clean data to Groq for strict structural parsing
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a rigid data processing compiler. Your single duty is to process raw markdown web results and format them into a valid JSON object matching the user's TARGET SCHEMA.
      
      EXTRACTION SPECIFICATIONS:
      1. "author_data.name": Extract the accurate author's full name.
      2. "author_data.bio": Summarize a professional, clean biography (maximum 3 or 4 sentences).
      3. "book_data.title": Extract the official metadata book title.
          4. "book_data.price": Find or estimate a standard retail whole integer pricing number (e.g. 15, 24, 45). It must be a raw NUMBER/INTEGER, not a string.
          5. "book_data.pages": Locate the actual page count. Must be a raw NUMBER/INTEGER (e.g. 100, 125, 450). If not found in the text, it can be null, .
      
      CRITICAL OUTPUT RULES:
      - Return EXCLUSIVELY raw JSON.
      - Do NOT include markdown code block backticks (like \`\`\`json ... \`\`\`).
      - Do NOT include any conversational intros or trailing explanations. The very first character must be '{' and the very last character must be '}'.
      
      TARGET FORM JSON SCHEMA:
      {
        "author_data": {
          "name": "string",
          "bio": "string"
        },
        "book_data": {
          "title": "string",
          "price": number or null,
          "pages": number or null
        }
      }`,
        },
        {
          role: "user",
          content: `User Book Search Target: "${query}"\n\nFirecrawl Gathered Web Data:\n${webContext}`,
        },
      ],
      temperature: 0.1,
    });

    const aiCleanPayloadString =
      chatCompletion.choices[0]?.message?.content?.trim() || "{}";

    // 4️⃣ Verify that Groq returned true valid JSON before passing it to Next.js components
    const structuredResponse = JSON.parse(aiCleanPayloadString);

    return NextResponse.json(structuredResponse);
  } catch (error: any) {
    console.error("AI Auto-Generation Pipeline Crashed:", error);
    return NextResponse.json(
      {
        error: "Internal processing error during AI parsing execution",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
