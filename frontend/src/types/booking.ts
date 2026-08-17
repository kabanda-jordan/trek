export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID" | "REFUNDED";

export interface Booking {
  id: string;
  bookingRef: string;
  userId: string;
  safari?: {
    id: string;
    name: string;
    slug: string;
  };
  vehicle?: {
    id: string;
    name: string;
    slug: string;
  };
  destination?: {
    id: string;
    name: string;
    slug: string;
  };
  startDate: string;
  endDate: string;
  participants: number;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  specialRequests?: string;
  adminNotes?: string;
  createdAt: string;
}

export interface CreateBookingRequest {
  safariId?: string;
  vehicleId?: string;
  destinationId?: string;
  startDate: string;
  endDate: string;
  participants: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  specialRequests?: string;
}
