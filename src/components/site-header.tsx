"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { INPUT_FORMATS, OUTPUT_FORMATS } from "@/lib/formats";
import { conversionTools, toolsBySource } from "@/lib/tools";

const LINKS = [
  { href: "/how-it-works", label: "How it Works" },
  { href: "/privacy", label: "Privacy" },
] as const;

const converterGroups = toolsBySource();

function badgeFor(pathname: string) {
  if (pathname === "/") return "HEIC to JPG";
  const tool = conversionTools.find((item) => item.href === pathname);
  if (!tool) return "Converters";
  return `${INPUT_FORMATS[tool.from].label} to ${OUTPUT_FORMATS[tool.to].label}`;
}

function isConverterPath(pathname: string) {
  return (
    pathname === "/tools" ||
    pathname === "/" ||
    conversionTools.some((item) => item.href === pathname)
  );
}

function toolLabel(from: string, to: string) {
  return `${from} to ${to}`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/90 bg-white/90 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 sm:inline">
              {badgeFor(pathname)}
            </span>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-[13px] font-medium text-slate-500 md:flex">
            <div className="group relative">
              <Link
                href="/tools"
                className={`inline-flex items-center gap-1 transition-colors hover:text-slate-900 ${
                  isConverterPath(pathname) ? "text-slate-900" : ""
                }`}
                aria-haspopup="true"
              >
                Converters
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                  aria-hidden="true"
                />
              </Link>
              <div className="absolute left-1/2 top-full z-50 hidden w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 group-hover:block group-focus-within:block">
                <div className="h-3" aria-hidden="true" />
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                  <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
                    {converterGroups.map((group) => (
                      <div key={group.from}>
                        <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                          {group.label}
                        </p>
                        <ul className="mt-2.5 space-y-0.5">
                          {group.tools.map((tool) => {
                            const label = toolLabel(
                              INPUT_FORMATS[tool.from].label,
                              OUTPUT_FORMATS[tool.to].label,
                            );
                            const active = pathname === tool.href;
                            return (
                              <li key={tool.slug}>
                                <Link
                                  href={tool.href}
                                  className={`block rounded-lg px-2 py-1.5 text-[13px] font-medium transition-colors ${
                                    active
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                  }`}
                                >
                                  {label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <Link
                      href="/tools"
                      className="text-[13px] font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View all converters
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-slate-900 ${
                  pathname === item.href ? "text-slate-900" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={
                pathname === "/" || conversionTools.some((item) => item.href === pathname)
                  ? "#converter"
                  : "/#converter"
              }
              className="hidden h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-600/25 sm:flex"
              aria-label="Start converting"
            >
              <span className="h-2 w-2 rounded-full bg-white" />
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <nav
        aria-label="Image converters"
        className="border-t border-slate-100/90 bg-white/80"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {conversionTools.map((tool) => {
            const label = toolLabel(
              INPUT_FORMATS[tool.from].label,
              OUTPUT_FORMATS[tool.to].label,
            );
            const active = pathname === tool.href;
            return (
              <Link
                key={tool.slug}
                href={tool.href}
                className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {open ? (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <p className="px-3 pt-1 pb-2 text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
              Converters
            </p>
            <div className="grid grid-cols-2 gap-1 pb-2">
              {conversionTools.map((tool) => {
                const label = toolLabel(
                  INPUT_FORMATS[tool.from].label,
                  OUTPUT_FORMATS[tool.to].label,
                );
                const active = pathname === tool.href;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-2 text-sm font-medium ${
                      active ? "bg-blue-50 text-blue-700" : "text-slate-600"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/tools"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                pathname === "/tools" ? "bg-slate-50 text-slate-900" : "text-slate-600"
              }`}
            >
              All converters
            </Link>
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                  pathname === item.href ? "bg-slate-50 text-slate-900" : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
