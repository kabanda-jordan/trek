export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

export type Variables = {
  user: any;
  userEmail: string;
  userRole: string;
};
