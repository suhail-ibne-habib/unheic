import {
  INPUT_FORMATS,
  OUTPUT_FORMATS,
  type InputFormatId,
  type OutputFormatId,
} from "./formats";

export type ConversionTool = {
  slug: string;
  href: string;
  from: InputFormatId;
  to: OutputFormatId;
  title: string;
  description: string;
  lead: string;
};

const LEADS: Record<string, string> = {
  "heic-to-jpg":
    "iPhone photos open everywhere when you turn HEIC into JPG. Conversion stays in this tab.",
  "heic-to-png":
    "Need a lossless file from an iPhone shot? Convert HEIC to PNG without uploading anything.",
  "heic-to-webp":
    "Shrink iPhone HEIC photos into WebP for the web, entirely on your device.",
  "heic-to-avif":
    "Encode Apple HEIC photos as AVIF for smaller pages. Your files never leave the browser.",
  "jpg-to-png":
    "Turn a JPEG into a PNG when you need a lossless copy with a transparent-friendly format.",
  "jpg-to-webp":
    "Re-encode JPG as WebP to cut image weight on websites, locally in your browser.",
  "jpg-to-avif":
    "Convert JPEG photos to AVIF for modern compression without sending them to a server.",
  "png-to-jpg":
    "Flatten a PNG into a smaller JPG for email, printers, and apps that expect JPEG.",
  "png-to-webp":
    "Convert PNG graphics to WebP for faster pages while keeping the work on your device.",
  "png-to-avif":
    "Encode PNG images as AVIF when you want next-gen compression without an upload.",
  "webp-to-jpg":
    "Make a WebP photo open on older Windows tools by converting it to JPG locally.",
  "webp-to-png":
    "Convert WebP back to PNG when you need a lossless, widely editable file.",
  "webp-to-avif":
    "Move WebP images to AVIF for a newer, smaller web format — still 100% in-browser.",
  "avif-to-jpg":
    "Turn AVIF photos into JPG so they preview in apps and printers that do not support AVIF.",
  "avif-to-png":
    "Decode AVIF to PNG when you want a lossless file you can edit almost anywhere.",
  "avif-to-webp":
    "Convert AVIF to WebP for browsers and CDNs that prefer WebP today.",
};

function makeTool(from: InputFormatId, to: OutputFormatId): ConversionTool {
  const fromLabel = INPUT_FORMATS[from].label;
  const toLabel = OUTPUT_FORMATS[to].label;
  const slug = `${from}-to-${to}`;
  return {
    slug,
    href: slug === "heic-to-jpg" ? "/" : `/${slug}`,
    from,
    to,
    title: `Convert ${fromLabel} to ${toLabel} Online`,
    description: `Convert ${fromLabel} to ${toLabel} in your browser. Your photos never leave your device. No sign-up, no file size limits.`,
    lead: LEADS[slug] ?? `Convert ${fromLabel} to ${toLabel} locally. Files never leave your device.`,
  };
}

const PAIRS: Array<[InputFormatId, OutputFormatId]> = [
  ["heic", "jpg"],
  ["heic", "png"],
  ["heic", "webp"],
  ["heic", "avif"],
  ["jpg", "png"],
  ["jpg", "webp"],
  ["jpg", "avif"],
  ["png", "jpg"],
  ["png", "webp"],
  ["png", "avif"],
  ["webp", "jpg"],
  ["webp", "png"],
  ["webp", "avif"],
  ["avif", "jpg"],
  ["avif", "png"],
  ["avif", "webp"],
];

export const conversionTools: ConversionTool[] = PAIRS.map(([from, to]) =>
  makeTool(from, to),
);

export const homeTool = conversionTools[0];

export function getTool(slug: string): ConversionTool | undefined {
  return conversionTools.find((tool) => tool.slug === slug);
}

export function relatedTools(tool: ConversionTool, limit = 6): ConversionTool[] {
  return conversionTools
    .filter((item) => item.slug !== tool.slug && (item.from === tool.from || item.to === tool.to))
    .slice(0, limit);
}

export function toolsBySource(): Array<{
  from: InputFormatId;
  label: string;
  tools: ConversionTool[];
}> {
  const sources: InputFormatId[] = ["heic", "jpg", "png", "webp", "avif"];
  return sources.map((from) => ({
    from,
    label: INPUT_FORMATS[from].label,
    tools: conversionTools.filter((tool) => tool.from === from),
  }));
}

export function toolFaqs(tool: ConversionTool) {
  const from = INPUT_FORMATS[tool.from].label;
  const to = OUTPUT_FORMATS[tool.to].label;
  const output = OUTPUT_FORMATS[tool.to];

  return [
    {
      question: `Why convert ${from} to ${to}?`,
      answer: tool.lead,
    },
    {
      question: `Is this ${from} to ${to} converter free?`,
      answer:
        "Yes. Conversion runs in your browser with no account, watermark, or daily quota. You can convert up to 50 files at a time.",
    },
    {
      question: `Do my ${from} files get uploaded?`,
      answer:
        "No. Decoding and encoding happen in this tab. We cannot see, store, or share your photos.",
    },
    {
      question: output.usesQuality
        ? `Does ${from} to ${to} reduce quality?`
        : `Is ${to} lossless?`,
      answer: output.usesQuality
        ? `The file is re-encoded as ${to} at the quality you choose. The default 90% High setting is visually lossless for most photos.`
        : "PNG output is lossless. The pixels are written without JPEG-style compression.",
    },
    {
      question: `Can I keep EXIF when converting ${from} to ${to}?`,
      answer: output.supportsExif
        ? "Yes. Leave Keep EXIF checked to copy camera, timestamp, and GPS tags into the JPG."
        : `${to} downloads from this page do not include EXIF. Use the JPG converter if you need metadata.`,
    },
  ];
}
