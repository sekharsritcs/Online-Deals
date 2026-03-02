/**
 * Deal interface representing a product deal
 */
export interface Deal {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  merchant: string;
  imageUrl: string;
  postedAt: string; // ISO string or date string
  category: string;
  url: string;
  isHotDeal?: boolean;
  discount?: number;
  description?: string;
  image?: string; // Alternative image property
}

/**
 * Extended Deal interface with additional fields
 */
export interface DealExtended {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: string; // Formatted discount string (e.g., "$170 Off", "67% Off")
  image: string;
  merchant: string;
  postedAt: string;
  description: string;
  shipping: string;
  note: string;
}

/**
 * Mock deals data (for development/testing)
 */
export const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Wayfair Way Day Sale: Up to 80% Off Sitewide",
    price: 0,
    originalPrice: 0,
    merchant: "Wayfair",
    imageUrl:
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress",
    postedAt: "2025-04-25T20:30:00",
    category: "Home",
    description: "Save big during Wayfair's biggest sale of the year",
    url: "https://wayfair.com",
  },
  {
    id: "2",
    title: "BalanceFrom Heavy Duty Adjustable for $44.99",
    price: 44.99,
    originalPrice: 89.99,
    merchant: "Amazon",
    imageUrl:
      "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress",
    postedAt: "2025-04-25T19:45:00",
    discount: 50,
    category: "Sports",
    url: "https://amazon.com",
  },
  {
    id: "3",
    title: "Royal Dansk Danish Butter Cookie Tin 12oz for $2.70",
    price: 2.7,
    originalPrice: 5.99,
    merchant: "Target",
    imageUrl:
      "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress",
    postedAt: "2025-04-25T19:00:00",
    discount: 55,
    category: "Food",
    isHotDeal: true,
    url: "https://target.com",
  },
  {
    id: "4",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 299.99,
    originalPrice: 399.99,
    merchant: "BestBuy",
    imageUrl:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress",
    postedAt: "2025-04-25T18:30:00",
    discount: 25,
    category: "Electronics",
    isHotDeal: true,
    url: "https://bestbuy.com",
  },
  {
    id: "5",
    title: "Ninja Foodi 9-in-1 Deluxe XL Pressure Cooker",
    price: 149.99,
    originalPrice: 249.99,
    merchant: "Target",
    imageUrl:
      "https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress",
    postedAt: "2025-04-25T18:00:00",
    discount: 40,
    category: "Kitchen",
    url: "https://target.com",
  },
  {
    id: "6",
    title: 'Samsung 65" Class QLED 4K Smart TV',
    price: 799.99,
    originalPrice: 1299.99,
    merchant: "Samsung.com",
    imageUrl:
      "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress",
    postedAt: "2025-04-25T17:30:00",
    discount: 38,
    isHotDeal: true,
    category: "Electronics",
    url: "https://samsung.com",
  },
  {
    id: "7",
    title: "37% offLimited time dealSamsung Galaxy ",
    price: 25000,
    originalPrice: 30000,
    merchant: "amazon.in",
    imageUrl:
      "https://m.media-amazon.com/images/I/71Nwtop9jtL._AC_SF226,226_QL85_.jpg?aicid=discounts-widgets-horizonte",
    postedAt: "2025-06-13 16:25:04",
    discount: 37,
    isHotDeal: true,
    category: "Electronics",
    url: "https://samsung.com",
  },
  {
    id: "8",
    title: "FIVANIO Camera Lens FIVANIOe Cup Coffee Stainless Steel...",
    price: 405,
    originalPrice: 999,
    merchant: "flipkart.com",
    postedAt: "2025-06-13 16:25:04",
    imageUrl:
      "https://rukminim2.flixcart.com/image/612/612/k12go7k0/self-heating-mug/4/2/6/camera-lens-shaped-coffee-with-lid-steel-insulated-travel-bsbda-original-imafkqcz4ujacnk5.jpeg?q=70",
    discount: 35,
    isHotDeal: true,
    category: "Electronics",
    url: "https://samsung.com",
  },
];

/**
 * Extended mock deals data
 */
export const mockDealsExtended: DealExtended[] = [
  {
    id: "1",
    title: "Breville BES878BTR Barista Pro Espresso Machine",
    price: 679.95,
    originalPrice: 849.95,
    discount: "$170 Off",
    image: "https://images.pexels.com/photos/4226805/pexels-photo-4226805.jpeg",
    merchant: "Amazon.com",
    postedAt: "2025-04-27 08:04:26",
    description:
      "The Breville Barista Pro delivers third wave specialty coffee at home using the 4 keys formula",
    shipping: "Free Shipping",
    note: "Amazon.com changes price frequently so deal may expire at any time. Please refer to post time to see when deal was posted.",
  },
  {
    id: "2",
    title: "SheaMoisture African Black Soap Body Wash 18oz",
    price: 3.98,
    originalPrice: 11.98,
    discount: "67% Off",
    image: "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg",
    merchant: "Amazon.com",
    postedAt: "2025-04-27 07:56:57",
    description:
      "SheaMoisture's African Black Soap Calm & Clearing Body Wash, designed for melanin-rich skin",
    shipping: "Free Shipping w/$35+ Order",
    note: "Amazon.com changes price frequently so deal may expire at any time. Please refer to post time to see when deal was posted.",
  },
  {
    id: "3",
    title: "Apple AirPods Pro (2nd Generation)",
    price: 199.99,
    originalPrice: 249.99,
    discount: "$50 Off",
    image: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg",
    merchant: "Amazon.com",
    postedAt: "2025-04-27 09:15:00",
    description:
      "Active Noise Cancellation, Transparency mode, Personalized Spatial Audio with dynamic head tracking",
    shipping: "Free Shipping",
    note: "Limited time offer. Price may change without notice.",
  },
  {
    id: "4",
    title: 'Samsung 65" QLED 4K Smart TV',
    price: 897.99,
    originalPrice: 1299.99,
    discount: "$402 Off",
    image: "https://images.pexels.com/photos/6782581/pexels-photo-6782581.jpeg",
    merchant: "Amazon.com",
    postedAt: "2025-04-27 10:30:00",
    description:
      "Quantum HDR, Object Tracking Sound, Motion Xcelerator Turbo+, Gaming Hub",
    shipping: "Free Shipping",
    note: "Deal ends soon. Limited stock available.",
  },
];
