import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// This file is automatically forced to run on the server only
// route.ts files inside the src/app/api/... are already "server-only" by dafault
export async function GET() {
  try {
    const result = await query("SELECT NOW() as current_time;");

    return NextResponse.json(
      {
        success: true,
        message: "Connected to PostgreSQL from Next.js server!",
        timestamp: result.rows[0].current_time,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Next.js DB query failed:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Database Error" },
      { status: 500 },
    );
  }
}
