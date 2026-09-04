export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  ALLOWED_ORIGINS?: string;
  ENVIRONMENT?: string;
}

export type Variables = {
  user: any;
  userEmail: string;
  userRole: string;
};
