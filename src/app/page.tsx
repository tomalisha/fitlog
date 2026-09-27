export default function Home() {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <section className="container-custom flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="section-eyebrow mb-4">
            WORKOUT LIBRARY
          </p>

          <h1 className="display-font text-5xl font-bold uppercase tracking-tight sm:text-6xl">
            Train With Intent.
            <br />
            <span className="accent-text">
              Log Every Set.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a
            lift, lock it into today&apos;s plan, and watch the
            week&apos;s work add up.
          </p>
        </div>
      </section>
    </main>
  );
}