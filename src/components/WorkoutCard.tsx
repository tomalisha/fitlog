import Image from "next/image";
import Link from "next/link";
import type { Workout } from "../types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

const tagColors = [
  "border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00]",
  "border-[#00d9ff]/30 bg-[#00d9ff]/10 text-[#00d9ff]",
  "border-[#ff6b9d]/30 bg-[#ff6b9d]/10 text-[#ff6b9d]",
];

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#272a2d] bg-[#111416] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle, index) => (
            <span
              key={muscle}
              className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                tagColors[index % tagColors.length]
              }`}
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-bold uppercase text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-gray-400">{workout.equipment}</p>

        <div className="mt-5 flex items-center justify-between border-t border-[#272a2d] pt-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <svg
              className="h-4 w-4 text-[#ccff00]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <path
                d="M12 7v5l3 2"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <svg
              className="h-4 w-4 text-[#ff8a00]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.5 2.5c.2 3.1-1.4 4.7-2.7 6.1-1.1 1.2-2 2.2-2 3.9 0 1.3.6 2.4 1.6 3.1-.1-1.2.4-2.3 1.4-3.2.6-.6 1.2-1.2 1.4-2.4 2 1.6 3.3 3.8 3.3 6.2 0 1.5-.5 2.9-1.5 4.1 3.2-.9 5.5-3.8 5.5-7.3 0-3.8-2.1-7.4-7-10.5Z" />
            </svg>
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-[#ccff00]">
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
            </svg>
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}