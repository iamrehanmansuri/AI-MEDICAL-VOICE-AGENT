"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import Vapi from "@vapi-ai/web";
import { IconPhoneEnd } from "@tabler/icons-react";
import { div } from "motion/react-client";
import { toast } from "sonner";

type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRoll, setCurrentRoll] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get(
        "/api/session-chat?sessionId=" + sessionId
      );
      console.log("API Response:", result.data);
      setSessionDetail(result.data);
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  const StartCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "vapi",
        voiceId: sessionDetail?.selectedDoctor?.voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-5 mini",
        messages: [
          {
            role: "system",
            content: sessionDetail?.selectedDoctor?.agentPrompt,
          },
        ],
      },
    };

    //@ts-ignore
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
    });
    vapi.on("call-end", () => {
      setCallStarted(false);
      console.log("Call ended");
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType == "partial") {
          setLiveTranscript(transcript);
          setCurrentRoll(role);
        } else if (transcriptType == "final") {
          // Final Transcript
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRoll(null);
        }
      }
    });

    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrentRoll("Assistance");
    });
    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrentRoll("User");
    });
  };

  const endCall = () => {
    if (!vapiInstance) return;

    //Stop the call
    vapiInstance.stop();
    //Optionally remove listeners (good for memory management)
    vapiInstance.off("call-start");
    vapiInstance.off("call-end");
    vapiInstance.off("message");

    //Reset call state
    setCallStarted(false);
    setVapiInstance(null);
    toast.success("Your report is generated!");
    router.replace("/dashboard");
  };

  const GenerateReport = async () => {
    setLoading(true);
    const result = await axios.post("/api/medical-report", {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    });

    console.log(result.data);
    return result.data;
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      {/* Header with Status + Timer */}
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`w-4 h-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {/* Session Details */}
      {sessionDetail ? (
        <div className="flex items-center flex-col mt-10">
          {/* Doctor Image */}
          <Image
            src={
              sessionDetail?.selectedDoctor?.image || "/doctor-placeholder.png"
            }
            alt={sessionDetail?.selectedDoctor?.specialist || "Doctor"}
            width={120}
            height={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />

          {/* Doctor Info */}
          <h2 className="mt-2 text-lg">
            {sessionDetail?.selectedDoctor?.specialist || "General Doctor"}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          {/* Messages */}
          <div className="mt-12 text-center overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-4).map((msg: messages, index) => (
              <h2 className="text-gray-400 p-2" key={index}>
                {msg.role} : {msg.text}
              </h2>
            ))}

            {liveTranscript && liveTranscript?.length > 0 && (
              <h2 className="text-lg">
                {currentRoll} : {liveTranscript}
              </h2>
            )}
          </div>

          {/* Start Call Button */}
          {!callStarted ? (
            <Button
              className="mt-20 flex gap-2 items-center cursor-pointer"
              onClick={StartCall}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin " /> : <PhoneCall />}{" "}
              Start Call
            </Button>
          ) : (
            <Button
              variant={"destructive"}
              onClick={endCall}
              disabled={loading}
              className="mt-20 flex gap-2 items-center cursor-pointer"
            >
              {" "}
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <PhoneOff />
              )}{" "}
              Disconnected
            </Button>
          )}
        </div>
      ) : (
        <p className="mt-10 text-center text-gray-400">
          Loading session details...
        </p>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
