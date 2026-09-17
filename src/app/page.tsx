import type { Metadata } from "next";
import { Converter } from "@/components/converter";
import { FaqList } from "@/components/faq-list";
import { FeatureCards } from "@/components/feature-cards";
import { HomeJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <section className="px-4 pt-12 pb-8 text-center sm:px-6 sm:pt-16">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          WebAssembly Engine {siteConfig.engine}
          <span className="text-slate-300">•</span>
          Client-Side Native
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15]">
          Convert HEIC to{" "}
          <span className="text-blue-600">JPG</span> Online, Instantly
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Lightning-fast client-side conversion. Your photos never leave your
          device. No file size limits, no sign-up required.
        </p>
      </section>
      <Converter />
      <FeatureCards />
      <FaqList />
    </>
  );
}
