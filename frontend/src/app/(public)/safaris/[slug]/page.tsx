import SafariDetailClient from "./client";

export function generateStaticParams() {
  return [
    { slug: "gorilla-trekking" },
    { slug: "nyungwe-canopy" },
    { slug: "akagera-safari" },
  ];
}

export default function SafariDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <SafariDetailClient params={params} />;
}
