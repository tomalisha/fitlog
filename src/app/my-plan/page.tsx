"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Toast from "../../components/Toast";
import type { Workout } from "../../types/workout";
import {
  getPlan,
  getSaved,
  notifyStorageUpdate,
} from "../../lib/storage";

const COMPLETED_KEY = "fitlog-completed";

export default function MyPlanPage() {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [completed, setCompleted] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    setPlan(getPlan());
    setSaved(getSaved());

    const savedCompleted = localStorage.getItem(COMPLETED_KEY);

    if (savedCompleted) {
      setCompleted(JSON.parse(savedCompleted));
    }

    setLoading(false);
  }, []);

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  function showToast(message: string) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function markAsDone(id: number) {
    setCompleted((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      const updated = [...prev, id];

      localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });

    const workout = plan.find((item) => item.id === id);

    if (workout) {
      showToast(`${workout.name} marked as done.`);
    }
  }

  function removeWorkout(id: number) {
    if (activeTab === "plan") {
      const workout = plan.find((item) => item.id === id);
      const updatedPlan = plan.filter((item) => item.id !== id);

      setPlan(updatedPlan);

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(updatedPlan)
      );

      notifyStorageUpdate();

      if (workout) {
        showToast(`${workout.name} removed from your plan.`);
      }
    } else {
      const workout = saved.find((item) => item.id === id);
      const updatedSaved = saved.filter((item) => item.id !== id);

      setSaved(updatedSaved);

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );

      notifyStorageUpdate();

      if (workout) {
        showToast(`${workout.name} removed from saved.`);
      }
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0d0f] px-5 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            Your Workout
          </p>

          <h1 className="mt-3 text-5xl font-black uppercase tracking-tight">
            My Plan
          </h1>

          <p className="mt-4 max-w-xl text-gray-400">
            Build your workout plan, track your progress, and keep your saved
            exercises in one place.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="border border-[#272a2d] bg-[#111416] p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Exercises
              </p>

              <p className="mt-2 text-3xl font-black">
                {plan.length}
              </p>
            </div>

            <div className="border border-[#272a2d] bg-[#111416] p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Minutes
              </p>

              <p className="mt-2 text-3xl font-black">
                {totalMinutes}
              </p>
            </div>

            <div className="border border-[#272a2d] bg-[#111416] p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Calories
              </p>

              <p className="mt-2 text-3xl font-black">
                {totalCalories}
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-b border-[#272a2d] sm:flex-row sm:items-end sm:justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("plan")}
                className={`px-5 py-3 text-sm font-bold uppercase tracking-wider ${
                  activeTab === "plan"
                    ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                    : "text-gray-500"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`px-5 py-3 text-sm font-bold uppercase tracking-wider ${
                  activeTab === "saved"
                    ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                    : "text-gray-500"
                }`}
              >
                Saved
              </button>
            </div>

            <div className="relative mb-3">
              <label
                htmlFor="sort-by"
                className="mr-3 text-xs font-bold uppercase tracking-wider text-gray-500"
              >
                Sort By
              </label>

              <select
                id="sort-by"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="appearance-none border border-[#3a3e42] bg-[#111416] px-4 py-3 pr-10 text-sm font-bold uppercase tracking-wider text-white outline-none transition focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#ccff00]">
                ▼
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#ccff00]" />

                <p className="text-sm font-medium uppercase tracking-widest text-white">
                  Loading workouts...
                </p>
              </div>
            </div>
          ) : sortedWorkouts.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-3xl font-black uppercase">
                No workouts yet
              </h2>

              <p className="mt-3 text-gray-400">
                Add workouts to your plan from the library.
              </p>

              <Link
                href="/#library"
                className="mt-6 inline-flex bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-wider text-black"
              >
                Browse Workouts
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedWorkouts.map((workout) => {
                const isDone = completed.includes(workout.id);

                return (
                  <div
                    key={workout.id}
                    className="overflow-hidden border border-[#272a2d] bg-[#111416]"
                  >
                    <div className="relative h-52">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold uppercase">
                        {workout.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-400">
                        {workout.equipment}
                      </p>

                      <div className="mt-4 flex gap-4 text-sm text-gray-400">
                        <span>{workout.duration} min</span>
                        <span>{workout.caloriesBurned} kcal</span>
                        <span>★ {workout.rating}</span>
                      </div>

                      <div className="mt-5 flex flex-col gap-2">
                        <Link
                          href={`/workouts/${workout.id}`}
                          className="border border-[#3a3e42] px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                        >
                          View Details
                        </Link>

                        {activeTab === "plan" && (
                          <button
                            type="button"
                            onClick={() => markAsDone(workout.id)}
                            disabled={isDone}
                            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${
                              isDone
                                ? "bg-[#272a2d] text-gray-500"
                                : "bg-[#ccff00] text-black hover:bg-white"
                            }`}
                          >
                            {isDone
                              ? "Completed ✓"
                              : "Mark as Done"}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => removeWorkout(workout.id)}
                          className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-400/10"
                        >
                          Remove ×
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <Toast
        message={toast}
        show={Boolean(toast)}
      />
    </>
  );
}