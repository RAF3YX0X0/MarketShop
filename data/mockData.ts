import { Product, Testimonial, TrustGuarantee, Benefit, SellerStat } from "@/types";

export const TRUST_GUARANTEES: TrustGuarantee[] = [
  {
    id: "g1",
    title: "Free UK Delivery",
    subtitle: "Tracked shipping on all book orders over £15",
    iconName: "truck",
  },
  {
    id: "g2",
    title: "100-Day Money Back",
    subtitle: "No-quibble refund policy on every title",
    iconName: "undo-2",
  },
  {
    id: "g3",
    title: "Direct from UK Sellers",
    subtitle: "Supporting 4,500+ independent bookshops",
    iconName: "shield-check",
  },
  {
    id: "g4",
    title: "Eco-Protective Mailers",
    subtitle: "100% recyclable cardboard book sleeves",
    iconName: "award",
  },
];

export const FEATURED_BIG_THREE: Product[] = [
  {
    id: "feat-1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 9.99,
    originalPrice: 16.99,
    discountPercentage: 41,
    rating: 4.9,
    reviewCount: 3840,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    badge: "Save 41%",
    badgeType: "deal",
    category: "Fiction",
    description: "Between life and death there is a library where every book gives you a chance to try another life you could have lived.",
    format: "Hardcover",
    pages: 304,
    publishYear: 2024,
    inStock: true,
    stockCount: 14,
    sellerName: "Bloomsbury Rare Books",
    couponCode: "READ41",
    highlights: [
      "Sunday Times & New York Times #1 Bestseller",
      "Hardcover edition with ribbon marker and bookmark",
      "Dispatched within 24 hours via Royal Mail 48"
    ]
  },
  {
    id: "feat-2",
    title: "Atomic Habits: The Proven System",
    author: "James Clear",
    price: 12.50,
    originalPrice: 20.00,
    discountPercentage: 38,
    rating: 5.0,
    reviewCount: 9420,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    badge: "Save 38%",
    badgeType: "deal",
    category: "Self-Help",
    description: "An easy and proven way to build good habits and break bad ones. Practical strategies for daily 1% compounding gains.",
    format: "Hardcover",
    pages: 320,
    publishYear: 2025,
    inStock: true,
    stockCount: 8,
    sellerName: "Vebryx Literary Central",
    couponCode: "HABIT38",
    highlights: [
      "Over 15 Million copies sold worldwide",
      "Tactile embossed hardcover edition",
      "Includes bonus digital habit tracker worksheet"
    ]
  },
  {
    id: "feat-3",
    title: "The Atlas of Ancient Horizons",
    author: "Dr. Evelyn Vance & C. Thorne",
    price: 24.99,
    originalPrice: 45.00,
    discountPercentage: 44,
    rating: 4.95,
    reviewCount: 1210,
    coverImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80",
    badge: "Save 44%",
    badgeType: "exclusive",
    category: "History & Art",
    description: "A collector's volume featuring hand-drawn antique world maps, architectural elevations, and regional folklore.",
    format: "Illustrated Deluxe",
    pages: 448,
    publishYear: 2026,
    inStock: true,
    stockCount: 5,
    sellerName: "Heritage Antiquarian Guild",
    couponCode: "ATLAS44",
    highlights: [
      "Gold-gilded page edges with slipcase",
      "180+ full-color archival plates and maps",
      "Individually numbered first printing certificate"
    ]
  }
];

export const REFERENCE_CATALOG_BOOKS: Product[] = [
  {
    id: "ref-1",
    title: "The story of the magic star",
    author: "Tevely Entiamile Gyiekeba",
    price: 105.00,
    originalPrice: 130.00,
    discountPercentage: 19,
    rating: 5.0,
    reviewCount: 48,
    coverImage: "/images/books/the-story-of-the-magic-star.png",
    sellerName: "info.vebryx@gmail.com",
    inStock: true,
    stockCount: 4,
    badge: "Sale -19%",
    badgeType: "deal",
    category: "Sci-Fi & Fantasy",
    description: "An expansive astronomical epic detailing the journey of a celestial traveler across dying empires and forgotten moons.",
    format: "Collector Edition",
    pages: 512,
    publishYear: 2025,
    highlights: [
      "Limited edition print on heavyweight archival stock",
      "Full-color celestial gatefold maps included",
      "Dispatched in heavy-duty reinforced packaging"
    ]
  },
  {
    id: "ref-2",
    title: "David Walliams Gangsta Granny",
    author: "David Walliams",
    price: 5.99,
    originalPrice: 7.99,
    discountPercentage: 25,
    rating: 4.8,
    reviewCount: 312,
    coverImage: "/images/books/gangsta-granny.png",
    sellerName: "info.vebryx@gmail.com",
    inStock: true,
    stockCount: 19,
    badge: "Sale -25%",
    badgeType: "deal",
    category: "Children's Fiction",
    description: "Ben thinks his cabbage-soup-eating grandmother is utterly dull—until he finds out she is a master international jewel thief.",
    format: "Paperback",
    pages: 288,
    publishYear: 2024,
    highlights: [
      "Hilarious illustrations by Tony Ross",
      "Official 10th anniversary paperback print",
      "Next-day UK dispatch available"
    ]
  },
  {
    id: "ref-3",
    title: "Adventures of the magic star",
    author: "Rivetmane & Duaa Anoo",
    price: 5.99,
    originalPrice: 7.00,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 89,
    coverImage: "/images/books/adventures-of-the-magic-star.png",
    sellerName: "info.vebryx@gmail.com",
    inStock: true,
    stockCount: 12,
    badge: "Sale -14%",
    badgeType: "deal",
    category: "Romance & Poetry",
    description: "A tender graphic novella tracing love, serendipity, and quiet moments beneath blossom trees.",
    format: "Paperback",
    pages: 192,
    publishYear: 2025,
    highlights: [
      "Full color matte cover with soft-touch lamination",
      "Original Japanese watercolor style illustrations",
      "Includes ribbon bookmark"
    ]
  },
  {
    id: "ref-4",
    title: "Shadow of Decenit",
    author: "Onige Kirds Slashyn",
    price: 155.00,
    originalPrice: 175.00,
    discountPercentage: 11,
    rating: 4.95,
    reviewCount: 14,
    coverImage: "/images/books/shadow-of-deceit.png",
    sellerName: "info.vebryx@gmail.com",
    inStock: true,
    stockCount: 2,
    badge: "Rare Collector",
    badgeType: "exclusive",
    category: "Mystery & Thriller",
    description: "Some secrets are meant to stay hidden. A gripping Victorian noir crime novel with embossed crimson title lettering.",
    format: "Hardcover",
    pages: 620,
    publishYear: 2024,
    highlights: [
      "Extremely rare limited hardbound edition",
      "Numbered publisher seal on title page",
      "Insured track & trace postage included"
    ]
  },
  {
    id: "ref-5",
    title: "Miss P the Pirate",
    author: "Captain Clara & Friends",
    price: 5.00,
    originalPrice: 6.99,
    discountPercentage: 28,
    rating: 4.75,
    reviewCount: 142,
    coverImage: "/images/books/miss-p-the-pirate.png",
    sellerName: "info.vebryx@gmail.com",
    inStock: true,
    stockCount: 22,
    badge: "Sale -28%",
    badgeType: "deal",
    category: "Adventure & Sci-Fi",
    description: "Join Miss P and the towering forest guardian robot on an expedition through uncharted northern woods under the full moon.",
    format: "Paperback",
    pages: 224,
    publishYear: 2025,
    highlights: [
      "Action-packed read for young adults and collectors",
      "Durable spill-resistant matte cover",
      "2-day standard UK delivery"
    ]
  },
  {
    id: "ref-6",
    title: "The white Abbott",
    author: "MOCUBPP Archival Press",
    price: 7.99,
    originalPrice: 10.99,
    discountPercentage: 27,
    rating: 4.85,
    reviewCount: 76,
    coverImage: "/images/books/the-white-abbott.png",
    sellerName: "info.vebryx@gmail.com",
    inStock: true,
    stockCount: 7,
    badge: "Sale -27%",
    badgeType: "deal",
    category: "Philosophy & Art",
    description: "A contemplative volume detailing botanical wisdom, the tree of life, and human connection across the centuries.",
    format: "Paperback",
    pages: 310,
    publishYear: 2026,
    highlights: [
      "Gold foil-stamped tree artwork on matte black cover",
      "Printed on recycled acid-free cream paper",
      "Includes digital discussion guide"
    ]
  }
];

export const WHY_US_POINTS = [
  {
    id: "w1",
    title: "Direct From UK Sellers",
    description: "Skip massive corporate markups. Order directly from independent booksellers and publishers across Britain.",
    icon: "store",
  },
  {
    id: "w2",
    title: "100-Day Risk-Free Trial",
    description: "Not completely satisfied with the book or condition? Send it back within 100 days for a prompt, 100% refund.",
    icon: "undo",
  },
  {
    id: "w3",
    title: "Free Tracked Delivery over £15",
    description: "All qualifying orders dispatch via Royal Mail Tracked 48 with real-time tracking links sent to your phone.",
    icon: "truck",
  },
  {
    id: "w4",
    title: "Verified Book Quality",
    description: "Every copy is physically inspected for intact bindings, clean pages, and authentic dust jackets.",
    icon: "shield",
  },
];

export const SELLER_STATS: SellerStat[] = [
  {
    value: "5%",
    label: "Flat Commission",
    subtext: "UK lowest marketplace fee (Competitors take 15-20%)"
  },
  {
    value: "48h",
    label: "Direct Payouts",
    subtext: "Bank transfer sent 48h after dispatch scan"
  },
  {
    value: "250K+",
    label: "Active UK Readers",
    subtext: "Reach buying customers instantly without ad spend"
  },
  {
    value: "60 Sec",
    label: "Barcode / ISBN Scan",
    subtext: "Auto-fill title, cover, and details from our database"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Barry Fahey",
    location: "Edinburgh, UK",
    rating: 5,
    title: "Arrived in 24 hours. Pristine hardcover.",
    content: "Ordered The Midnight Library on Tuesday afternoon. It was on my doorstep Wednesday morning in sturdy cardboard packaging. Outstanding direct-seller service.",
    date: "19 August 2026",
    verified: true,
    bookPurchased: "The Midnight Library (Hardcover)"
  },
  {
    id: "t2",
    name: "Elaine Nunn",
    location: "Surrey, UK",
    rating: 5,
    title: "Saved over £7 on retail price.",
    content: "I appreciate that Market Shop doesn't charge extortionate buyer fees. Atomic Habits arrived in brand new condition and the tracking was accurate.",
    date: "18 August 2026",
    verified: true,
    bookPurchased: "Atomic Habits: The Proven System"
  },
  {
    id: "t3",
    name: "Sandra Staplehurst",
    location: "Manchester, UK",
    rating: 5,
    title: "100-day guarantee gave me confidence.",
    content: "Buying collector books online can be tricky, but the condition description was 100% accurate. The foil detailing on The Atlas is magnificent.",
    date: "16 August 2026",
    verified: true,
    bookPurchased: "The Atlas of Ancient Horizons"
  },
  {
    id: "t4",
    name: "Dr. Alistair Ross",
    location: "Oxford, UK",
    rating: 5,
    title: "Best place to support indie bookshops.",
    content: "I have purchased 6 titles so far from various small UK shops through Market Shop. Seamless dispatch every time.",
    date: "14 August 2026",
    verified: true,
    bookPurchased: "Shadow of Decenit & The white Abbott"
  }
];
