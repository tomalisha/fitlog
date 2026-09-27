export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0d0f]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#ccff00]" />

        <p className="text-sm font-medium uppercase tracking-widest text-white">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}