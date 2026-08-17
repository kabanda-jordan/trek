import Link from "next/link";
import Image from "next/image";
import { truncate, formatPrice, getDifficultyLabel } from "@/lib/utils";
import { cloudinaryCard } from "@/lib/cloudinary";
import type { SafariSummary } from "@/types";

interface SafariCardProps {
  safari: SafariSummary;
}

export default function SafariCard({ safari }: SafariCardProps) {
  return (
    <Link
      href={`/safaris/${safari.slug}`}
      className="group block rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3] bg-gray-100">
        {safari.coverImageUrl ? (
          <Image
            src={cloudinaryCard(safari.coverImageUrl)}
            alt={safari.name}
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
          {safari.name}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
          <span>{safari.durationDays} days</span>
        </div>
        {safari.shortDesc && (
          <p className="mt-2 text-sm text-gray-600">{truncate(safari.shortDesc, 100)}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-green-700">
            {formatPrice(safari.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
