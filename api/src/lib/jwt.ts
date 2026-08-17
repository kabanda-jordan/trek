import { SignJWT, jwtVerify } from "jose";

const EXPIRES_IN = "1d";
const REFRESH_EXPIRES_IN = "7d";

function getSecret(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function signToken(email: string, role: string, secret: string): Promise<string> {
  return new SignJWT({ sub: email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(getSecret(secret));
}

export async function signRefreshToken(email: string, secret: string): Promise<string> {
  return new SignJWT({ sub: email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_EXPIRES_IN)
    .sign(getSecret(secret));
}

export async function verifyToken(token: string, secret: string) {
  const { payload } = await jwtVerify(token, getSecret(secret));
  return payload;
}

export function extractEmailFromToken(payload: any): string {
  return payload.sub as string;
}

export function extractRoleFromToken(payload: any): string {
  return (payload.role as string) || "CUSTOMER";
}
