export const faqs = [
  {
    question: "Why do I need to convert HEIC to JPG?",
    answer:
      "iPhones and many cameras save photos as HEIC to keep file sizes small. JPG is still the format that Windows, email, printers, CMS tools, and most websites expect. Converting HEIC to JPG makes those photos open everywhere without installing extra codecs.",
  },
  {
    question: "Is Unheic truly free and unlimited?",
    answer:
      "Yes. Unheic is a free in-browser converter with no account, watermark, or daily quota. You can convert up to 50 HEIC or HEIF files at a time, then start another batch immediately. Because conversion runs on your device, we do not meter uploads.",
  },
  {
    question: "Does image quality degrade during conversion?",
    answer:
      "HEIC is decoded with a WebAssembly libheif engine, then encoded as JPEG at the quality you choose. The default 90% High setting is visually lossless for most photos. Raise it to 95% when you need maximum fidelity, or lower it when you want smaller files.",
  },
  {
    question: "Can anyone see my uploaded photos?",
    answer:
      "No. Nothing is uploaded. Your HEIC files are decoded inside this browser tab and never sent to a server. We cannot see, store, or share your pictures — they never leave your device.",
  },
  {
    question: "How do I convert iPhone HEIC photos to JPG on Windows?",
    answer:
      "Drop the .HEIC files from your iPhone, AirDrop folder, or USB export onto this page. Unheic converts them locally to JPG and lets you download each image — or a ZIP of the whole batch — without iCloud or extra desktop software.",
  },
  {
    question: "Does converting HEIC to JPG keep EXIF and GPS data?",
    answer:
      "Yes, when Keep EXIF is enabled. Unheic copies camera make and model, capture time, lens details, and GPS coordinates into the JPG. Turn the option off if you want a clean file with no location metadata.",
  },
] as const;
