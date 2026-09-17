import type { ReactNode } from "react";

export function PageHero({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-4 pt-14 pb-8 text-center sm:px-6 sm:pt-16">
      <p className="text-[11px] font-semibold tracking-[0.22em] text-blue-600 uppercase">
        {kicker}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-7 text-slate-500 sm:text-lg">{description}</p>
    </header>
  );
}

export function ContentCard({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mb-16 max-w-3xl px-4 sm:px-6">
      <div className="rounded-[28px] border border-white bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8">
        {children}
      </div>
    </div>
  );
}
