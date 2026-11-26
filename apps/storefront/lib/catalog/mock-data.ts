// Dữ liệu mẫu tĩnh cho giao diện người mua, lấy theo nội dung thiết kế Figma.
// API hiện chưa có endpoint sản phẩm/danh mục; khi TypeSpec và backend có
// hợp đồng tương ứng, thay tệp này bằng hook trong packages/api-client thay vì
// mở rộng thêm kiểu dữ liệu viết tay.

export interface ProductSummary {
  slug: string
  name: string
  category: string
  price: number
  rating: number
  reviewCount: number
  soldCount: number
  image: string
  isNew?: boolean
}

export interface RoomCategory {
  slug: string
  name: string
  image: string
}

export interface FeaturedRoom {
  slug: string
  name: string
  image: string
}

export interface ChatConversation {
  id: string
  name: string
  preview: string
  kind: "assistant" | "shop"
}

export const BEST_SELLING_PRODUCTS: ProductSummary[] = [
  {
    slug: "ghe-sofa-may",
    name: "Ghế sofa Mây",
    category: "Sofa",
    price: 12_490_000,
    rating: 4.7,
    reviewCount: 38,
    soldCount: 156,
    image: "/images/products/ghe-sofa-may.jpg",
    isNew: true,
  },
  {
    slug: "ghe-thu-gian-nep",
    name: "Ghế thư giãn Nếp",
    category: "Ghế",
    price: 3_290_000,
    rating: 5,
    reviewCount: 57,
    soldCount: 226,
    image: "/images/products/ghe-thu-gian-nep.jpg",
    isNew: true,
  },
  {
    slug: "ban-tra-go-soi",
    name: "Bàn trà Gỗ Sồi",
    category: "Bàn",
    price: 4_590_000,
    rating: 4.9,
    reviewCount: 76,
    soldCount: 296,
    image: "/images/products/ban-tra-go-soi.jpg",
  },
  {
    slug: "den-dung-suong",
    name: "Đèn đứng Sương",
    category: "Đèn",
    price: 1_590_000,
    rating: 4.8,
    reviewCount: 95,
    soldCount: 366,
    image: "/images/products/den-dung-suong.jpg",
  },
  {
    slug: "ke-go-tang",
    name: "Kệ gỗ Tầng",
    category: "Kệ",
    price: 3_890_000,
    rating: 4.7,
    reviewCount: 114,
    soldCount: 436,
    image: "/images/products/ke-go-tang.jpg",
  },
  {
    slug: "tham-det-van",
    name: "Thảm dệt Vân",
    category: "Thảm",
    price: 1_790_000,
    rating: 5,
    reviewCount: 133,
    soldCount: 506,
    image: "/images/products/tham-det-van.jpg",
    isNew: true,
  },
  {
    slug: "ghe-an-lung-cong",
    name: "Ghế ăn Lưng Cong",
    category: "Ghế",
    price: 1_890_000,
    rating: 4.9,
    reviewCount: 152,
    soldCount: 576,
    image: "/images/products/ghe-an-lung-cong.jpg",
  },
  {
    slug: "tu-thap-moc",
    name: "Tủ thấp Mộc",
    category: "Tủ",
    price: 6_490_000,
    rating: 4.8,
    reviewCount: 171,
    soldCount: 556,
    image: "/images/products/tu-thap-moc.jpg",
  },
]

export const RECOMMENDED_PRODUCTS: ProductSummary[] = [
  {
    slug: "sofa-goc-lua",
    name: "Sofa Góc Lụa",
    category: "Sofa",
    price: 16_990_000,
    rating: 4.7,
    reviewCount: 190,
    soldCount: 626,
    image: "/images/products/sofa-goc-lua.jpg",
  },
  {
    slug: "ban-an-tron",
    name: "Bàn ăn Tròn",
    category: "Bàn",
    price: 7_490_000,
    rating: 5,
    reviewCount: 209,
    soldCount: 696,
    image: "/images/products/ban-an-tron.jpg",
  },
  {
    slug: "ghe-banh-om",
    name: "Ghế bành Ôm",
    category: "Ghế",
    price: 4_990_000,
    rating: 4.9,
    reviewCount: 228,
    soldCount: 766,
    image: "/images/products/ghe-banh-om.jpg",
  },
  {
    slug: "den-ban-nang",
    name: "Đèn bàn Nắng",
    category: "Đèn",
    price: 990_000,
    rating: 4.8,
    reviewCount: 247,
    soldCount: 836,
    image: "/images/products/den-ban-nang.jpg",
  },
  {
    slug: "ke-sach-them",
    name: "Kệ sách Thềm",
    category: "Kệ",
    price: 5_490_000,
    rating: 4.7,
    reviewCount: 56,
    soldCount: 276,
    image: "/images/products/ke-sach-them.jpg",
  },
  {
    slug: "ban-phu-nau",
    name: "Bàn phụ Nâu",
    category: "Bàn",
    price: 1_490_000,
    rating: 5,
    reviewCount: 75,
    soldCount: 346,
    image: "/images/products/ban-phu-nau.jpg",
  },
  {
    slug: "ghe-don-dem",
    name: "Ghế đôn Đệm",
    category: "Ghế",
    price: 1_290_000,
    rating: 4.9,
    reviewCount: 94,
    soldCount: 326,
    image: "/images/products/ghe-don-dem.jpg",
  },
  {
    slug: "tu-dau-giuong-nha",
    name: "Tủ đầu giường Nhã",
    category: "Tủ",
    price: 2_690_000,
    rating: 4.8,
    reviewCount: 113,
    soldCount: 396,
    image: "/images/products/tu-dau-giuong-nha.jpg",
  },
]

/** Danh mục trong menu thả xuống ở đầu trang. */
export const HEADER_ROOMS: Pick<RoomCategory, "slug" | "name">[] = [
  { slug: "phong-khach", name: "Phòng khách" },
  { slug: "phong-ngu", name: "Phòng ngủ" },
  { slug: "phong-an", name: "Phòng ăn" },
]

/** Dải "Khám phá danh mục sản phẩm" trên trang chủ. */
export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    slug: "phong-khach",
    name: "Phòng khách",
    image: "/images/rooms/phong-khach.jpg",
  },
  {
    slug: "phong-ngu",
    name: "Phòng ngủ",
    image: "/images/rooms/phong-ngu.jpg",
  },
  { slug: "phong-an", name: "Phòng ăn", image: "/images/rooms/phong-an.jpg" },
  {
    slug: "phong-lam-viec",
    name: "Phòng làm việc",
    image: "/images/rooms/phong-lam-viec.jpg",
  },
  {
    slug: "phong-bep",
    name: "Phòng bếp",
    image: "/images/rooms/phong-bep.jpg",
  },
  { slug: "loi-vao", name: "Lối vào", image: "/images/rooms/loi-vao.jpg" },
  {
    slug: "trang-tri",
    name: "Trang trí",
    image: "/images/rooms/trang-tri.jpg",
  },
  {
    slug: "goc-thu-gian",
    name: "Góc thư giãn",
    image: "/images/rooms/goc-thu-gian.jpg",
  },
]

/** Khối "Danh mục nổi bật": hai ô nhỏ bên trái và một ô lớn bên phải. */
export const FEATURED_ROOMS: {
  small: FeaturedRoom[]
  large: FeaturedRoom
} = {
  small: [
    {
      slug: "phong-ngu",
      name: "Phòng ngủ",
      image: "/images/rooms/feature-bedroom.jpg",
    },
    {
      slug: "phong-an",
      name: "Phòng ăn",
      image: "/images/rooms/feature-dining.jpg",
    },
  ],
  large: {
    slug: "phong-khach",
    name: "Phòng khách",
    image: "/images/rooms/feature-living.jpg",
  },
}

/** Số đếm trên đầu trang khi đã đăng nhập (giỏ hàng, thông báo, chat). */
export const HEADER_BADGES = {
  cart: 3,
  notifications: 2,
  unreadChats: 1,
} as const

export const HERO_BANNER = {
  image: "/images/banners/hero-living-room.jpg",
} as const

export const CHAT_CONVERSATIONS: ChatConversation[] = [
  {
    id: "ai-chatbot",
    name: "AI Chatbot",
    preview: "Bạn cần tìm món nội thất nào?",
    kind: "assistant",
  },
  {
    id: "nha-go",
    name: "Nhà Gỗ",
    preview: "Shop còn mẫu vải lanh bạn hỏi ạ.",
    kind: "shop",
  },
  {
    id: "van-home",
    name: "Vân Home",
    preview: "Dạ, shop giao hàng tận nơi ạ.",
    kind: "shop",
  },
]
