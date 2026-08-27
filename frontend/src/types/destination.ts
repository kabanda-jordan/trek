export interface Activity {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface DestinationImage {
  id: string;
  imageUrl: string;
  altText?: string;
  isCover: boolean;
  sortOrder: number;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc?: string;
  location: string;
  district?: string;
  province?: string;
  coverImageUrl?: string;
  openingHours?: string;
  thingsToKnow?: string;
  latitude?: number;
  longitude?: number;
  isPublished: boolean;
  isFeatured?: boolean;
  sortOrder: number;
  activities: Activity[];
  images: DestinationImage[];
  createdAt: string;
}

export interface DestinationSummary {
  id: string;
  name: string;
  slug: string;
  shortDesc?: string;
  location: string;
  district?: string;
  coverImageUrl?: string;
  activities: { name: string }[];
}

export interface DestinationDetail extends Destination {
  reviews: {
    averageRating: number;
    totalReviews: number;
  };
  nearbyDestinations: DestinationSummary[];
  safaris: SafariSummary[];
}

export interface SafariSummary {
  id: string;
  name: string;
  slug: string;
  shortDesc?: string;
  durationDays: number;
  price: number;
  currency: string;
  coverImageUrl?: string;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
}
