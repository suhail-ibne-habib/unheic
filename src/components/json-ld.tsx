import { faqs } from "@/lib/faq";
import { siteConfig } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function HomeJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: siteConfig.name,
      url: siteConfig.url,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern browser with WebAssembly.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: siteConfig.description,
      featureList: [
        "Convert HEIC and HEIF photos to JPG in the browser",
        "No file upload or account required",
        "Batch conversion up to 50 files",
        "Optional EXIF and GPS preservation",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Convert HEIC to JPG in the browser",
      description:
        "Convert iPhone HEIC photos to JPG locally without uploading files to a server.",
      step: [
        {
          "@type": "HowToStep",
          name: "Add HEIC files",
          text: "Drop .HEIC or .HEIF files, or an entire folder, onto the converter.",
        },
        {
          "@type": "HowToStep",
          name: "Choose quality",
          text: "Pick JPEG quality and whether to keep EXIF metadata.",
        },
        {
          "@type": "HowToStep",
          name: "Download JPG",
          text: "Download each converted JPG, or a ZIP of the whole batch.",
        },
      ],
    },
  ];

  return <JsonLd data={data} />;
}
