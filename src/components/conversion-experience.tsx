import { Converter } from "@/components/converter";
import { FaqList } from "@/components/faq-list";
import { FeatureCards } from "@/components/feature-cards";
import { RelatedConverters } from "@/components/related-converters";
import { JsonLd } from "@/components/json-ld";
import { INPUT_FORMATS, OUTPUT_FORMATS } from "@/lib/formats";
import { siteConfig } from "@/lib/site";
import { toolFaqs, type ConversionTool } from "@/lib/tools";

export function ConversionExperience({
  tool,
  showFeatures = false,
}: {
  tool: ConversionTool;
  showFeatures?: boolean;
}) {
  const from = INPUT_FORMATS[tool.from].label;
  const to = OUTPUT_FORMATS[tool.to].label;
  const faqs = toolFaqs(tool);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${siteConfig.name} ${from} to ${to}`,
      url: `${siteConfig.url}${tool.href === "/" ? "" : tool.href}`,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: tool.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `Convert ${from} to ${to} in the browser`,
      description: tool.lead,
      step: [
        {
          "@type": "HowToStep",
          name: `Add ${from} files`,
          text: `Drop ${from} files onto the converter.`,
        },
        {
          "@type": "HowToStep",
          name: `Convert to ${to}`,
          text: `${siteConfig.name} converts ${from} to ${to} on your device.`,
        },
        {
          "@type": "HowToStep",
          name: `Download ${to}`,
          text: `Download each ${to} file or a ZIP of the batch.`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="px-4 pt-12 pb-8 text-center sm:px-6 sm:pt-16">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          WebAssembly Engine {siteConfig.engine}
          <span className="text-slate-300">•</span>
          Client-Side Native
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15]">
          Convert {from} to <span className="text-blue-600">{to}</span> Online
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          {tool.lead}
        </p>
      </section>
      <Converter key={tool.slug} tool={tool} />
      {showFeatures ? <FeatureCards /> : null}
      <RelatedConverters tool={tool} />
      <FaqList items={faqs} />
    </>
  );
}
