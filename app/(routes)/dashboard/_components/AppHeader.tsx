import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Stethoscope } from "lucide-react";

const menuOptions = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Home",
    path: "/",
  },
];

function AppHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-neutral-950/90 border-b border-neutral-200/80 dark:border-neutral-800 shadow-xs px-6 sm:px-10 md:px-16 lg:px-24 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/25 group-hover:scale-105 transition-transform shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-teal-600 transition-colors">
                AI Medical Voice Agent
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800">
                Clinical
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-neutral-400 font-medium -mt-0.5">
              24/7 Intelligent Voice Telehealth
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="flex items-center gap-1 sm:gap-2">
            {menuOptions.map((option) => (
              <Link key={option.id} href={option.path}>
                <span className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all cursor-pointer">
                  {option.name}
                </span>
              </Link>
            ))}
          </nav>
          <div className="pl-4 border-l border-neutral-200 dark:border-neutral-800 flex items-center">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
