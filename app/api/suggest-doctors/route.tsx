import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const{notes}=await req.json();
    try {
        if (process.env.OPEN_ROUTER_API_KEY) {
            const completion = await openai.chat.completions.create({
              model: "google/gemma-3n-e4b-it",
              messages: [
                {role:"system",content:JSON.stringify (AIDoctorAgents)},
                { role: "user", content: "User Notes/Symptoms:"+notes+", Depends on user notes and symptoms, Please suggest list of doctors, Return Object in JSON only" },
            ],
            });

            const rawResp=completion.choices[0].message?.content||"";
            //@ts-ignore
            const Resp=rawResp.trim().replace(/```json/g,'').replace(/```/g,'')
            const JSONResp=JSON.parse(Resp);
            
            if (Array.isArray(JSONResp) && JSONResp.length > 0) {
              return NextResponse.json(JSONResp);
            }
        }

        // Fallback: match symptoms against doctor descriptions
        const lowerNotes = (notes || "").toLowerCase();
        let matched = AIDoctorAgents.filter((doc) => {
          const spec = doc.specialist.toLowerCase();
          const desc = doc.description.toLowerCase();
          return lowerNotes.includes(spec) || lowerNotes.split(/\s+/).some((w: string) => w.length > 3 && desc.includes(w));
        });

        if (matched.length === 0) {
          matched = [AIDoctorAgents[0], AIDoctorAgents[1], AIDoctorAgents[2]];
        }
        return NextResponse.json(matched);
    } catch (e) {
        console.error("Suggest doctors error:", e);
        return NextResponse.json([AIDoctorAgents[0], AIDoctorAgents[1], AIDoctorAgents[2]]);
    }
}