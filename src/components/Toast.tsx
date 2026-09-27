"use client";

interface ToastProps {
  message: string;
  show: boolean;
}

export default function Toast({ message, show }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 border border-[#ccff00] bg-[#111416] px-5 py-4 text-sm font-bold text-white shadow-lg">
      <span className="mr-2 text-[#ccff00]">✓</span>
      {message}
    </div>
  );
}