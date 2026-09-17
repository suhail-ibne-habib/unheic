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

export async function convertHeicToJpeg(
  file: File,
  quality: number,
  keepExif: boolean,
): Promise<Blob> {
  const heicTo = await loadHeicTo();
  let jpeg = await heicTo({
    blob: file,
    type: "image/jpeg",
    quality,
  });

  if (keepExif) {
    const { applyExif } = await import("./exif");
    jpeg = await applyExif(file, jpeg);
  }

  return jpeg;
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
