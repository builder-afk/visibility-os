import { NextResponse } from 'next/server'
import { db } from '@/db'
import { contactMessages } from '@/db/schema'
import { checkRateLimit } from '@/lib/rate-limiter'
import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255),
  company: z.string().trim().max(100).optional().nullable(),
  mobileNumber: z.string().trim().max(25).optional().nullable(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(3000, "Message exceeds 3,000 characters limit"),
})

export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1"
    const rl = checkRateLimit(`contact_${clientIp}`, 5, 10 * 60 * 1000) // 5 per 10 minutes

    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait a few minutes before trying again.' },
        { status: 429 }
      )
    }

    const rawBody = await request.json().catch(() => null)
    if (!rawBody) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    const parsed = ContactSchema.safeParse(rawBody)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, company, mobileNumber, message } = parsed.data

    await db.insert(contactMessages).values({
      name,
      email,
      company: company || null,
      mobileNumber: mobileNumber || null,
      message,
    })

    return NextResponse.json(
      { success: true, message: 'Your message has been received securely.' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to submit your message at this time. Please try again later.' },
      { status: 500 }
    )
  }
}
