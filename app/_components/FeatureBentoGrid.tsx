"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Activity,
  CheckCircle2,
  FileText,
  HeartPulse,
  Mic,
  Shield,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Volume2,
  Clock,
} from "lucide-react";

export function FeatureBentoGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          Clinical Intelligence Architecture
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Engineered for Medical Precision & Empathy
        </h2>
        <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Combining ultra-low latency voice processing, specialized medical protocols, and instant clinical documentation.
        </p>
      </div>

      <BentoGrid className="md:auto-rows-[22rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-sm]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

// 1. Voice Visualizer Header
const VoiceVisualizer = () => {
  const bars = [40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65, 90, 55, 75];
  return (
    <div className="flex flex-col justify-between w-full h-full min-h-[7rem] p-4 rounded-xl bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent border border-teal-500/20">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          Live Voice Stream • Vapi AI
        </span>
        <span className="text-[11px] font-mono text-neutral-400">
          &lt;400ms latency
        </span>
      </div>

      {/* Animated Waveform */}
      <div className="flex items-center justify-center gap-1.5 py-4">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-teal-600 to-emerald-400"
            initial={{ height: "20%" }}
            animate={{
              height: [`${Math.max(15, height * 0.3)}%`, `${height}%`, `${Math.max(15, height * 0.4)}%`],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 bg-white/70 dark:bg-neutral-900/70 p-2 rounded-lg border border-neutral-200/50 dark:border-neutral-800">
        <span className="flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-teal-600" /> Natural Cadence
        </span>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
          Zero Word Cutoff
        </span>
      </div>
    </div>
  );
};

// 2. Multi-Specialist Matching
const SpecialistMatcher = () => {
  const matches = [
    { symptom: "Persistent Migraine & Photophobia", specialist: "General Physician", tag: "Matched" },
    { symptom: "Sudden Skin Rash & Itching", specialist: "Dermatologist", tag: "Matched" },
    { symptom: "Child Fever & Sore Throat", specialist: "Pediatrician", tag: "Matched" },
  ];

  return (
    <div className="flex flex-col justify-between w-full h-full min-h-[7rem] p-3 space-y-2 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800">
      <div className="text-[11px] font-semibold uppercase text-neutral-400 tracking-wider">
        Intelligent Clinical Triage
      </div>
      <div className="space-y-2">
        {matches.map((m, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-xs shadow-xs"
          >
            <div className="truncate max-w-[60%]">
              <p className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                "{m.symptom}"
              </p>
              <p className="text-[10px] text-teal-600 dark:text-teal-400">
                ➔ {m.specialist}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-700/60">
              {m.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Clinical Summary / Report Preview
const ReportPreview = () => {
  return (
    <div className="w-full h-full min-h-[7rem] p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-xs">
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          <FileText className="w-3.5 h-3.5 text-teal-600" /> Clinical Assessment
        </span>
        <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-medium">
          Ready to Export
        </span>
      </div>

      <div className="space-y-1.5 text-[11px] text-neutral-600 dark:text-neutral-300">
        <div className="flex justify-between">
          <span className="text-neutral-400">Chief Complaint:</span>
          <span className="font-medium text-right truncate max-w-[150px]">
            Acute Sinus Pressure & Fever
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-400">Severity & Duration:</span>
          <span className="font-medium text-amber-600 dark:text-amber-400">
            Moderate (6/10) • 4 Days
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-400">Suggested Action:</span>
          <span className="font-medium text-teal-600 dark:text-teal-400">
            Saline Rinse & Rest
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
        <span>Neon PostgreSQL Persisted</span>
        <span className="flex items-center gap-1 text-emerald-600">
          <CheckCircle2 className="w-3 h-3" /> Auto-Generated
        </span>
      </div>
    </div>
  );
};

// 4. Clinical Safety & Red Flag Screening (Spans 2 columns)
const RedFlagScreening = () => {
  return (
    <div className="flex flex-col justify-between w-full h-full min-h-[7rem] p-4 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white border border-neutral-700 shadow-md">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <Shield className="w-4 h-4 text-emerald-400" />
          Continuous Clinical Safety Guardian
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
          Active Surveillance
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
        <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700">
          <p className="text-[11px] text-neutral-400">Rule 1</p>
          <p className="text-xs font-semibold text-neutral-200 mt-0.5">
            Systematic Inquiries
          </p>
          <p className="text-[10px] text-neutral-400 mt-1">
            Onset, pain scale (1-10), triggers & medication checks.
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700">
          <p className="text-[11px] text-neutral-400">Rule 2</p>
          <p className="text-xs font-semibold text-amber-400 mt-0.5">
            Red Flag Triage
          </p>
          <p className="text-[10px] text-neutral-400 mt-1">
            Detects acute cardiac, respiratory, or neurological warning signs.
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700">
          <p className="text-[11px] text-neutral-400">Rule 3</p>
          <p className="text-xs font-semibold text-emerald-400 mt-0.5">
            Safe Next Steps
          </p>
          <p className="text-[10px] text-neutral-400 mt-1">
            Guides patients to emergency care or in-person physician visits.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-700/60">
        <span>Patient Safety First</span>
        <span className="text-neutral-300">Evidence-based triage protocols</span>
      </div>
    </div>
  );
};

// 5. 24/7 Availability & Encrypted Voice
const AvailabilityBadge = () => {
  return (
    <div className="flex flex-col justify-between w-full h-full min-h-[7rem] p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Clock className="w-3.5 h-3.5 text-emerald-500" /> Instant Access
        </span>
        <span className="text-[11px] font-mono text-emerald-600 font-semibold">
          24/7/365
        </span>
      </div>

      <div className="py-2 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-2">
          <HeartPulse className="w-6 h-6 animate-pulse" />
        </div>
        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          Zero Waiting Rooms
        </p>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Immediate medical voice response whenever symptoms arise.
        </p>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-medium">
        <span>🔒 Fully Encrypted & Confidential</span>
      </div>
    </div>
  );
};

const items = [
  {
    title: "Conversational Clinical Voice",
    description: (
      <span>
        Natural, human-like voice communication that actively listens and never abruptly cuts off.
      </span>
    ),
    header: <VoiceVisualizer />,
    className: "md:col-span-1",
    icon: <Mic className="h-4 w-4 text-teal-600" />,
  },
  {
    title: "Specialist Matching Engine",
    description: (
      <span>
        Intelligently routes patient symptoms to General Physicians, Pediatricians, Cardiologists, and more.
      </span>
    ),
    header: <SpecialistMatcher />,
    className: "md:col-span-1",
    icon: <Stethoscope className="h-4 w-4 text-teal-600" />,
  },
  {
    title: "Automated Clinical Reports",
    description: (
      <span>
        Instant structured summaries documenting chief complaint, severity, timeline, and recommendations.
      </span>
    ),
    header: <ReportPreview />,
    className: "md:col-span-1",
    icon: <FileText className="h-4 w-4 text-teal-600" />,
  },
  {
    title: "Continuous Clinical Safety & Red Flag Surveillance",
    description: (
      <span>
        Actively probes symptom severity and onset while continuously screening for emergency red flags.
      </span>
    ),
    header: <RedFlagScreening />,
    className: "md:col-span-2",
    icon: <ShieldAlert className="h-4 w-4 text-amber-500" />,
  },
  {
    title: "24/7 On-Demand Healthcare",
    description: (
      <span>
        Zero hold times. Consult specialized AI doctors right from your web browser with complete privacy.
      </span>
    ),
    header: <AvailabilityBadge />,
    className: "md:col-span-1",
    icon: <Activity className="h-4 w-4 text-emerald-600" />,
  },
];
