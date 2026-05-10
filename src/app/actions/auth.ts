"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(_: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      email:    formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (e) {
    if (e instanceof AuthError && e.type === "CredentialsSignin") {
      return { error: "Invalid email or password." };
    }
    throw e; // re-throw redirect
  }
}
