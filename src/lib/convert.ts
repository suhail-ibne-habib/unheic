import {
  OUTPUT_FORMATS,
  isHeicFilename,
  type OutputFormatId,
} from "./formats";

type HeicTo = (typeof import("heic-to/next"))["heicTo"];

let heicToPromise: Promise<HeicTo> | null = null;

async function loadHeicTo(): Promise<HeicTo> {
  if (!heicToPromise) {
    heicToPromise = (async () => {
      if (typeof OffscreenCanvas !== "undefined") {
        const nextBuild = await import("heic-to/next");
        return nextBuild.heicTo;
      }
      const standard = await import("heic-to");
      return standard.heicTo;
    })();
  }
  return heicToPromise;
}

async function fileToBitmap(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file);
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const element = new Image();
        element.onload = () => resolve(element);
        element.onerror = () => reject(new Error("This image could not be decoded."));
        element.src = url;
      });
      return await createImageBitmap(image);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

async function bitmapToBlob(
  bitmap: ImageBitmap,
  mime: string,
  quality: number,
): Promise<Blob> {
  const width = bitmap.width;
  const height = bitmap.height;

  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not create a drawing surface.");
    context.drawImage(bitmap, 0, 0);
    const blob = await canvas.convertToBlob({ type: mime, quality });
    if (!blob || blob.size === 0) {
      throw new Error(
        `This browser cannot encode ${mime.split("/")[1]?.toUpperCase() ?? "that format"}.`,
      );
    }
    if (blob.type && blob.type !== mime) {
      throw new Error(
        `This browser cannot encode ${mime.split("/")[1]?.toUpperCase() ?? "that format"}.`,
      );
    }
    return blob;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create a drawing surface.");
  context.drawImage(bitmap, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, mime, quality);
  });

  if (!blob) {
    throw new Error(`This browser cannot encode ${mime.split("/")[1]?.toUpperCase() ?? "that format"}.`);
  }
  if (blob.type && blob.type !== mime) {
    throw new Error(`This browser cannot encode ${mime.split("/")[1]?.toUpperCase() ?? "that format"}.`);
  }
  return blob;
}

export async function convertImage(
  file: File,
  format: OutputFormatId,
  quality: number,
  keepExif: boolean,
): Promise<Blob> {
  const target = OUTPUT_FORMATS[format];
  let blob: Blob;

  if (isHeicFilename(file.name)) {
    const heicTo = await loadHeicTo();
    if (target.mime === "image/jpeg" || target.mime === "image/png") {
      blob = await heicTo({
        blob: file,
        type: target.mime,
        quality,
      });
    } else {
      const bitmap = await heicTo({
        blob: file,
        type: "bitmap",
      });
      try {
        blob = await bitmapToBlob(bitmap, target.mime, quality);
      } finally {
        bitmap.close();
      }
    }
  } else {
    const bitmap = await fileToBitmap(file);
    try {
      blob = await bitmapToBlob(bitmap, target.mime, quality);
    } finally {
      bitmap.close();
    }
  }

  if (keepExif && target.supportsExif) {
    const { applyExif } = await import("./exif");
    blob = await applyExif(file, blob);
  }

  return blob;
}

export function createPool(limit: number) {
  let active = 0;
  const waiting: Array<() => void> = [];

  const acquire = () =>
    new Promise<void>((resolve) => {
      if (active < limit) {
        active += 1;
        resolve();
        return;
      }
      waiting.push(resolve);
    });

  const release = () => {
    const next = waiting.shift();
    if (next) {
      next();
      return;
    }
    active = Math.max(0, active - 1);
  };

  return { acquire, release };
}
