"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import {
  Circle,
  Headphones,
  Loader2,
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  Sparkles,
  User,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: any;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type MessageItem = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  const [speakerStatus, setSpeakerStatus] = useState<"Doctor" | "You" | "Listening" | "Idle">("Idle");
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch session details on mount
  useEffect(() => {
    if (sessionId) {
      GetSessionDetails();
    }
  }, [sessionId]);

  // Real-time call duration timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callStarted) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callStarted]);

  // Auto-scroll chat transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, liveTranscript]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
      setSessionDetail(result.data);
    } catch (error) {
      console.error("Error fetching session:", error);
      toast.error("Failed to load session details.");
    }
  };

  const StartCall = async () => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID;

    if (!apiKey) {
      toast.error("Vapi API key not found. Please set NEXT_PUBLIC_VAPI_API_KEY in your .env file.");
      return;
    }

    try {
      setLoading(true);
      const vapi = new Vapi(apiKey);
      setVapiInstance(vapi);

      const doctorSpecialist =
        sessionDetail?.selectedDoctor?.specialist || "General Physician";
      const patientNotes =
        sessionDetail?.notes || "General medical consultation and symptom review";
      const doctorPrompt =
        sessionDetail?.selectedDoctor?.agentPrompt || "";

      // Comprehensive clinical voice prompt instructing active, continuous follow-up questions
      const consultationSystemPrompt = `
You are Dr. AI, an attentive, empathetic, and expert medical doctor practicing as a ${doctorSpecialist}.
You are conducting a thorough, real-time voice medical consultation with a patient.

PATIENT INITIAL NOTES & SYMPTOMS:
"${patientNotes}"

DOCTOR SPECIALTY PROTOCOL:
${doctorPrompt}

CRITICAL RULES FOR ACTIVE VOICE COMMUNICATION:
1. COMPLETE, NATURAL COMMUNICATION (DO NOT CUT OFF):
   - Always speak in full, natural, grammatically complete sentences.
   - Deliver 2 to 3 calm, warm, and articulate sentences per turn. Never give one-word answers or stop mid-thought.
   - NEVER say "goodbye", "bye", "take care", "have a great day", or conclude the call prematurely.
   - Maintain the consultation actively by asking relevant medical follow-up questions until the patient explicitly states they are done.

2. SYSTEMATIC CLINICAL INQUIRY:
   - Greet the patient warmly and directly address their stated symptoms: "${patientNotes}".
   - Systematically investigate their condition:
     * When did the symptoms first start, and how have they progressed?
     * How severe is the discomfort on a scale of 1 to 10?
     * Exact sensations (throbbing, sharp, aching, burning, pressure)?
     * Any accompanying symptoms (fever, chills, nausea, dizziness, shortness of breath, fatigue)?
     * Any known triggers, recent exposures, or factors that provide relief?
     * Any current medications, allergies, or past medical conditions?
   - Ask ONE or at most TWO focused questions per turn, then pause and allow the patient to respond.

3. EMPATHY & PATIENT CARE:
   - Acknowledge what the patient says before moving to the next question.
   - Reassure the patient and explain potential causes in simple, calming terms.
   - Highlight any red flag warning signs that would require urgent emergency care.
   - Remind them that your evaluation is clinical AI guidance, and an in-person physical doctor examination is recommended for definitive diagnosis.
`.trim();

      const initialGreeting = `Hello! I am your AI ${doctorSpecialist}. I reviewed your notes regarding "${patientNotes}". I am here to examine this thoroughly with you. Could you please tell me how you are feeling right now, and when this first began?`;

      // Assistant overrides configured to prevent false interruptions, echo cutoffs, and premature hang-ups
      const assistantOverrides: any = {
        firstMessage: initialGreeting,
        firstMessageInterruptionsEnabled: false,
        model: {
          provider: "openai",
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: consultationSystemPrompt,
            },
          ],
          maxTokens: 500,
          temperature: 0.6,
        },
        voice: {
          provider: "vapi",
          voiceId: (() => {
            const raw = sessionDetail?.selectedDoctor?.voiceId;
            if (!raw) return "Elliot";
            const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
            const valid = ["Elliot", "Cole", "Harry", "Spencer", "Neha", "Kylie", "Savannah", "Paige", "Rohan", "Lily", "Hana"];
            return valid.includes(capitalized) ? capitalized : "Elliot";
          })(),
        },
        // Anti-cutoff settings: require at least 2 distinct words to interrupt, avoiding breath/speaker echo cutoff
        stopSpeakingPlan: {
          numWords: 2,
          voiceSeconds: 0.5,
          backoffSeconds: 1.0,
        },
        // Comfortable pause before the doctor begins speaking so patient isn't interrupted while thinking
        startSpeakingPlan: {
          waitSeconds: 0.8,
          smartEndpointingEnabled: true,
        },
        maxDurationSeconds: 1800, // 30 minutes
        // Neutralized endCallPhrases prevents common words like "goodbye" / "take care" from hanging up
        endCallPhrases: [
          "patient explicitly requested to terminate the medical consultation now",
        ],
        variableValues: {
          notes: patientNotes,
          specialist: doctorSpecialist,
        },
      };

      const parseErrorMessage = (err: any): string => {
        if (!err) return "Voice assistant error occurred";
        if (typeof err === "string") return err;
        if (Array.isArray(err.message)) return err.message.join(", ");
        if (typeof err.message === "string") return err.message;
        if (err.error) {
          if (typeof err.error === "string") return err.error;
          if (Array.isArray(err.error.message)) return err.error.message.join(", ");
          if (typeof err.error.message === "string") return err.error.message;
        }
        return "Voice assistant error occurred. Please check microphone permissions.";
      };

      // Event listeners
      vapi.on("call-start", () => {
        console.log("Call started");
        setCallStarted(true);
        setLoading(false);
        setSpeakerStatus("Listening");
        toast.success("Connected to your AI Doctor!");
      });

      vapi.on("call-end", () => {
        console.log("Call ended");
        setCallStarted(false);
        setSpeakerStatus("Idle");
        setLiveTranscript("");
      });

      vapi.on("error", (error: any) => {
        console.error("Vapi Error:", error);
        setLoading(false);
        const msg = parseErrorMessage(error);
        toast.error(msg);
      });

      vapi.on("call-start-failed", (error: any) => {
        console.error("Vapi Call Start Failed:", error);
        setCallStarted(false);
        setLoading(false);
        const msg = parseErrorMessage(error);
        toast.error(msg || "Failed to start voice call. Check your microphone and Vapi API keys.");
      });

      vapi.on("message", (message: any) => {
        if (message.type === "transcript") {
          const { role, transcriptType, transcript } = message;
          if (transcriptType === "partial") {
            setLiveTranscript(transcript);
            setSpeakerStatus(role === "assistant" ? "Doctor" : "You");
          } else if (transcriptType === "final") {
            setMessages((prev) => [
              ...prev,
              {
                role: role === "assistant" ? "Doctor" : "You",
                text: transcript,
              },
            ]);
            setLiveTranscript("");
            setSpeakerStatus("Listening");
          }
        }
      });

      vapi.on("speech-start", () => {
        setSpeakerStatus("Doctor");
      });

      vapi.on("speech-end", () => {
        setSpeakerStatus("Listening");
      });

      // Start the call
      if (assistantId) {
        await vapi.start(assistantId, assistantOverrides);
      } else {
        await vapi.start({
          name: `AI ${doctorSpecialist}`,
          ...assistantOverrides,
        });
      }
    } catch (err: any) {
      console.error("StartCall error:", err);
      toast.error(err?.message || "Failed to start consultation.");
      setLoading(false);
      setCallStarted(false);
    }
  };

  const toggleMute = () => {
    if (!vapiInstance) return;
    const nextMuted = !isMuted;
    vapiInstance.setMuted(nextMuted);
    setIsMuted(nextMuted);
    toast(nextMuted ? "Microphone Muted" : "Microphone Unmuted");
  };

  const endCall = async () => {
    if (vapiInstance) {
      vapiInstance.stop();
      vapiInstance.off("call-start");
      vapiInstance.off("call-end");
      vapiInstance.off("message");
      vapiInstance.off("speech-start");
      vapiInstance.off("speech-end");
      vapiInstance.off("error");
    }

    setCallStarted(false);
    setVapiInstance(null);
    setSpeakerStatus("Idle");

    if (messages.length > 0) {
      try {
        await GenerateReport();
        toast.success("Your medical report has been generated!");
      } catch (err) {
        console.error("Report generation error:", err);
      }
    }
    router.replace("/dashboard");
  };

  const GenerateReport = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/medical-report", {
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId,
      });
      return result.data;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Session Details & Voice Room Container */}
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-3.5 w-3.5 rounded-full ${
                callStarted ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
              }`}
            />
            <span className="font-medium text-sm">
              {callStarted
                ? speakerStatus === "Doctor"
                  ? "Doctor Speaking..."
                  : speakerStatus === "You"
                  ? "Listening to You..."
                  : "Connected & Listening"
                : "Not Connected"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-sm font-mono font-semibold">
              ⏱️ {formatDuration(callDuration)}
            </div>
          </div>
        </div>

        {/* Doctor Identity & Consultation Banner */}
        {sessionDetail ? (
          <div className="p-6 md:p-8 flex flex-col items-center text-center">
            <div className="relative">
              <div
                className={`absolute -inset-2 rounded-full blur-md transition-all duration-500 ${
                  callStarted && speakerStatus === "Doctor"
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500 opacity-70 scale-105"
                    : "opacity-0"
                }`}
              />
              <Image
                src={
                  sessionDetail?.selectedDoctor?.image ||
                  "/doctor-placeholder.png"
                }
                alt={sessionDetail?.selectedDoctor?.specialist || "Doctor"}
                width={120}
                height={120}
                className="relative h-28 w-28 object-cover rounded-full border-4 border-white dark:border-neutral-800 shadow-lg"
              />
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight">
              Dr. AI ({sessionDetail?.selectedDoctor?.specialist || "General Physician"})
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mt-1">
              {sessionDetail?.selectedDoctor?.description}
            </p>

            {/* Patient Symptoms Card */}
            {sessionDetail?.notes && (
              <div className="mt-4 p-3 px-5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 max-w-lg text-xs md:text-sm text-neutral-600 dark:text-neutral-300">
                <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                  Your Consultation Notes:
                </span>{" "}
                "{sessionDetail.notes}"
              </div>
            )}

            {/* Audio Tip */}
            <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <Headphones className="w-3.5 h-3.5" />
              <span>
                Tip: Wear headphones or keep speaker volume moderate to prevent mic echo.
              </span>
            </div>

            {/* Live Conversation Transcript Display */}
            <div className="w-full max-w-3xl mt-8">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <span>Live Consultation Dialogue</span>
                <span>{messages.length} messages</span>
              </div>

              <div className="h-64 md:h-80 overflow-y-auto p-4 space-y-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/80 text-left mt-3">
                {messages.length === 0 && !liveTranscript && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 text-sm">
                    <Sparkles className="w-8 h-8 mb-2 opacity-50 text-teal-500" />
                    <p>Press "Start Consultation" to begin your voice conversation.</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Your AI specialist will greet you and ask in-depth questions about your symptoms.
                    </p>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      msg.role === "Doctor" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {msg.role === "Doctor" && (
                      <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-bold shrink-0">
                        Dr
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                        msg.role === "Doctor"
                          ? "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 shadow-sm border border-neutral-200/60 dark:border-neutral-700/60"
                          : "bg-teal-600 text-white"
                      }`}
                    >
                      <p className="text-[11px] font-semibold mb-1 opacity-70">
                        {msg.role === "Doctor" ? sessionDetail?.selectedDoctor?.specialist : "You"}
                      </p>
                      <p>{msg.text}</p>
                    </div>
                    {msg.role !== "Doctor" && (
                      <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 flex items-center justify-center text-xs shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Real-time streaming partial transcript */}
                {liveTranscript && (
                  <div
                    className={`flex gap-3 ${
                      speakerStatus === "Doctor" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`p-3.5 rounded-2xl max-w-[80%] text-sm leading-relaxed border animate-pulse ${
                        speakerStatus === "Doctor"
                          ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                          : "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200"
                      }`}
                    >
                      <p className="text-[11px] font-semibold mb-1 opacity-75">
                        {speakerStatus === "Doctor"
                          ? `${sessionDetail?.selectedDoctor?.specialist} (Speaking...)`
                          : "You (Speaking...)"}
                      </p>
                      <p>{liveTranscript}</p>
                    </div>
                  </div>
                )}
                <div ref={transcriptEndRef} />
              </div>
            </div>

            {/* Action Buttons & Call Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {!callStarted ? (
                <Button
                  size="lg"
                  className="px-8 py-6 rounded-2xl text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
                  onClick={StartCall}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <PhoneCall className="h-5 w-5 mr-2" />
                  )}
                  Start Medical Consultation
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Mute Button */}
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={toggleMute}
                    className={`rounded-2xl px-5 py-6 cursor-pointer border ${
                      isMuted
                        ? "bg-red-50 dark:bg-red-950/40 border-red-300 text-red-600"
                        : "border-neutral-300 dark:border-neutral-700"
                    }`}
                  >
                    {isMuted ? (
                      <>
                        <MicOff className="h-5 w-5 mr-2 text-red-600" />
                        Unmute Mic
                      </>
                    ) : (
                      <>
                        <Mic className="h-5 w-5 mr-2" />
                        Mute Mic
                      </>
                    )}
                  </Button>

                  {/* End Consultation Button */}
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={endCall}
                    disabled={loading}
                    className="px-8 py-6 rounded-2xl text-base font-semibold shadow-lg shadow-red-500/20 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <PhoneOff className="h-5 w-5 mr-2" />
                    )}
                    End Consultation & Generate Report
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center text-neutral-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
            <p>Loading consultation session...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;
