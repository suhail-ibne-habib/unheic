"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import {
  CheckCircle2,
  CloudUpload,
  Download,
  Folder,
  LoaderCircle,
  ShieldCheck,
  Trash2,
  WifiOff,
} from "lucide-react";
import { convertHeicToJpeg, createPool } from "@/lib/convert";
import { downloadBlob, filesFromDrop, selectHeicFiles } from "@/lib/files";
import { formatBytes, toJpgName } from "@/lib/format";
import { siteConfig } from "@/lib/site";

const QUALITY_OPTIONS = [
  { value: 0.95, label: "Quality: 95% Maximum" },
  { value: 0.9, label: "Quality: 90% High (Recommended)" },
  { value: 0.8, label: "Quality: 80% Good" },
  { value: 0.7, label: "Quality: 70% Compact" },
  { value: 0.5, label: "Quality: 50% Smallest" },
] as const;

type JobStatus = "queued" | "converting" | "ready" | "error";

type Job = {
  id: string;
  file: File;
  outputName: string;
  status: JobStatus;
  previewUrl?: string;
  blob?: Blob;
  outputSize?: number;
  error?: string;
};

const pool = createPool(3);

export function Converter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const jobsRef = useRef<Job[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [quality, setQuality] = useState(0.9);
  const [keepExif, setKeepExif] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [zipping, setZipping] = useState(false);

  jobsRef.current = jobs;

  useEffect(() => {
    return () => {
      jobsRef.current.forEach((job) => {
        if (job.previewUrl) URL.revokeObjectURL(job.previewUrl);
      });
    };
  }, []);

  const updateJob = useCallback((id: string, patch: Partial<Job>) => {
    setJobs((current) =>
      current.map((job) => {
        if (job.id !== id) return job;
        if (job.previewUrl && patch.previewUrl && job.previewUrl !== patch.previewUrl) {
          URL.revokeObjectURL(job.previewUrl);
        }
        return { ...job, ...patch };
      }),
    );
  }, []);

  const convertJob = useCallback(
    async (job: Job, nextQuality: number, nextKeepExif: boolean) => {
      updateJob(job.id, { status: "converting", error: undefined });
      await pool.acquire();
      try {
        const blob = await convertHeicToJpeg(job.file, nextQuality, nextKeepExif);
        const previewUrl = URL.createObjectURL(blob);
        updateJob(job.id, {
          status: "ready",
          blob,
          previewUrl,
          outputSize: blob.size,
        });
      } catch (error) {
        updateJob(job.id, {
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Could not convert this HEIC file.",
        });
      } finally {
        pool.release();
      }
    },
    [updateJob],
  );

  const enqueueFiles = useCallback(
    (incoming: File[]) => {
      const remaining = siteConfig.maxFiles - jobsRef.current.length;
      const { accepted, skipped, overflow } = selectHeicFiles(incoming, remaining);

      const messages: string[] = [];
      if (skipped) messages.push(`${skipped} file${skipped === 1 ? "" : "s"} skipped (not HEIC/HEIF).`);
      if (overflow > 0) {
        messages.push(`Only ${siteConfig.maxFiles} files can be converted at once.`);
      }
      setNotice(messages.join(" ") || null);

      if (!accepted.length) return;

      const created: Job[] = accepted.map((file) => ({
        id: crypto.randomUUID(),
        file,
        outputName: toJpgName(file.name),
        status: "queued",
      }));

      setJobs((current) => [...current, ...created]);
      created.forEach((job) => {
        void convertJob(job, quality, keepExif);
      });
    },
    [convertJob, keepExif, quality],
  );

  const onDrop = async (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = await filesFromDrop(event.dataTransfer);
    enqueueFiles(files);
  };

  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    enqueueFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const clearAll = () => {
    setJobs((current) => {
      current.forEach((job) => {
        if (job.previewUrl) URL.revokeObjectURL(job.previewUrl);
      });
      return [];
    });
    setNotice(null);
  };

  const readyJobs = useMemo(
    () => jobs.filter((job) => job.status === "ready" && job.blob),
    [jobs],
  );

  const downloadAll = async () => {
    if (!readyJobs.length) return;
    if (readyJobs.length === 1 && readyJobs[0].blob) {
      downloadBlob(readyJobs[0].blob, readyJobs[0].outputName);
      return;
    }
    setZipping(true);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      readyJobs.forEach((job) => {
        if (job.blob) zip.file(job.outputName, job.blob);
      });
      const archive = await zip.generateAsync({ type: "blob" });
      downloadBlob(archive, "unheic-converted.zip");
    } finally {
      setZipping(false);
    }
  };

  return (
    <div id="converter" className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      <section
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node)) return;
          setDragging(false);
        }}
        onDrop={onDrop}
        className={`rounded-[32px] border bg-white px-5 py-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition sm:px-10 ${
          dragging ? "border-blue-500 ring-4 ring-blue-50" : "border-white"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".heic,.heif,image/heic,image/heif"
          multiple
          className="sr-only"
          onChange={onSelect}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mx-auto flex w-full max-w-xl flex-col items-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-sky-500">
            <CloudUpload className="h-7 w-7" aria-hidden="true" />
          </span>
          <span className="mt-5 text-lg font-semibold text-slate-900 sm:text-xl">
            Drop your .HEIC or .HEIF files here
          </span>
          <span className="mt-1 text-sm text-slate-400">
            or click to browse from device / iCloud library
          </span>
        </button>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] font-semibold">
            <span className="rounded-md bg-white px-1.5 py-0.5 text-slate-500 shadow-sm">
              HEIC
            </span>
            <span className="text-slate-400">→</span>
            <span className="rounded-md bg-white px-1.5 py-0.5 text-blue-600 shadow-sm">
              JPG
            </span>
          </div>
          <label className="relative">
            <span className="sr-only">JPEG quality</span>
            <select
              value={quality}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="appearance-none rounded-full border border-slate-200 bg-slate-50 py-1.5 pr-8 pl-3 text-[11px] font-medium text-slate-600 outline-none focus:border-blue-400"
            >
              {QUALITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400">
              ▾
            </span>
          </label>
          <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600">
            <input
              type="checkbox"
              checked={keepExif}
              onChange={(event) => setKeepExif(event.target.checked)}
              className="h-3.5 w-3.5 accent-blue-600"
            />
            Keep EXIF
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Batch up to {siteConfig.maxFiles} files
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Folder className="h-3.5 w-3.5 text-sky-500" />
            Folder drop supported
          </span>
          <span className="inline-flex items-center gap-1.5">
            <WifiOff className="h-3.5 w-3.5 text-slate-400" />
            Zero network lag
          </span>
        </div>
      </section>

      {notice ? (
        <p className="mt-4 text-center text-sm text-amber-700" role="status">
          {notice}
        </p>
      ) : null}

      {jobs.length > 0 ? (
        <section className="mt-5 rounded-[28px] border border-white bg-white p-4 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Conversion
            </div>
            <div className="flex items-center gap-3">
              {readyJobs.length > 1 ? (
                <button
                  type="button"
                  onClick={() => void downloadAll()}
                  disabled={zipping}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-60"
                >
                  {zipping ? "Zipping…" : "Download all"}
                </button>
              ) : null}
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
          </div>
          <ul className="space-y-3" aria-live="polite">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white"
              >
                <div className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-xl bg-slate-100">
                      {job.previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={job.previewUrl}
                          alt={`${job.outputName} preview`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-slate-400">
                          HEIC
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-slate-800">
                        <span className="truncate">{job.file.name}</span>
                        {job.status === "ready" ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        ) : null}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {formatBytes(job.file.size)}
                        {job.outputSize
                          ? `  →  ${formatBytes(job.outputSize)} JPG`
                          : null}
                        {job.error ? `  ·  ${job.error}` : null}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    {job.status === "converting" || job.status === "queued" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                        {job.status === "queued" ? "Queued" : "Converting"}
                      </span>
                    ) : null}
                    {job.status === "ready" ? (
                      <>
                        <span className="text-xs font-semibold text-emerald-600">
                          Ready
                        </span>
                        <button
                          type="button"
                          onClick={() => job.blob && downloadBlob(job.blob, job.outputName)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </button>
                      </>
                    ) : null}
                    {job.status === "error" ? (
                      <button
                        type="button"
                        onClick={() => void convertJob(job, quality, keepExif)}
                        className="text-xs font-semibold text-rose-500"
                      >
                        Retry
                      </button>
                    ) : null}
                  </div>
                </div>
                {job.status === "converting" ? (
                  <div className="h-0.5 w-full overflow-hidden bg-slate-100">
                    <div className="h-full w-1/2 animate-pulse bg-blue-500" />
                  </div>
                ) : job.status === "ready" ? (
                  <div className="h-0.5 w-full bg-emerald-400" />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
