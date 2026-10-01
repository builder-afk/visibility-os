import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import { users, accounts, sessions, verificationTokens } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "miracle-auth-secret-key-minimum-32-characters-2026"

// Pre-computed dummy bcrypt hash to ensure constant-time comparison on user not found
const DUMMY_HASH = "$2a$12$e8kZ150MsqWcUGvj3i4.G.R6eP0rOq0T9j7kC6YqV2dE3F4G5H6Ia"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_ID || process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET || process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = (credentials.email as string).trim().toLowerCase()
        const password = credentials.password as string

        let user
        try {
          user = await db.select().from(users).where(eq(users.email, email)).limit(1)
        } catch (dbError: any) {
          console.error("Database unavailable during login")
          throw new Error("Service temporarily unavailable. Please try again later.")
        }

        const foundUser = user && user.length > 0 ? user[0] : null
        const hashToCompare = foundUser?.password || DUMMY_HASH
        const isValid = await bcrypt.compare(password, hashToCompare)

        // Unified error message prevents user enumeration attacks
        if (!foundUser || !isValid) {
          throw new Error("Invalid credentials. Please check your email and password.")
        }

        return foundUser
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = (token.role as string) || 'user'
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
