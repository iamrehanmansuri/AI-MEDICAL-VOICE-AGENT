import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an Al Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and Conversation between AI medical agent and user , generate a structured report with the following fields:

1. sessionld: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician Al")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned 
11. recommendations: list of Al suggestions (e.g., rest, see a doctor)

Return the result in this JSON format:
{
 "sessionld": "string",
 "agent": "string", 
 "user": "string",
 "timestamp": "ISO Date string",
 "chiefComplaint": "string",
 "summary": "string",
 "symptoms": ["symptom1", "symptom2"],
 "duration": "string",
 "severity": "string",
 "medicationsMentioned": ["med1", "med2"],
 "recommendations": ["rec1", "rec2"],
}

Only include valid fields. Respond with nothing else.
`;

export async function POST(req: NextRequest) {
  const { sessionId, sessionDetail, messages } = await req.json();

  const fallbackReport = {
    sessionId: sessionId,
    agent: sessionDetail?.selectedDoctor?.specialist || "General Physician AI",
    user: "User",
    timestamp: new Date().toISOString(),
    chiefComplaint: sessionDetail?.notes || "General medical consultation",
    summary:
      "Patient completed voice consultation with AI Medical Specialist. Conversation reviewed symptoms and medical recommendations.",
    symptoms: [sessionDetail?.notes || "Consultation symptoms discussed"],
    duration: "Recent",
    severity: "mild",
    medicationsMentioned: [],
    recommendations: [
      "Stay hydrated and get adequate rest",
      "Monitor symptoms closely",
      "Follow up with a healthcare professional if symptoms persist or worsen",
    ],
  };

  try {
    let reportData = fallbackReport;

    if (process.env.OPEN_ROUTER_API_KEY) {
      const UserInput =
        "AI Doctor Agent Info:" +
        JSON.stringify(sessionDetail) +
        ",Conversation:" +
        JSON.stringify(messages);
      const completion = await openai.chat.completions.create({
        model: "google/gemma-3n-e4b-it",
        messages: [
          { role: "system", content: REPORT_GEN_PROMPT },
          { role: "user", content: UserInput },
        ],
      });

      const rawResp = completion.choices[0].message?.content || "";
      //@ts-ignore
      const Resp = rawResp.trim().replace(/```json/g, "").replace(/```/g, "");
      reportData = JSON.parse(Resp);
    }

    if (process.env.DATABASE_URL) {
      await db
        .update(SessionChatTable)
        .set({
          report: reportData,
          conversation: messages,
        })
        .where(eq(SessionChatTable.sessionId, sessionId));
    }

    return NextResponse.json(reportData);
  } catch (e) {
    console.error("Medical report error:", e);
    return NextResponse.json(fallbackReport);
  }
}