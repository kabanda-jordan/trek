import VehicleDetailClient from "./client";

export function generateStaticParams() {
  return [
    { slug: "toyota-land-cruiser" },
    { slug: "mercedes-sprinter" },
  ];
}

export default function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <VehicleDetailClient params={params} />;
}
