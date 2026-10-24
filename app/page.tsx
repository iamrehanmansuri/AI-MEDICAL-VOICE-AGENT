"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Headphones,
  HeartPulse,
  Lock,
  Mic,
  PhoneCall,
  Shield,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Users,
  Volume2,
} from "lucide-react";
import { AIDoctorAgents } from "@/shared/list";

export default function Home() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-teal-500/20 via-emerald-500/15 to-cyan-500/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Medical Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-white dark:bg-neutral-900 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shadow-xs mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <Stethoscope className="w-4 h-4 text-teal-600" />
            Next-Gen AI Telehealth • 24/7 Voice Clinical Care
          </motion.div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 max-w-4xl mx-auto leading-[1.15]">
            Compassionate Medical Care Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-600">
              Natural AI Voice
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            Speak naturally about your symptoms. Our specialized AI doctors actively listen, ask thorough clinical follow-up questions, and deliver personalized guidance with structured medical summaries.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <button className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-xl shadow-teal-600/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <PhoneCall className="w-5 h-5" />
                Start Voice Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="#specialists">
              <button className="flex items-center gap-2 px-6 py-4 rounded-2xl text-base font-medium bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:scale-[1.01] cursor-pointer">
                <Users className="w-5 h-5 text-teal-600" />
                Explore 10+ Specialists
              </button>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 text-left">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">10+ Specialists</p>
                <p className="text-xs text-neutral-500">Board-aligned triage</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">&lt;400ms Voice</p>
                <p className="text-xs text-neutral-500">Ultra-low latency Vapi</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">24/7 Accessible</p>
                <p className="text-xs text-neutral-500">Zero waiting rooms</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">100% Private</p>
                <p className="text-xs text-neutral-500">Encrypted clinical data</p>
              </div>
            </div>
          </div>

          {/* Interactive Medical Voice Consultation Console Mockup (Replaces generic builder screenshot) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 rounded-3xl p-3 md:p-5 bg-gradient-to-b from-teal-500/15 via-emerald-500/5 to-transparent border border-teal-500/20 shadow-2xl backdrop-blur-xl"
          >
            <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden text-left">
              {/* Console Window Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    Live Telehealth Session • AI Clinical Engine
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Doctor Connected
                  </span>
                  <span className="font-mono text-neutral-400 font-semibold">
                    ⏱️ 02:41
                  </span>
                </div>
              </div>

              {/* Console Interior Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                {/* Left: Active Doctor Profile & Live Waveform */}
                <div className="lg:col-span-4 flex flex-col items-center text-center p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 opacity-60 blur-md animate-pulse" />
                    <Image
                      src="/doctor1.png"
                      alt="Dr. Elliot"
                      width={110}
                      height={110}
                      className="relative h-24 w-24 rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow-md"
                    />
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Dr. Elliot, MD
                  </h3>
                  <p className="text-xs font-medium text-teal-600 dark:text-teal-400">
                    General Physician AI Specialist
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    Voice: Elliot (Natural Human Cadence)
                  </p>

                  {/* Simulated Audio Waveform */}
                  <div className="mt-5 w-full py-3 px-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 flex items-center justify-center gap-1.5">
                    {[35, 70, 95, 55, 80, 45, 90, 60, 85, 40, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full bg-teal-500"
                        animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.09 }}
                        style={{ height: `${h}%`, minHeight: "8px" }}
                      />
                    ))}
                  </div>
                  <span className="mt-2 text-[10px] text-neutral-400">
                    🟢 Doctor Speaking • Analyzing Symptoms
                  </span>

                  {/* Quick Vitals / Status Card */}
                  <div className="mt-5 w-full p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800 text-left text-xs space-y-1">
                    <p className="text-teal-800 dark:text-teal-200 font-semibold flex items-center justify-between">
                      <span>Clinical Triage Level:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Mild (3/10)</span>
                    </p>
                    <p className="text-neutral-500 text-[11px]">
                      Red Flags: <span className="text-emerald-600 font-medium">None detected</span>
                    </p>
                  </div>
                </div>

                {/* Right: Live Dialogue & Assessment */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                  {/* Dialogue Log */}
                  <div className="space-y-3 p-4 rounded-2xl bg-neutral-50/70 dark:bg-neutral-950/40 border border-neutral-200/70 dark:border-neutral-800">
                    {/* Doctor Message */}
                    <div className="flex gap-3 items-start">
                      <div className="h-7 w-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        Dr
                      </div>
                      <div className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 shadow-xs leading-relaxed max-w-[90%]">
                        <p className="font-semibold text-teal-600 dark:text-teal-400 text-[11px] mb-0.5">
                          Dr. Elliot (AI Physician)
                        </p>
                        "Hello Sarah! I noticed your consultation notes mention persistent throbbing headaches and light sensitivity. Exactly when did this start, and has it been constant or coming in waves?"
                      </div>
                    </div>

                    {/* Patient Message */}
                    <div className="flex gap-3 items-start justify-end">
                      <div className="p-3 rounded-2xl bg-teal-600 text-white text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left">
                        <p className="font-semibold text-teal-200 text-[11px] mb-0.5">
                          You (Patient)
                        </p>
                        "It started about 2 days ago. It throbs primarily on the left temple, especially when looking at screens or in sunlight."
                      </div>
                    </div>

                    {/* Doctor Response */}
                    <div className="flex gap-3 items-start">
                      <div className="h-7 w-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        Dr
                      </div>
                      <div className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 shadow-xs leading-relaxed max-w-[90%]">
                        <p className="font-semibold text-teal-600 dark:text-teal-400 text-[11px] mb-0.5">
                          Dr. Elliot (AI Physician)
                        </p>
                        "Thank you for clarifying. The unilateral throbbing and photophobia are characteristic of a migraine episode. On a scale of 1 to 10, how severe is the pain right now, and are you experiencing any nausea?"
                      </div>
                    </div>
                  </div>

                  {/* Consultation Summary Bar */}
                  <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span className="font-semibold">Auto-EHR Summary Ready:</span>
                      <span className="text-neutral-500">Symptoms, Duration, Recommendations</span>
                    </div>
                    <Link href="/dashboard">
                      <span className="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 flex items-center gap-1 cursor-pointer">
                        Try It Live In Dashboard <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Medical Feature Bento Grid */}
      <FeatureBentoGrid />

      {/* Available Specialists Showcase Section */}
      <section id="specialists" className="py-20 border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
              Specialized Care Team
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Meet Your AI Medical Specialists
            </h2>
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Every doctor agent is trained on clinical inquiry protocols specific to their medical discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AIDoctorAgents.slice(0, 6).map((doctor) => (
              <div
                key={doctor.id}
                className="group p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-teal-500/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <Image
                      src={doctor.image}
                      alt={doctor.specialist}
                      width={70}
                      height={70}
                      className="w-16 h-16 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800 shadow-xs"
                    />
                    <div>
                      <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                        Specialist
                      </span>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        {doctor.specialist}
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Voice: {doctor.voiceId}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {doctor.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Instant Available
                  </span>
                  <Link href="/dashboard">
                    <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-teal-600 dark:hover:bg-teal-400 transition-colors cursor-pointer">
                      Consult Doctor
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/dashboard">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-teal-500 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer">
                View All 10 Specialist Doctors in Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Simple 3-Step Care
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              How Voice Consultation Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative">
              <div className="h-12 w-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-bold">1. Share Your Symptoms</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enter your health concern, symptoms, or how you're feeling. Our smart routing instantly matches you with the ideal specialist.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-bold">2. Live Voice Consultation</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Connect in seconds via voice. The AI doctor asks targeted follow-up questions, probes severity, and listens attentively.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative">
              <div className="h-12 w-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-bold">3. Structured Medical Report</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Receive an immediate structured clinical summary with chief complaints, severity rating, duration, and actionable recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Red Flag Notice Banner */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto p-4 md:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="text-xs md:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-bold">Medical Emergency Notice:</span> AI Medical Voice Agent provides clinical guidance and symptom triage. It is not an emergency service. If you are experiencing a life-threatening medical emergency (such as acute chest pressure, stroke symptoms, or severe respiratory distress), please immediately contact 911 or visit your nearest emergency department.
          </div>
        </div>
      </section>

      {/* Healthcare Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-12 bg-white dark:bg-neutral-950 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white text-[11px] font-bold">
              +
            </div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              AI Medical Voice Agent
            </span>
            <span>• Next-Gen Clinical Telehealth</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-teal-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/sign-in" className="hover:text-teal-600 transition-colors">
              Sign In
            </Link>
            <span>Confidential & HIPAA Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              AI Medical Voice Agent
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <button className="px-4 py-2 text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-teal-600 transition-colors cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 transition-all cursor-pointer">
                  Start Consultation
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href="/dashboard">
                <button className="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 transition-all cursor-pointer">
                  Go to Dashboard
                </button>
              </Link>
              <UserButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
