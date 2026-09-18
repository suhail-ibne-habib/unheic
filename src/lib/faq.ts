export const faqs = [
  {
    question: "Why do I need to convert HEIC to JPG?",
    answer:
      "iPhones and many cameras save photos as HEIC to keep file sizes small. JPG is still the format that Windows, email, printers, CMS tools, and most websites expect. Converting HEIC to JPG makes those photos open everywhere without installing extra codecs.",
  },
  {
    question: "Which image formats can Unheic convert?",
    answer:
      "Drop HEIC, HEIF, JPG, PNG, WebP, AVIF, or GIF files, then choose JPG, PNG, WebP, or AVIF as the output. HEIC is decoded with a WebAssembly libheif engine; the other formats are re-encoded in your browser. AVIF output depends on browser support.",
  },
  {
    question: "Is Unheic truly free and unlimited?",
    answer:
      "Yes. Unheic is a free in-browser converter with no account, watermark, or daily quota. You can convert up to 50 files at a time, then start another batch immediately. Because conversion runs on your device, we do not meter uploads.",
  },
  {
    question: "Does image quality degrade during conversion?",
    answer:
      "Lossy formats (JPG, WebP, AVIF) are encoded at the quality you choose. The default 90% High setting is visually lossless for most photos. PNG is lossless. HEIC is decoded first, then encoded to your chosen format.",
  },
  {
    question: "Can anyone see my uploaded photos?",
    answer:
      "No. Nothing is uploaded. Your files are decoded inside this browser tab and never sent to a server. We cannot see, store, or share your pictures — they never leave your device.",
  },
  {
    question: "Does converting keep EXIF and GPS data?",
    answer:
      "Yes for JPG output, when Keep EXIF is enabled. Unheic copies camera make and model, capture time, lens details, and GPS coordinates into the JPG. PNG, WebP, and AVIF downloads do not include EXIF.",
  },
] as const;
