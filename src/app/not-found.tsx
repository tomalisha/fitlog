import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0d0f] px-5 text-white">
      <div className="w-full max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ccff00]">
          FitLog
        </p>

        <h1 className="mt-5 text-8xl font-black uppercase leading-none tracking-tight sm:text-9xl">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-black uppercase sm:text-4xl">
          Workout Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-lg leading-7 text-gray-400">
          The workout or page you are looking for does not exist. Head back to
          the library and find your next lift.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex bg-[#ccff00] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-white"
        >
          Back to Workout Library
        </Link>
      </div>
    </main>
  );
}