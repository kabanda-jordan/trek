import DestinationDetailClient from "./client";

export function generateStaticParams() {
  return [
    { slug: "volcanoes-national-park" },
    { slug: "nyungwe-forest-national-park" },
    { slug: "akagera-national-park" },
    { slug: "lake-kivu" },
    { slug: "kigali-city" },
    { slug: "musanze-caves" },
    { slug: "inema-arts-center" },
    { slug: "royal-palace-huye" },
  ];
}

export default function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <DestinationDetailClient params={params} />;
}
