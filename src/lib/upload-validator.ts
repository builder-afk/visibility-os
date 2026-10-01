// File upload security validation: size limits, MIME allowlist, and magic-byte inspection

export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

// Magic bytes signatures for popular image types
const MAGIC_BYTE_SIGNATURES: Record<string, number[]> = {
  'image/jpeg': [0xff, 0xd8, 0xff],
  'image/png': [0x89, 0x50, 0x4e, 0x47],
  'image/webp': [0x52, 0x49, 0x46, 0x46], // 'RIFF'
}

export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validates uploaded file against size, MIME type, and magic bytes.
 */
export async function validateUploadedImage(file: File): Promise<ValidationResult> {
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  // 1. Enforce strict size limit
  if (file.size > MAX_IMAGE_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds the 5MB limit (provided: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`,
    }
  }

  if (file.size === 0) {
    return { valid: false, error: 'File is empty' }
  }

  // 2. Validate declared MIME type
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Allowed formats: JPEG, PNG, WebP`,
    }
  }

  // 3. Inspect magic bytes to prevent file disguise / polyglot attacks
  try {
    const headerBuffer = await file.slice(0, 8).arrayBuffer()
    const bytes = new Uint8Array(headerBuffer)
    const expectedMagic = MAGIC_BYTE_SIGNATURES[file.type]

    if (expectedMagic) {
      const matches = expectedMagic.every((expectedByte, index) => bytes[index] === expectedByte)
      if (!matches) {
        return {
          valid: false,
          error: 'File content does not match the declared image format.',
        }
      }
    }
  } catch {
    return { valid: false, error: 'Unable to inspect file headers.' }
  }

  return { valid: true }
}
