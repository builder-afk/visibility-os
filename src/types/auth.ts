export type UserRole = 'user' | 'admin' | 'guest'

export type AuthPermission = 
  | 'browse'
  | 'read_templates'
  | 'view_public'
  | 'create_project'
  | 'edit_project'
  | 'delete_project'
  | 'team_management'
  | 'admin_access'

export interface AuthUser {
  id: string
  email: string | null
  name: string
  image?: string | null
  isGuest: boolean
  role: UserRole
  permissions: AuthPermission[]
  subscriptionTier?: string
  createdAt?: string | Date
}

export interface JwtClaims {
  sub: string               // User ID or Guest ID
  email: string | null     // User email, or null for guests
  name: string             // Display name
  image?: string | null    // Avatar URL
  isGuest: boolean         // Flag indicating guest status
  role: UserRole           // 'user' | 'admin' | 'guest'
  permissions: AuthPermission[]
  type: 'access' | 'refresh'
  iat?: number             // Issued at timestamp
  exp?: number             // Expiration timestamp
  jti?: string             // Unique token identifier
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number        // Seconds until access token expires
  tokenType: 'Bearer'
}

export interface AuthSessionResponse {
  user: AuthUser | null
  isAuthenticated: boolean
  isGuest: boolean
}

export interface GoogleAuthPayload {
  credential?: string      // Google ID token from GIS (Google Identity Services)
  code?: string            // Authorization code from OAuth 2.0 flow
  redirectUri?: string
}

export interface GoogleTokenInfo {
  sub: string              // Google account ID
  email: string
  email_verified: boolean | string
  name: string
  picture?: string
  given_name?: string
  family_name?: string
}
