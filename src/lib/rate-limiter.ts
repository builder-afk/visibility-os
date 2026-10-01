// Sliding window in-memory rate limiter for Edge / Node.js runtimes

interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitRecord>()

// Periodic cleanup every 60 seconds to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }, 60000)
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
}

/**
 * Checks if a given key has exceeded the rate limit.
 * @param key Unique identifier (IP, user ID, endpoint+IP)
 * @param limit Maximum allowed requests within the window
 * @param windowMs Time window in milliseconds (default: 60,000ms = 1 minute)
 */
export function checkRateLimit(
  key: string,
  limit: number = 60,
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: now + windowMs,
    }
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  record.count += 1
  return {
    allowed: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  }
}
