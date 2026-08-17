export interface Review {
  id: string;
  userId: string;
  userName: string;
  destinationId?: string;
  safariId?: string;
  bookingId?: string;
  rating: number;
  title?: string;
  comment: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface CreateReviewRequest {
  destinationId?: string;
  safariId?: string;
  rating: number;
  title?: string;
  comment: string;
}
