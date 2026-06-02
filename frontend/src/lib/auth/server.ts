import { cookies } from "next/headers";

const TOKEN_NAME = "x-ronb-co-token";

export async function isServerAuthenticated() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) return false;

  const token = (await cookies()).get(TOKEN_NAME)?.value;
  if (!token) return false;

  try {
    const response = await fetch(`${backendUrl}/me`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}
