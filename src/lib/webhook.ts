import crypto from 'crypto'

/**
 * Constant-time verification of HMAC-SHA256 signatures to prevent timing attacks
 * @param payload Raw string payload of the request
 * @param signature Provided signature from request headers
 * @param secret Shared webhook signing secret
 */
export function verifyWebhookHmacSha256(
  payload: string,
  signature: string | null | undefined,
  secret: string
): boolean {
  if (!signature || !secret || !payload) {
    return false
  }

  try {
    const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex')
    const computedBuffer = Buffer.from(computed, 'utf8')
    const providedBuffer = Buffer.from(signature, 'utf8')

    if (computedBuffer.length !== providedBuffer.length) {
      return false
    }

    return crypto.timingSafeEqual(computedBuffer, providedBuffer)
  } catch {
    return false
  }
}
