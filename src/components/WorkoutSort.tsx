"use client";

import { useState } from "react";
import type { Workout } from "../types/workout";

interface WorkoutSortProps {
  workouts: Workout[];
  onSort: (workouts: Workout[]) => void;
}

export default function WorkoutSort({
  workouts,
  onSort,
}: WorkoutSortProps) {
  const [sortBy, setSortBy] = useState("duration");

  function handleSort(value: string) {
    setSortBy(value);

    const sorted = [...workouts].sort((a, b) => {
      if (value === "duration") {
        return a.duration - b.duration;
      }

      if (value === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      if (value === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

    onSort(sorted);
  }

  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(event) => handleSort(event.target.value)}
        className="appearance-none border border-[#3a3e42] bg-[#111416] px-5 py-3 pr-10 text-sm font-bold uppercase tracking-wider text-white outline-none transition focus:border-[#ccff00]"
      >
        <option value="duration">Duration</option>
        <option value="calories">Calories</option>
        <option value="rating">Rating</option>
      </select>

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ccff00]">
        ▼
      </span>
    </div>
  );
}