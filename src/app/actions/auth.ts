"use server"

import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export type LoginState = {
  error?: string
  success?: boolean
}

export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get("email") as string)?.trim()
  const password = formData.get("password") as string
  const callbackUrl = (formData.get("callbackUrl") as string) || "/dashboard"

  if (!email || !password) {
    return { error: "Please enter both your email and password." }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    })
    return { success: true }
  } catch (error: unknown) {
    const err = error as { digest?: string; name?: string; type?: string; message?: string }
    
    // In Next.js, redirect() throws a special error with digest starting with 'NEXT_REDIRECT'
    // We MUST rethrow it so Next.js can perform the redirect
    if (err.digest?.startsWith?.("NEXT_REDIRECT")) {
      throw error
    }

    if (
      err.name === "AuthError" ||
      err.name === "CallbackRouteError" ||
      err.type === "CallbackRouteError" ||
      err.type === "CredentialsSignin" ||
      err.message?.includes("CredentialsSignin") ||
      err.message?.includes("Invalid password") ||
      err.message?.includes("User not found")
    ) {
      return { error: "Invalid email or password. Please check your credentials." }
    }

    if (err.message?.includes("Service temporarily unavailable")) {
      return { error: "Database service temporarily unavailable. Please try again shortly." }
    }

    console.error("Login action error:", error)
    return { error: "Failed to sign in. Please check your details and try again." }
  }
}
