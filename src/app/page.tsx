"use client";

import { useEffect, useState } from "react";
import { getWorkouts } from "../lib/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutSort from "../components/WorkoutSort";
import Footer from "../components/Footer";
import type { Workout } from "../types/workout";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0d0f] text-white">
        <Hero />

        <section
          id="library"
          className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6 md:py-20 lg:px-8"
        >
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tight sm:text-6xl">
                The Library
              </h2>

              <p className="mt-4 text-gray-400">
                Twelve lifts covering every major muscle group.
              </p>
            </div>

            <WorkoutSort
              workouts={workouts}
              onSort={setWorkouts}
            />
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
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}