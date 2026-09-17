import exifr from "exifr";
import piexif from "piexifjs";

type Rational = [number, number];

function decimalToRational(value: number): Rational {
  const precision = 10000;
  return [Math.round(value * precision), precision];
}

function degToDmsRational(deg: number): [Rational, Rational, Rational] {
  const d = Math.floor(deg);
  const mFloat = (deg - d) * 60;
  const m = Math.floor(mFloat);
  const s = (mFloat - m) * 60;
  return [
    [d, 1],
    [m, 1],
    [Math.round(s * 10000), 10000],
  ];
}

function formatExifDate(value: unknown): string | undefined {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : undefined;
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}:${pad(date.getMonth() + 1)}:${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(",");
  const mime = /data:(.*?);base64/.exec(header)?.[1] ?? "image/jpeg";
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

export async function applyExif(original: File, jpegBlob: Blob): Promise<Blob> {
  try {
    const parsed = await exifr.parse(original, {
      gps: true,
      exif: true,
      translateKeys: true,
      translateValues: true,
      reviveValues: true,
    });

    if (!parsed) return jpegBlob;

    const zeroth: Record<number, unknown> = {
      [piexif.ImageIFD.Orientation]: 1,
      [piexif.ImageIFD.Software]: "Unheic",
    };
    const exif: Record<number, unknown> = {};
    const gps: Record<number, unknown> = {};

    if (parsed.Make) zeroth[piexif.ImageIFD.Make] = String(parsed.Make);
    if (parsed.Model) zeroth[piexif.ImageIFD.Model] = String(parsed.Model);
    if (parsed.Artist) zeroth[piexif.ImageIFD.Artist] = String(parsed.Artist);

    const originalDate = formatExifDate(
      parsed.DateTimeOriginal ?? parsed.CreateDate ?? parsed.DateTime,
    );
    if (originalDate) {
      zeroth[piexif.ImageIFD.DateTime] = originalDate;
      exif[piexif.ExifIFD.DateTimeOriginal] = originalDate;
      exif[piexif.ExifIFD.DateTimeDigitized] = originalDate;
    }

    if (typeof parsed.FNumber === "number") {
      exif[piexif.ExifIFD.FNumber] = decimalToRational(parsed.FNumber);
    }
    if (typeof parsed.ExposureTime === "number") {
      exif[piexif.ExifIFD.ExposureTime] = decimalToRational(parsed.ExposureTime);
    }
    if (typeof parsed.ISO === "number") {
      exif[piexif.ExifIFD.ISOSpeedRatings] = parsed.ISO;
    }
    if (typeof parsed.FocalLength === "number") {
      exif[piexif.ExifIFD.FocalLength] = decimalToRational(parsed.FocalLength);
    }
    if (parsed.LensModel) {
      exif[piexif.ExifIFD.LensModel] = String(parsed.LensModel);
    }

    if (typeof parsed.latitude === "number" && typeof parsed.longitude === "number") {
      gps[piexif.GPSIFD.GPSLatitudeRef] = parsed.latitude >= 0 ? "N" : "S";
      gps[piexif.GPSIFD.GPSLatitude] = degToDmsRational(Math.abs(parsed.latitude));
      gps[piexif.GPSIFD.GPSLongitudeRef] = parsed.longitude >= 0 ? "E" : "W";
      gps[piexif.GPSIFD.GPSLongitude] = degToDmsRational(Math.abs(parsed.longitude));
    }

    const dumped = piexif.dump({ "0th": zeroth, Exif: exif, GPS: gps });
    const dataUrl = await blobToDataUrl(jpegBlob);
    return dataUrlToBlob(piexif.insert(dumped, dataUrl));
  } catch {
    return jpegBlob;
  }
}
