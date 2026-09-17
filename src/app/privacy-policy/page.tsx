import type { Metadata } from "next";
import { ContentCard, PageHero } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Unheic, the in-browser HEIC to JPG converter. Photos are processed locally and are never uploaded.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        description="Last updated September 17, 2026. Unheic converts HEIC images on your device and does not operate a photo processing service."
      />
      <ContentCard>
        <div className="space-y-8 text-sm leading-6 text-slate-500">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Images you convert</h2>
            <p className="mt-2">
              HEIC and HEIF files you drop onto Unheic are processed in your
              browser. They are not transmitted to our servers, written to our
              storage, or shared with processors.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Website logs</h2>
            <p className="mt-2">
              Hosting infrastructure may record standard request data such as IP
              address, user agent, and the page URL. That data is used to operate
              and secure the site. It does not include the contents of your photos.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Cookies</h2>
            <p className="mt-2">
              Unheic does not use advertising cookies or conversion tracking.
              Conversion settings stay in memory for the current visit only.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">
              For privacy questions about this client-side converter, open an
              issue on the project repository or contact the site operator listed
              on your deployment.
            </p>
          </section>
        </div>
      </ContentCard>
    </>
  );
}
