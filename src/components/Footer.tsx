import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#272a2d] bg-[#080a0c]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
            />

            <span className="text-2xl font-black tracking-tight text-white">
              FITLOG
            </span>
          </div>

         
        </div>

        <p className="text-sm text-gray-500">
          © 2026 FitLog. Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}