export const PRODUCTS = [
  {
    id: "prod-1",
    name: "AURA Trench Coat",
    price: 220,
    oldPrice: 310,
    category: "Outerwear",
    collection: "tailoring",
    badge: "SALE",
    images: ["/trench_front.png", "/trench_back.png"],
    description: "A fluid, double-breasted trench coat crafted from premium structured linen and organic cotton blend. Designed with clean minimal lapels, a waist-defining belt, and oversized storm flaps. An editorial staple for transition season layering.",
    colors: [
      { name: "Oatmeal", hex: "#DCD7C9" },
      { name: "Navy Blue", hex: "#2C3E50" },
      { name: "Obsidian Black", hex: "#111111" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewsCount: 24,
    tags: ["Best Seller", "Organic Cotton"]
  },
  {
    id: "prod-2",
    name: "Charcoal Knit Sweater",
    price: 145,
    oldPrice: null,
    category: "Knitwear",
    collection: "lounge",
    badge: "NEW DROP",
    images: ["/knit_front.png", "/knit_back.png"],
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
    name: "Black Satin Slip Dress",
    price: 180,
    oldPrice: 240,
    category: "Dresses",
    collection: "summer",
    badge: "SALE",
    images: ["/dress_front.png", "/dress_back.png"],
    description: "An elegant, flowy midi-length slip dress woven in heavy lustrous black silk-satin. Bias-cut for a drape that contours the body, featuring delicate cross-back spaghetti straps and a subtle cowl neckline.",
    colors: [
      { name: "Black Satin", hex: "#111111" },
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
    name: "Tailored Pleated Trousers",
    price: 160,
    oldPrice: null,
    category: "Pants",
    collection: "tailoring",
    badge: null,
    images: ["/trouser_front.png", "/trouser_back.png"],
    description: "High-waisted wide-leg tailored trousers cut from soft structured wool-twill. Finished with pressed creases, deep double pleats, and side slip pockets for a relaxed yet commanding look.",
    colors: [
      { name: "Olive Green", hex: "#556B2F" },
      { name: "Midnight Black", hex: "#111111" },
      { name: "Sand", hex: "#F5F5DC" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviewsCount: 15,
    tags: ["Wool-Twill", "Wide-Leg"]
  }
];

export const COLLECTIONS = [
  {
    id: "tailoring",
    title: "Minimalist Tailoring",
    description: "Sculptural suits and structures engineered for modern ease.",
    image: "/collection_tailoring.png",
    tag: "Sale"
  },
  {
    id: "lounge",
    title: "Knitwear & Lounge",
    description: "Premium heavy yarns, fluid shapes, and neutral tones.",
    image: "/collection_lounge.png",
    tag: "Cozy Essentials"
  },
  {
    id: "summer",
    title: "Summer Editorial",
    description: "Lightweight linens, breathable silks, and flowy slips.",
    image: "/collection_summer.png",
    tag: "New Drop"
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
