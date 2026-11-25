export type AuthUser = {
  id: string
  email: string
  name: string
  role: string
}

export type TokenPair = {
  accessToken: string
  refreshToken: string
}

export type AuthRequest = {
  user: AuthUser
  accessToken: string
}
