import { DestinationSummary } from "./destination";

export type DifficultyLevel = "EASY" | "MODERATE" | "CHALLENGING" | "STRENUOUS";

export interface SafariImage {
  id: string;
  imageUrl: string;
  altText?: string;
  isCover: boolean;
  sortOrder: number;
}

export interface Safari {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc?: string;
  durationDays: number;
  durationNights: number;
  price: number;
  currency: string;
  maxParticipants: number;
  difficultyLevel: DifficultyLevel;
  coverImageUrl?: string;
  includedItems?: string;
  excludedItems?: string;
  itinerary?: string;
  destination: DestinationSummary;
  activities: { id: string; name: string }[];
  images: SafariImage[];
  isPublished: boolean;
  createdAt: string;
}

export interface SafariDetail extends Safari {
  reviews: {
    averageRating: number;
    totalReviews: number;
  };
}
