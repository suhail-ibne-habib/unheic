import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConversionExperience } from "@/components/conversion-experience";
import { conversionTools, getTool, homeTool } from "@/lib/tools";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return conversionTools
    .filter((tool) => tool.slug !== homeTool.slug)
    .map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || tool.slug === homeTool.slug) {
    return {};
  }

  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: tool.href },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: tool.href,
    },
  };
}

export default async function ConversionPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || tool.slug === homeTool.slug) {
    notFound();
  }

  return <ConversionExperience tool={tool} />;
}
