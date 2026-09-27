import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-[#272a2d] bg-[#0b0d0f]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            Workout Library
          </p>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-white"
          >
            Browse Workouts
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <Image
            src="/banner.png"
            alt="FitLog workout banner"
            width={800}
            height={600}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}