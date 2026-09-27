"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getPlan, getSaved } from "../lib/storage";

export default function Navbar() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  useEffect(() => {
    function updateCounts() {
      setPlanCount(getPlan().length);
      setSavedCount(getSaved().length);
    }

    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("fitlog-storage-update", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("fitlog-storage-update", updateCounts);
    };
  }, [pathname]);

  return (
    <header className="border-b border-[#272a2d] bg-[#0b0d0f]">
      <nav className="mx-auto flex min-h-[76px] max-w-[1200px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
        >
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="h-9 w-auto object-contain sm:h-10"
          />

          <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider transition ${
              isWorkoutActive
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider transition ${
              isPlanActive
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-black transition hover:opacity-90 sm:px-3 sm:py-2 sm:text-xs"
          >
            Plan <span className="ml-0.5 sm:ml-1">{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-[#ccff00] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#ccff00] transition hover:bg-[#ccff00] hover:text-black sm:px-3 sm:py-2 sm:text-xs"
          >
            Saved <span className="ml-0.5 sm:ml-1">{savedCount}</span>
          </Link>
        </div>
      </nav>

      <div className="border-t border-[#272a2d] px-4 py-3 md:hidden">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-2">
          <Link
            href="/"
            className={`flex-1 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider ${
              isWorkoutActive
                ? "bg-[#ccff00] text-black"
                : "text-gray-400"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`flex-1 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider ${
              isPlanActive
                ? "bg-[#ccff00] text-black"
                : "text-gray-400"
            }`}
          >
            My Plan
          </Link>
        </div>
      </div>
    </header>
  );
}