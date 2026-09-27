import type { Workout } from "../types/workout";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function getPlan(): Workout[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(PLAN_KEY);

  return data ? JSON.parse(data) : [];
}

export function getSaved(): Workout[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(SAVED_KEY);

  return data ? JSON.parse(data) : [];
}

export function addToPlan(workout: Workout): Workout[] {
  const plan = getPlan();

  if (plan.some((item) => item.id === workout.id)) {
    return plan;
  }

  const updatedPlan = [...plan, workout];

  localStorage.setItem(PLAN_KEY, JSON.stringify(updatedPlan));

  return updatedPlan;
}

export function saveWorkout(workout: Workout): Workout[] {
  const saved = getSaved();

  if (saved.some((item) => item.id === workout.id)) {
    return saved;
  }

  const updatedSaved = [...saved, workout];

  localStorage.setItem(SAVED_KEY, JSON.stringify(updatedSaved));

  return updatedSaved;
}

export function notifyStorageUpdate() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event("fitlog-storage-update"));
}