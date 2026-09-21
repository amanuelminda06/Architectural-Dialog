import { createHmac } from "crypto";
import { cookies } from "next/headers";

const SESSION = "admin_session";

function expectedToken(password: string): string {
  return createHmac("sha256", "arch-dialogue-admin").update(password).digest("hex");
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION, expectedToken(getAdminPassword()), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION)?.value;
  if (!value) return false;
  return value === expectedToken(getAdminPassword());
}