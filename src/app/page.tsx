import type { Metadata } from "next";
import { ConversionExperience } from "@/components/conversion-experience";
import { homeTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: homeTool.title,
  description: homeTool.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <ConversionExperience tool={homeTool} showFeatures />;
}
