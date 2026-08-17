import Link from "next/link";
import Image from "next/image";
import { truncate, formatPrice } from "@/lib/utils";
import type { DestinationSummary } from "@/types";

interface DestinationCardProps {
  destination: DestinationSummary;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3] bg-gray-100">
        {destination.coverImageUrl ? (
          <Image
            src={destination.coverImageUrl}
            alt={destination.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
          {destination.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{destination.location}</p>
        {destination.shortDesc && (
          <p className="mt-2 text-sm text-gray-600">{truncate(destination.shortDesc, 100)}</p>
        )}
        {destination.activities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {destination.activities.slice(0, 3).map((a) => (
              <span
                key={a.name}
                className="inline-block text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full"
              >
                {a.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
