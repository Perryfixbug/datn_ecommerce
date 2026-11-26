// Đường dẫn storefront dùng chung cho liên kết và proxy. Giữ ở một chỗ để các
// component không tự đặt URL. Những tuyến chưa được dựng (sản phẩm, tìm kiếm,
// giỏ hàng, tài khoản…) vẫn khai báo trước để liên kết nhất quán.

export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  search: "/search",
  livestream: "/livestream",
  sellerChannel: "/seller",
  about: "/about",
  terms: "/terms",
  cart: "/cart",
  notifications: "/notifications",
  account: {
    profile: "/account/profile",
    addresses: "/account/addresses",
    wallet: "/account/wallet",
    orders: "/account/orders",
    password: "/account/password",
  },
  product: (slug: string) => `/products/${encodeURIComponent(slug)}`,
  room: (slug: string) => `/search?room=${encodeURIComponent(slug)}`,
  allProducts: "/search",
} as const

/**
 * Tiền tố tuyến bắt buộc đăng nhập. Trang chủ, tìm kiếm, sản phẩm và gian hàng
 * là công khai; chỉ dữ liệu riêng của người mua cần phiên đăng nhập.
 */
export const PROTECTED_PATH_PREFIXES = [
  "/account",
  "/cart",
  "/checkout",
  "/notifications",
] as const

export function isProtectedPath(path: string): boolean {
  return PROTECTED_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  )
}
