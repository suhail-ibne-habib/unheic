export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function toJpgName(name: string): string {
  return name.replace(/\.(heic|heif)$/i, ".jpg");
}

export function isHeicFilename(name: string): boolean {
  return /\.(heic|heif)$/i.test(name);
}
