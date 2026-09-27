"use client";

import { useEffect, useState } from "react";
import type { Workout } from "../types/workout";
import {
  addToPlan,
  saveWorkout,
  getPlan,
  getSaved,
  notifyStorageUpdate,
} from "../lib/storage";
import Toast from "./Toast";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const [planAdded, setPlanAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setPlanAdded(
      getPlan().some((item) => item.id === workout.id)
    );

    setSaved(
      getSaved().some((item) => item.id === workout.id)
    );
  }, [workout.id]);

  function showToast(message: string) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function handleAddToPlan() {
    const currentPlan = getPlan();

    if (currentPlan.some((item) => item.id === workout.id)) {
      showToast(`${workout.name} is already in today's plan.`);
      return;
    }

    if (currentPlan.length >= 5) {
      showToast("Today's plan can contain a maximum of 5 workouts.");
      return;
    }

    addToPlan(workout);
    notifyStorageUpdate();

    setPlanAdded(true);
    showToast(`${workout.name} added to today's plan.`);
  }

  function handleSave() {
    saveWorkout(workout);
    notifyStorageUpdate();

    setSaved(true);
    showToast(`${workout.name} saved for later.`);
  }

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToPlan}
          className={`flex-1 px-6 py-4 text-sm font-black uppercase tracking-wider transition ${
            planAdded
              ? "bg-[#272a2d] text-gray-400"
              : "bg-[#ccff00] text-black hover:bg-white"
          }`}
        >
          {planAdded ? "Added to Plan ✓" : "Add to Today's Plan"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          className={`flex-1 px-6 py-4 text-sm font-black uppercase tracking-wider transition ${
            saved
              ? "bg-[#272a2d] text-gray-400"
              : "border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
          }`}
        >
          {saved ? "Saved ✓" : "Save for Later"}
        </button>
      </div>

      <Toast
        message={toast}
        show={Boolean(toast)}
      />
    </>
  );
}