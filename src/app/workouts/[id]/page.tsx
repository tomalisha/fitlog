import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkoutById } from "../../../lib/api";
import WorkoutActions from "../../../components/WorkoutActions";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkoutById(id);
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0d0f] text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-400 transition hover:text-[#ccff00]"
          >
            ← Back to Library
          </Link>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative min-h-[400px] overflow-hidden rounded-2xl border border-[#272a2d] bg-[#111416] lg:min-h-[600px]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-5 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ccff00]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
                {workout.name}
              </h1>

              <p className="mt-6 max-w-xl leading-7 text-gray-400">
                {workout.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="border border-[#272a2d] bg-[#111416] p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Equipment
                  </p>
                  <p className="mt-2 text-sm font-bold">
                    {workout.equipment}
                  </p>
                </div>

                <div className="border border-[#272a2d] bg-[#111416] p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Difficulty
                  </p>
                  <p className="mt-2 text-sm font-bold">
                    {workout.difficulty}
                  </p>
                </div>

                <div className="border border-[#272a2d] bg-[#111416] p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Sets
                  </p>
                  <p className="mt-2 text-sm font-bold">
                    {workout.sets}
                  </p>
                </div>

                <div className="border border-[#272a2d] bg-[#111416] p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Reps
                  </p>
                  <p className="mt-2 text-sm font-bold">
                    {workout.reps}
                  </p>
                </div>

                <div className="border border-[#272a2d] bg-[#111416] p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Duration
                  </p>
                  <p className="mt-2 text-sm font-bold">
                    {workout.duration} min
                  </p>
                </div>

                <div className="border border-[#272a2d] bg-[#111416] p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Calories
                  </p>
                  <p className="mt-2 text-sm font-bold">
                    {workout.caloriesBurned} kcal
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 text-[#ccff00]">
                <span className="text-xl">★</span>
                <span className="font-bold">{workout.rating}</span>
                <span className="text-sm text-gray-500">
                  Rating
                </span>
              </div>

              <WorkoutActions workout={workout} />
            </div>
          </div>

          <section className="mt-16 border-t border-[#272a2d] pt-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              How to perform
            </p>

            <h2 className="text-4xl font-black uppercase">
              Instructions
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {workout.instructions.map((instruction, index) => (
                <div
                  key={instruction}
                  className="flex gap-4 border border-[#272a2d] bg-[#111416] p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-sm font-black text-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="leading-7 text-gray-300">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}