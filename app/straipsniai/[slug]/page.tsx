import ContentDetail from "../../../components/ContentDetail";
import type { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const url = `https://qwcmbxmfluznhrqitqlp.supabase.co/rest/v1/articles?slug=eq.${encodeURIComponent(slug)}&select=*`;
  const rows = await fetch(url, {
    headers: { apikey: "sb_publishable_F7JBtDbCG7OVxw8DvEPozg_RS36MJGv" },
  })
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
  const x = rows[0] || {};
  return {
    title: x.seo_title_lt || x.title_lt || "Straipsnis — Skeptic Youth",
    description: x.seo_description_lt || x.excerpt_lt || "",
    openGraph: x.social_image_url
      ? { images: [x.social_image_url] }
      : undefined,
  };
}
export default function ArticlePage() {
  return <ContentDetail kind="articles" />;
}
