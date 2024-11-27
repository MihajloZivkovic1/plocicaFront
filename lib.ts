"use server"
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js"

const SECRET_KEY = "secretKey123";
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(credentials: { email: string; password: string }) {

  console.log("Credentials", credentials);
  const encryptedPayload = CryptoJS.AES.encrypt(
    JSON.stringify(credentials),
    SECRET_KEY
  ).toString();
  console.log("Ecnrypted Payload", encryptedPayload);
  const res = await fetch('http://localhost:3000/users/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: encryptedPayload }),

  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse the error response from the server
    throw new Error(errorData.error || "Unexpected error");
  }

  const user = await res.json();
  console.log("User:", user);
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
  const session = await encrypt({ user, expires });

  (await cookies()).set("session", session, { expires, httpOnly: true });
}


export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
  return NextResponse.redirect('http://localhost:3001/login');
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}