export type VehicleType =
  | "CAR"
  | "SUV"
  | "SAFARI_VEHICLE"
  | "VAN"
  | "MINIBUS"
  | "LUXURY";

export type Transmission = "AUTOMATIC" | "MANUAL";
export type FuelType = "DIESEL" | "PETROL" | "HYBRID" | "ELECTRIC";

export interface VehicleCompany {
  id: string;
  name: string;
  slug: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  logoUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface VehicleImage {
  id: string;
  imageUrl: string;
  altText?: string;
  isCover: boolean;
  sortOrder: number;
}

export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  type: VehicleType;
  brand?: string;
  model?: string;
  year?: number;
  seats: number;
  transmission: Transmission;
  fuelType: FuelType;
  features?: string;
  pricePerDay: number;
  currency: string;
  coverImageUrl?: string;
  isAvailable: boolean;
  isPublished: boolean;
  company: VehicleCompany;
  images: VehicleImage[];
  createdAt: string;
}
