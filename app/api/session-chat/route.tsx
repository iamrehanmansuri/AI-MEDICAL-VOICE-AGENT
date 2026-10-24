import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

// In-memory cache for development/demo when DATABASE_URL is not provided
const fallbackSessions = new Map<string, any>();

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();
  const user = await currentUser();
  const sessionId = uuidv4();

  const sessionData = {
    id: Date.now(),
    sessionId: sessionId,
    createdBy: user?.primaryEmailAddress?.emailAddress || "guest@example.com",
    notes: notes,
    selectedDoctor: selectedDoctor,
    createdOn: new Date().toString(),
  };

  fallbackSessions.set(sessionId, sessionData);

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(sessionData);
  }

  try {
    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId: sessionId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toString(),
      }) //@ts-ignore
      .returning({ SessionChatTable });

    return NextResponse.json(result[0]?.SessionChatTable || sessionData);
  } catch (e) {
    console.error("Database session save error:", e);
    return NextResponse.json(sessionData);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  const cached = fallbackSessions.get(sessionId);

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(cached || null);
  }

  try {
    const result = await db
      .select()
      .from(SessionChatTable)
      //@ts-ignore
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(result[0] || cached || null);
  } catch (e) {
    console.error("Database session fetch error:", e);
    return NextResponse.json(cached || null);
  }
}
