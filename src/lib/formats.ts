export const OUTPUT_FORMATS = {
  jpg: {
    id: "jpg",
    label: "JPG",
    mime: "image/jpeg",
    ext: "jpg",
    usesQuality: true,
    supportsExif: true,
  },
  png: {
    id: "png",
    label: "PNG",
    mime: "image/png",
    ext: "png",
    usesQuality: false,
    supportsExif: false,
  },
  webp: {
    id: "webp",
    label: "WebP",
    mime: "image/webp",
    ext: "webp",
    usesQuality: true,
    supportsExif: false,
  },
  avif: {
    id: "avif",
    label: "AVIF",
    mime: "image/avif",
    ext: "avif",
    usesQuality: true,
    supportsExif: false,
  },
} as const;

export type OutputFormatId = keyof typeof OUTPUT_FORMATS;

export const INPUT_FORMATS = {
  heic: {
    id: "heic",
    label: "HEIC",
    extensions: [".heic", ".heif"],
    accept: ".heic,.heif,image/heic,image/heif",
    pattern: /\.(heic|heif)$/i,
  },
  jpg: {
    id: "jpg",
    label: "JPG",
    extensions: [".jpg", ".jpeg"],
    accept: ".jpg,.jpeg,image/jpeg",
    pattern: /\.(jpe?g)$/i,
  },
  png: {
    id: "png",
    label: "PNG",
    extensions: [".png"],
    accept: ".png,image/png",
    pattern: /\.png$/i,
  },
  webp: {
    id: "webp",
    label: "WebP",
    extensions: [".webp"],
    accept: ".webp,image/webp",
    pattern: /\.webp$/i,
  },
  avif: {
    id: "avif",
    label: "AVIF",
    extensions: [".avif"],
    accept: ".avif,image/avif",
    pattern: /\.avif$/i,
  },
} as const;

export type InputFormatId = keyof typeof INPUT_FORMATS;

export function isHeicFilename(name: string): boolean {
  return INPUT_FORMATS.heic.pattern.test(name);
}

export function matchesInput(name: string, input: InputFormatId): boolean {
  return INPUT_FORMATS[input].pattern.test(name);
}

export function fileExtensionLabel(name: string): string {
  const match = /\.([a-z0-9]+)$/i.exec(name);
  return match ? match[1].toUpperCase() : "IMG";
}

export function toOutputName(name: string, ext: string): string {
  if (/\.[a-z0-9]+$/i.test(name)) {
    return name.replace(/\.[a-z0-9]+$/i, `.${ext}`);
  }
  return `${name}.${ext}`;
}

export function canvasSupportsType(mime: string): boolean {
  if (typeof document === "undefined") return mime !== "image/avif";
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  try {
    return canvas.toDataURL(mime).startsWith(`data:${mime}`);
  } catch {
    return false;
  }
}
