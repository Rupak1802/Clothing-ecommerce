export const PRODUCTS = [
  {
    id: "prod-1",
    name: "Drop Shoulder T-shirt",
    price: 220,
    oldPrice: 310,
    category: "Outerwear",
    collection: "oversized",
    badge: "SALE",
    images: ["/trench_oatmeal.png", "/trench_navy.png", "/trench_black.png"],
    description: "A fluid, double-breasted trench coat crafted from premium structured linen and organic cotton blend. Designed with clean minimal lapels, a waist-defining belt, and oversized storm flaps. An editorial staple for transition season layering.",
    colors: [
      { name: "Oatmeal", hex: "#DCD7C9" },
      { name: "Navy Blue", hex: "#2C3E50" },
      { name: "Obsidian Black", hex: "var(--color-text-light)" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewsCount: 24,
    tags: ["Best Seller", "Organic Cotton"]
  },
  {
    id: "prod-2",
    name: "Polo T-shirt",
    price: 145,
    oldPrice: null,
    category: "Knitwear",
    collection: "polos",
    badge: "NEW DROP",
    images: ["/polo -1.jpg"],
    description: "Oversized chunky knit sweater knitted in organic wool and alpaca blend. Features relaxed drop shoulders, a mock neck collar, and ribbed trim details. Soft on skin and heavy enough to retain a sculptural silhouette.",
    colors: [
      { name: "Charcoal", hex: "#3A3B3C" },
      { name: "Cream", hex: "#E3DCC9" },
      { name: "Taupe", hex: "#7D6B5D" }
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewsCount: 18,
    tags: ["Alpaca Wool", "Heavyweight"]
  },
  {
    id: "prod-3",
    name: "Henley Shirt",
    price: 180,
    oldPrice: 240,
    category: "Dresses",
    collection: "regulars",
    badge: "SALE",
    images: ["/regular -1.jpg"],
    description: "An elegant, flowy midi-length slip dress woven in heavy lustrous black silk-satin. Bias-cut for a drape that contours the body, featuring delicate cross-back spaghetti straps and a subtle cowl neckline.",
    colors: [
      { name: "Black Satin", hex: "var(--color-text-light)" },
      { name: "Champagne", hex: "#E5D9C4" },
      { name: "Bronze", hex: "#A27B5C" }
    ],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviewsCount: 32,
    tags: ["100% Silk", "Fluid Silhouette"]
  },
  {
    id: "prod-4",
    name: "Baggy Jeans",
    price: 160,
    oldPrice: null,
    category: "Pants",
    collection: "oversized",
    badge: null,
    images: ["/oversized - 2.jpg"],
    description: "High-waisted wide-leg tailored trousers cut from soft structured wool-twill. Finished with pressed creases, deep double pleats, and side slip pockets for a relaxed yet commanding look.",
    colors: [
      { name: "Olive Green", hex: "#556B2F" },
      { name: "Midnight Black", hex: "var(--color-text-light)" },
      { name: "Sand", hex: "#F5F5DC" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviewsCount: 15,
    tags: ["Wool-Twill", "Wide-Leg"]
  },
  {
    id: "prod-5",
    name: "Classic Crewneck",
    price: 95,
    oldPrice: 120,
    category: "T-Shirts",
    collection: "regulars",
    badge: "BEST SELLER",
    images: ["/regular -1.jpg"],
    description: "A timeless crewneck t-shirt made from heavy-weight ringspun cotton. Pre-shrunk and garment-dyed for a vintage feel and long-lasting color. The perfect foundational piece for any outfit.",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Ash Grey", hex: "#B2BEB5" },
      { name: "Navy", hex: "#000080" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 112,
    tags: ["Heavyweight", "Garment Dyed"]
  },
  {
    id: "prod-6",
    name: "Oversized Hoodie",
    price: 150,
    oldPrice: null,
    category: "Sweatshirts",
    collection: "oversized",
    badge: "NEW",
    images: ["/Oversized outfit.jpg"],
    description: "Ultra-cozy oversized hoodie constructed from dense French terry cotton. Features a drop-shoulder design, spacious kangaroo pocket, and double-lined hood for extra warmth and structure.",
    colors: [
      { name: "Heather Grey", hex: "#9BA1A6" },
      { name: "Mocha", hex: "#7E6A59" },
      { name: "Black", hex: "#1A1A1A" }
    ],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviewsCount: 45,
    tags: ["French Terry", "Relaxed Fit"]
  },
  {
    id: "prod-7",
    name: "Textured Knitted Polo",
    price: 135,
    oldPrice: 160,
    category: "Knitwear",
    collection: "polos",
    badge: null,
    images: ["/Polo outfit.jpg"],
    description: "A refined take on the classic polo. This piece features a unique waffle-knit texture woven from a breathable cotton-silk blend. Finished with a subtle three-button placket and ribbed cuffs.",
    colors: [
      { name: "Dusty Blue", hex: "#7895A2" },
      { name: "Sage", hex: "#8A9A86" },
      { name: "Ecru", hex: "#F3EFE0" }
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewsCount: 28,
    tags: ["Cotton-Silk", "Textured"]
  }
];

export const COLLECTIONS = [
  {
    id: "best-sellers",
    title: "BEST SELLERS",
    image: "/Regular outfit.jpg",
  },
  {
    id: "new-launches",
    title: "NEW LAUNCHES",
    image: "/Polo outfit.jpg",
  },
  {
    id: "shirts",
    title: "SHIRTS COLLECTION",
    image: "/regular -1.jpg",
  },
  {
    id: "oversized",
    title: "OVERSIZED COLLECTION",
    image: "/Oversized outfit.jpg",
  },
  {
    id: "wardrobe-staples",
    title: "WARDROBE STAPLES",
    image: "/polo -1.jpg",
  },
  {
    id: "bottom-wear",
    title: "BOTTOM WEAR",
    image: "/oversized - 2.jpg",
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Elena Rostova",
    role: "Creative Director",
    text: "The drape of the Satin Slip Dress is absolutely sublime. It hugs the body beautifully without clinging. Truly editorial quality.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Architect & Stylist",
    text: "AURA's tailoring is exceptional. The Pleated Trousers have a heavy, structural fall that makes any outfit look immediately polished.",
    rating: 5
  },
  {
    id: 3,
    name: "Sonia G.",
    role: "Fashion Editor",
    text: "This Charcoal Sweater feels like a warm hug. It is thick, warm, and the knit is incredibly refined. A capsule wardrobe essential.",
    rating: 5
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    role: "Designer",
    text: "I bought the Trench Coat last month. The organic cotton linen blend is perfect for trans-seasonal wear. Simple details, great cut.",
    rating: 5
  }
];
