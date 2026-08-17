import Link from "next/link";
import Image from "next/image";
import { formatPrice, getVehicleTypeLabel } from "@/lib/utils";
import type { Vehicle } from "@/types";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className="group block rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3] bg-gray-100">
        {vehicle.coverImageUrl ? (
          <Image
            src={vehicle.coverImageUrl}
            alt={vehicle.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
        <span className="absolute top-2 left-2 text-xs bg-white/90 text-gray-700 px-2 py-1 rounded-full font-medium">
          {getVehicleTypeLabel(vehicle.type)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
          {vehicle.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{vehicle.company.name}</p>
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
          <span>{vehicle.seats} seats</span>
          <span>{vehicle.transmission}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-green-700">
            {formatPrice(vehicle.pricePerDay)}/day
          </span>
        </div>
      </div>
    </Link>
  );
}
