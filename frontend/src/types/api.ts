export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

export interface DashboardStats {
  totalDestinations: number;
  totalSafaris: number;
  totalVehicles: number;
  totalCompanies: number;
  totalBookings: number;
  totalUsers: number;
  recentBookings: any[];
  recentReviews: any[];
  monthlyRevenue: number;
}
