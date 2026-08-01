export const CATEGORIES = [
  { id: "all", name: "All Products", icon: "🌐" },
  { id: "local_food", name: "Local Market & Farm", icon: "🌾" },
  { id: "groceries", name: "Supermarket & Food", icon: "🛒" },
  { id: "real_estate", name: "Real Estate & Land", icon: "🏠" },
  { id: "heavy_machinery", name: "Heavy Machinery", icon: "🚜" },
  { id: "electronics", name: "Electronics & Tech", icon: "📱" },
  { id: "international", name: "Global / Imports", icon: "✈️" },
  { id: "fashion", name: "Fashion & Apparel", icon: "👕" },
];

export const PRODUCTS = [
  // =========================================================================
  // ==================== LOCAL MARKET & FARM ================================
  // =========================================================================
  
  // ITEM 1: 50kg Yellow Garri (3 Different Vendors)
  {
    id: "p1-a",
    title: "50kg Bag of Yellow Garri (Ijebu Special)",
    category: "local_food",
    originalPrice: 42000,
    salePrice: 36500,
    rating: 4.8,
    reviewsCount: 142,
    vendorName: "Bodija Open Market - Stall 14",
    vendorRating: 4.9,
    distanceKm: 1.2,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 98,
      status: "Safe & Verified",
      positiveFlags: ["Physical stall verified at Bodija Market", "140+ positive buyer confirmations", "Zero unresolved escrow disputes"],
      negativeFlags: ["Occasional delivery delays during heavy rain"]
    }
  },
  {
    id: "p1-b",
    title: "50kg Bag of Yellow Garri (Ijebu Special)",
    category: "local_food",
    originalPrice: 40000,
    salePrice: 34000, // <--- Cheaper Price Option
    rating: 4.4,
    reviewsCount: 56,
    vendorName: "Mile 12 Agro Depot",
    vendorRating: 4.5,
    distanceKm: 4.8, // <--- Farther Distance
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 92,
      status: "Verified Seller",
      positiveFlags: ["Bulk wholesale pricing direct from processing mill"],
      negativeFlags: ["Slightly dusty packaging reported by 1 buyer"]
    }
  },
  {
    id: "p1-c",
    title: "50kg Bag of Yellow Garri (Ijebu Special)",
    category: "local_food",
    originalPrice: 45000,
    salePrice: 38000,
    rating: 5.0, // <--- Highest Rating Option
    reviewsCount: 204,
    vendorName: "Eko Organics & Grains Hub",
    vendorRating: 5.0,
    distanceKm: 0.5, // <--- Closest Distance
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 100,
      status: "Premium Verified Store",
      positiveFlags: ["Triple-sifted stone-free guarantee", "Same-hour local express dispatch"],
      negativeFlags: []
    }
  },

  // ITEM 2: Large Tuber Yam Basket (2 Vendors)
  {
    id: "p2-a",
    title: "Large Tuber Yam Basket (5 Giant Tubers)",
    category: "local_food",
    originalPrice: 18000,
    salePrice: 14200,
    rating: 4.7,
    reviewsCount: 89,
    vendorName: "Oja Oba Farmers Direct",
    vendorRating: 4.8,
    distanceKm: 3.5,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 94,
      status: "Safe & Verified",
      positiveFlags: ["Direct farm source", "100% money-back guarantee record"],
      negativeFlags: ["Limited stock remaining"]
    }
  },
  {
    id: "p2-b",
    title: "Large Tuber Yam Basket (5 Giant Tubers)",
    category: "local_food",
    originalPrice: 17500,
    salePrice: 12900, // <--- Cheaper
    rating: 4.3,
    reviewsCount: 32,
    vendorName: "Benue Valley Produce Stall",
    vendorRating: 4.4,
    distanceKm: 2.1,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 89,
      status: "Verified Farmer",
      positiveFlags: ["Freshly harvested weekly from Makurdi depot"],
      negativeFlags: ["Yam tuber sizes can vary slightly"]
    }
  },

  {
    id: "p3",
    title: "Fresh Tomatoes & Bell Pepper Mix (1 Big Basket)",
    category: "local_food",
    originalPrice: 25000,
    salePrice: 19800,
    rating: 4.6,
    reviewsCount: 210,
    vendorName: "Mile 12 Produce Hub",
    vendorRating: 4.7,
    distanceKm: 0.8,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 91,
      status: "Verified Seller",
      positiveFlags: ["Fastest local dispatch in district", "High repeat buyer rate"],
      negativeFlags: ["2 buyers reported bruised tomatoes on arrival"]
    }
  },
  {
    id: "p4",
    title: "Fresh Organic Palm Oil (25 Litres Yellow Jerrycan)",
    category: "local_food",
    originalPrice: 38000,
    salePrice: 32000,
    rating: 4.9,
    reviewsCount: 76,
    vendorName: "Nsukka Agro Mills",
    vendorRating: 4.9,
    distanceKm: 4.1,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 96,
      status: "Safe & Verified",
      positiveFlags: ["Lab-tested unadulterated oil guarantee", "Direct mill sourcing"],
      negativeFlags: []
    }
  },
  {
    id: "p5",
    title: "Live Farm-Reared Goat (Medium Size)",
    category: "local_food",
    originalPrice: 85000,
    salePrice: 72000,
    rating: 4.5,
    reviewsCount: 34,
    vendorName: "Kano Livestock Depot",
    vendorRating: 4.6,
    distanceKm: 6.8,
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 89,
      status: "Verified Livestock Merchant",
      positiveFlags: ["Veterinary health clearance certificate", "Live video inspection before dispatch"],
      negativeFlags: ["Requires specialized livestock transport fee"]
    }
  },

  // =========================================================================
  // ==================== SUPERMARKET & GROCERIES ============================
  // =========================================================================
  
  // ITEM 6: Carton of Dangote Sugar (2 Vendors)
  {
    id: "p6-a",
    title: "Carton of Dangote Premium Sugar (10kg x 4)",
    category: "groceries",
    originalPrice: 48000,
    salePrice: 44000,
    rating: 4.9,
    reviewsCount: 310,
    vendorName: "Mega Wholesale Mart",
    vendorRating: 4.9,
    distanceKm: 2.1,
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 99,
      status: "Verified Wholesaler",
      positiveFlags: ["Direct Dangote distributor clearance", "Bulk store physically audited"],
      negativeFlags: []
    }
  },
  {
    id: "p6-b",
    title: "Carton of Dangote Premium Sugar (10kg x 4)",
    category: "groceries",
    originalPrice: 46000,
    salePrice: 41500, // <--- Cheaper
    rating: 4.6,
    reviewsCount: 118,
    vendorName: "Idumota Central Distributors",
    vendorRating: 4.7,
    distanceKm: 5.5,
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 94,
      status: "Safe Wholesaler",
      positiveFlags: ["Original sealed factory tape intact"],
      negativeFlags: ["Minimum order processing time 2 hours"]
    }
  },

  {
    id: "p7",
    title: "Peak Milk Full Cream Powder (900g Refill Tin x 6)",
    category: "groceries",
    originalPrice: 32000,
    salePrice: 28500,
    rating: 4.8,
    reviewsCount: 195,
    vendorName: "Eko Retail Supermarket",
    vendorRating: 4.8,
    distanceKm: 1.5,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 97,
      status: "Safe & Verified",
      positiveFlags: ["Verified fresh batch expiry dates", "Fast same-day delivery"],
      negativeFlags: []
    }
  },
  {
    id: "p8",
    title: "Carton of Golden Penny Spaghetti (20 Packs)",
    category: "groceries",
    originalPrice: 22000,
    salePrice: 18900,
    rating: 4.7,
    reviewsCount: 420,
    vendorName: "Alaba Food Distributors",
    vendorRating: 4.7,
    distanceKm: 3.2,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 95,
      status: "Safe & Verified",
      positiveFlags: ["Over 1,000 successful orders completed", "Sealed manufacturer cartons"],
      negativeFlags: ["Carton box can be slightly dented in transit"]
    }
  },
  {
    id: "p9",
    title: "Devon King's Vegetable Oil (5 Litre Bottle)",
    category: "groceries",
    originalPrice: 15500,
    salePrice: 12800,
    rating: 4.8,
    reviewsCount: 168,
    vendorName: "ShopRight Express",
    vendorRating: 4.9,
    distanceKm: 0.9,
    image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 98,
      status: "Safe & Verified",
      positiveFlags: ["Official retail partner", "Zero counterfeit reports"],
      negativeFlags: []
    }
  },

  // =========================================================================
  // ==================== REAL ESTATE & LAND =================================
  // =========================================================================
  
  {
    id: "p10",
    title: "1 Full Plot of Dry Land in Ibeju-Lekki (C of O In Progress)",
    category: "real_estate",
    originalPrice: 9500000,
    salePrice: 7800000,
    rating: 4.9,
    reviewsCount: 28,
    vendorName: "Prime Horizon Properties",
    vendorRating: 5.0,
    distanceKm: 28.0,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 96,
      status: "Verified Title Deed",
      positiveFlags: ["Gazette & Excision documents verified", "Physical inspection video available", "Lawyer escrow integration"],
      negativeFlags: ["Development in area is ongoing (2-year horizon)"]
    }
  },
  {
    id: "p11",
    title: "Luxury 3-Bedroom Fully Detached Duplex in Lekki Phase 1",
    category: "real_estate",
    originalPrice: 185000000,
    salePrice: 165000000,
    rating: 5.0,
    reviewsCount: 9,
    vendorName: "Highbridge Luxury Homes",
    vendorRating: 5.0,
    distanceKm: 15.0,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 99,
      status: "Enterprise Verified",
      positiveFlags: ["Governor's Consent Verified", "Built by Tier-1 Civil Engineers", "Full legal documentation"],
      negativeFlags: []
    }
  },
  {
    id: "p12",
    title: "Half Plot Acre Land Near Fast-Developing Estate (Epe)",
    category: "real_estate",
    originalPrice: 4500000,
    salePrice: 3800000,
    rating: 4.6,
    reviewsCount: 15,
    vendorName: "Greenland Real Estate Ltd",
    vendorRating: 4.7,
    distanceKm: 35.0,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 91,
      status: "Verified Land Registry",
      positiveFlags: ["Free from government acquisition", "Instant allocation upon full payment"],
      negativeFlags: ["Access road currently unpaved"]
    }
  },
  {
    id: "p13",
    title: "Serviced 2-Bedroom Shortlet Apartment (Ikoyi)",
    category: "real_estate",
    originalPrice: 120000,
    salePrice: 95000,
    rating: 4.9,
    reviewsCount: 88,
    vendorName: "Urban Stays Nigeria",
    vendorRating: 4.9,
    distanceKm: 8.5,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 98,
      status: "Superhost Verified",
      positiveFlags: ["24/7 solar + inverter power guaranteed", "Verified security guard & biometric door access"],
      negativeFlags: []
    }
  },

  // =========================================================================
  // ==================== HEAVY MACHINERY ====================================
  // =========================================================================
  
  {
    id: "p14",
    title: "Caterpillar 320D Hydraulic Excavator (Refurbished)",
    category: "heavy_machinery",
    originalPrice: 65000000,
    salePrice: 58000000,
    rating: 4.9,
    reviewsCount: 12,
    vendorName: "West Africa Heavy Equipment Ltd",
    vendorRating: 5.0,
    distanceKm: 12.0,
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 99,
      status: "Enterprise Verified",
      positiveFlags: ["CAC Registered Business", "Physical yard inspection passed", "Full customs clearing documentation"],
      negativeFlags: []
    }
  },
  {
    id: "p15",
    title: "Perkins 100KVA Industrial Diesel Generator (Soundproof)",
    category: "heavy_machinery",
    originalPrice: 18500000,
    salePrice: 16200000,
    rating: 4.8,
    reviewsCount: 24,
    vendorName: "Mikano Authorized Power Dealer",
    vendorRating: 4.9,
    distanceKm: 6.0,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 97,
      status: "Safe & Verified",
      positiveFlags: ["100% Genuine UK Perkins engine block", "Includes 1-year manufacturer warranty"],
      negativeFlags: []
    }
  },
  {
    id: "p16",
    title: "Shacman F3000 Tipper Truck (10 Wheeler 20 Tons)",
    category: "heavy_machinery",
    originalPrice: 48000000,
    salePrice: 42500000,
    rating: 4.7,
    reviewsCount: 18,
    vendorName: "Dangote Auto Yard Direct",
    vendorRating: 4.8,
    distanceKm: 18.2,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 95,
      status: "Verified Fleet Seller",
      positiveFlags: ["Low mileage engine test passed", "All duties paid"],
      negativeFlags: ["Tyres at 80% thread life"]
    }
  },
  {
    id: "p17",
    title: "Automatic Block Making Machine (Hydraulic Vibration)",
    category: "heavy_machinery",
    originalPrice: 14000000,
    salePrice: 11800000,
    rating: 4.6,
    reviewsCount: 31,
    vendorName: "Lagos Engineering Works",
    vendorRating: 4.6,
    distanceKm: 9.4,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 92,
      status: "Verified Manufacturer",
      positiveFlags: ["Locally fabricated with hardened steel", "Free setup & operator training"],
      negativeFlags: ["Requires 3-phase industrial power"]
    }
  },

  // =========================================================================
  // ==================== ELECTRONICS & TECH =================================
  // =========================================================================
  
  // ITEM 18: Apple iPhone 15 Pro Max (3 Different Vendors)
  {
    id: "p18-a",
    title: "Apple iPhone 15 Pro Max (256GB, Natural Titanium)",
    category: "electronics",
    originalPrice: 1850000,
    salePrice: 1620000,
    rating: 4.9,
    reviewsCount: 215,
    vendorName: "Computer Village MegaHub",
    vendorRating: 4.9,
    distanceKm: 2.3,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 98,
      status: "Safe & Verified",
      positiveFlags: ["Serial number verified on Apple Coverage database", "1-Year Apple Care Warranty"],
      negativeFlags: []
    }
  },
  {
    id: "p18-b",
    title: "Apple iPhone 15 Pro Max (256GB, Natural Titanium)",
    category: "electronics",
    originalPrice: 1800000,
    salePrice: 1540000, // <--- Cheaper Price
    rating: 4.5,
    reviewsCount: 88,
    vendorName: "Otigba Street Direct Gadgets",
    vendorRating: 4.6,
    distanceKm: 1.1, // <--- Closer
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 93,
      status: "Verified Tech Vendor",
      positiveFlags: ["Physical store verified at Otigba Street", "Includes free silicon case"],
      negativeFlags: ["Non-active AppleCare warranty extension"]
    }
  },
  {
    id: "p18-c",
    title: "Apple iPhone 15 Pro Max (256GB, Natural Titanium)",
    category: "electronics",
    originalPrice: 1900000,
    salePrice: 1680000,
    rating: 5.0, // <--- Best Quality / Rating
    reviewsCount: 340,
    vendorName: "iStore Victoria Island",
    vendorRating: 5.0,
    distanceKm: 11.2,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 100,
      status: "Official Premium Reseller",
      positiveFlags: ["Official Apple Brand Guarantee", "Instant same-day swap warranty"],
      negativeFlags: []
    }
  },

  {
    id: "p19",
    title: "Samsung 65-inch QLED 4K Smart TV (2025 Edition)",
    category: "electronics",
    originalPrice: 1250000,
    salePrice: 1050000,
    rating: 4.8,
    reviewsCount: 110,
    vendorName: "Fouani Electronics Official",
    vendorRating: 4.9,
    distanceKm: 3.0,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 99,
      status: "Brand Official Store",
      positiveFlags: ["Authorized Samsung distributor", "Includes free wall mount installation"],
      negativeFlags: []
    }
  },
  {
    id: "p20",
    title: "Apple MacBook Pro M3 Chip (16GB RAM, 512GB SSD)",
    category: "electronics",
    originalPrice: 2400000,
    salePrice: 2150000,
    rating: 5.0,
    reviewsCount: 84,
    vendorName: "iStore Ikeja City Mall",
    vendorRating: 5.0,
    distanceKm: 4.5,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 100,
      status: "Verified Official Reseller",
      positiveFlags: ["Factory sealed box", "Instant replacement guarantee within 7 days"],
      negativeFlags: []
    }
  },

  // ITEM 21: Sony PlayStation 5 (2 Vendors)
  {
    id: "p21-a",
    title: "Sony PlayStation 5 Console (Disc Edition + 2 Controllers)",
    category: "electronics",
    originalPrice: 820000,
    salePrice: 710000,
    rating: 4.9,
    reviewsCount: 340,
    vendorName: "Gamers World Plaza",
    vendorRating: 4.8,
    distanceKm: 1.8,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 96,
      status: "Safe & Verified",
      positiveFlags: ["Includes 2 original DualSense controllers", "3 games preloaded"],
      negativeFlags: ["Outer box seal broken for store inspection"]
    }
  },
  {
    id: "p21-b",
    title: "Sony PlayStation 5 Console (Disc Edition + 2 Controllers)",
    category: "electronics",
    originalPrice: 800000,
    salePrice: 675000, // <--- Cheaper
    rating: 4.6,
    reviewsCount: 92,
    vendorName: "Alaba International Electronics Arena",
    vendorRating: 4.6,
    distanceKm: 8.4,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 92,
      status: "Verified Electronics Merchant",
      positiveFlags: ["100% Brand new factory sealed box", "Includes 1-month PS Plus Voucher"],
      negativeFlags: []
    }
  },

  // =========================================================================
  // ==================== GLOBAL / IMPORTS ===================================
  // =========================================================================
  
  // ITEM 22: Solar Inverter Kit (3 Vendors)
  {
    id: "p22-a",
    title: "Solar Power Inverter Kit 5KW + Lithium Batteries",
    category: "international",
    originalPrice: 2800000,
    salePrice: 2350000,
    rating: 4.9,
    reviewsCount: 67,
    vendorName: "Guangzhou Direct Global",
    vendorRating: 4.8,
    distanceKm: 45.0,
    image: "[https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=400&q=80](https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=400&q=80)",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 88,
      status: "Import Risk Moderate",
      positiveFlags: ["Authentic manufacturer serial numbers", "Escrow protection active"],
      negativeFlags: ["Customs clearance can take 5-7 business days"]
    }
  },
  {
    id: "p22-b",
    title: "Solar Power Inverter Kit 5KW + Lithium Batteries",
    category: "international",
    originalPrice: 2600000,
    salePrice: 2100000, // <--- Cheaper Import
    rating: 4.5,
    reviewsCount: 38,
    vendorName: "Shenzhen Solar Solutions Factory",
    vendorRating: 4.6,
    distanceKm: 52.0,
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 85,
      status: "Verified Factory Direct",
      positiveFlags: ["Grade A Lithium Iron Phosphate cells used", "Factory wholesale rate"],
      negativeFlags: ["Sea freight shipping requires 14-21 days"]
    }
  },
  {
    id: "p22-c",
    title: "Solar Power Inverter Kit 5KW + Lithium Batteries",
    category: "international",
    originalPrice: 3000000,
    salePrice: 2500000,
    rating: 5.0, // <--- Local Bonded Warehouse (Nearest)
    reviewsCount: 112,
    vendorName: "Felicity Solar Nigeria (Lagos Bonded Hub)",
    vendorRating: 5.0,
    distanceKm: 3.8, // <--- Nearest Local Stock
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 99,
      status: "In-Stock Local Bonded Warehouse",
      positiveFlags: ["Already cleared by customs & in Lagos store", "Includes free local installation inspection"],
      negativeFlags: []
    }
  },

  {
    id: "p23",
    title: "Smart Commercial Coffee Espresso Machine (Italian Dual Pump)",
    category: "international",
    originalPrice: 1450000,
    salePrice: 1200000,
    rating: 4.7,
    reviewsCount: 22,
    vendorName: "Milan Import Express",
    vendorRating: 4.7,
    distanceKm: 50.0,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 90,
      status: "Import Verified",
      positiveFlags: ["Tested under European CE safety standards", "Spare parts stocked locally"],
      negativeFlags: ["Shipping time 10-14 days if not in bonded warehouse"]
    }
  },
  {
    id: "p24",
    title: "4K Cinema Projector 10,000 Lumens (Ultra Short Throw)",
    category: "international",
    originalPrice: 980000,
    salePrice: 820000,
    rating: 4.6,
    reviewsCount: 41,
    vendorName: "Shenzhen HighTech Logistics",
    vendorRating: 4.6,
    distanceKm: 60.0,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 87,
      status: "Verified Overseas Seller",
      positiveFlags: ["Factory direct pricing", "Full air-freight insurance cover"],
      negativeFlags: ["Requires US-to-UK plug adapter (included)"]
    }
  },
  {
    id: "p25",
    title: "Industrial Commercial Ice Maker Machine (120kg/24hrs)",
    category: "international",
    originalPrice: 1650000,
    salePrice: 1390000,
    rating: 4.8,
    reviewsCount: 19,
    vendorName: "Yiwu Trade Superstore",
    vendorRating: 4.8,
    distanceKm: 55.0,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 92,
      status: "Verified Import Partner",
      positiveFlags: ["High durability stainless steel body", "Escrow payout after 7 days testing"],
      negativeFlags: ["Heavy crate requires forklift offloading"]
    }
  },

  // =========================================================================
  // ==================== FASHION & APPAREL ==================================
  // =========================================================================
  
  // ITEM 26: Designer Senator Agbada Suit (2 Vendors)
  {
    id: "p26-a",
    title: "Handmade Designer Senator Agbada Suit (3-Piece White/Gold)",
    category: "fashion",
    originalPrice: 85000,
    salePrice: 68000,
    rating: 4.9,
    reviewsCount: 154,
    vendorName: "Aba Master Tailors Collective",
    vendorRating: 4.9,
    distanceKm: 3.1,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 97,
      status: "Safe & Verified",
      positiveFlags: ["100% Cashmere Wool Blend fabric", "Free custom size fitting modifications"],
      negativeFlags: []
    }
  },
  {
    id: "p26-b",
    title: "Handmade Designer Senator Agbada Suit (3-Piece White/Gold)",
    category: "fashion",
    originalPrice: 80000,
    salePrice: 59000, // <--- Cheaper Alternative
    rating: 4.5,
    reviewsCount: 61,
    vendorName: "Surulere Fashion Line",
    vendorRating: 4.6,
    distanceKm: 1.4, // <--- Closer Alternative
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 92,
      status: "Verified Local Tailor",
      positiveFlags: ["Local artisan handmade stitching", "24-hour pickup available"],
      negativeFlags: ["Does not include cufflink accessory set"]
    }
  },

  {
    id: "p27",
    title: "Authentic Italian Leather Shoes & Matching Belt Set",
    category: "fashion",
    originalPrice: 120000,
    salePrice: 92000,
    rating: 4.8,
    reviewsCount: 98,
    vendorName: "Balogun Luxury Leathercraft",
    vendorRating: 4.8,
    distanceKm: 1.1,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 95,
      status: "Safe & Verified",
      positiveFlags: ["Real cowhide leather guaranteed", "Handcrafted in Italy"],
      negativeFlags: ["Sizes run slightly narrow"]
    }
  },
  {
    id: "p28",
    title: "Premium Swiss Voile Lace (5 Yards Luxury Gold Embroidery)",
    category: "fashion",
    originalPrice: 160000,
    salePrice: 135000,
    rating: 4.9,
    reviewsCount: 72,
    vendorName: "Eko Fabric Empress",
    vendorRating: 4.9,
    distanceKm: 0.5,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: true,
    aiScamReport: {
      trustScore: 98,
      status: "Verified Fabric Merchant",
      positiveFlags: ["Original Swiss imported lace badge", "Zero color bleed guarantee"],
      negativeFlags: []
    }
  },
  {
    id: "p29",
    title: "Unisex Nike Air Jordan 1 Retro High (OG Colorway)",
    category: "fashion",
    originalPrice: 145000,
    salePrice: 115000,
    rating: 4.7,
    reviewsCount: 204,
    vendorName: "SneakerHead Central",
    vendorRating: 4.7,
    distanceKm: 2.8,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 93,
      status: "Verified Authentic",
      positiveFlags: ["Passed AI sneaker legitimacy authentication test", "Original box included"],
      negativeFlags: ["High demand item (limited sizing)"]
    }
  },
  {
    id: "p30",
    title: "Handwoven Original Aso-Oke Complete Bridal Outfit Set",
    category: "fashion",
    originalPrice: 250000,
    salePrice: 210000,
    rating: 5.0,
    reviewsCount: 45,
    vendorName: "Iseyin Weavers Guild",
    vendorRating: 5.0,
    distanceKm: 5.2,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80",
    isFlashDrop: false,
    aiScamReport: {
      trustScore: 99,
      status: "Heritage Artisan Certified",
      positiveFlags: ["100% Traditional handwoven cotton and metallic threads", "Direct master weaver source"],
      negativeFlags: []
    }
  }
];

export const DISPATCH_RIDERS = [
  { id: "r1", name: "Ibrahim K.", vehicle: "Box Bike", distance: "0.4 km away", eta: "4 mins", rating: 4.9 },
  { id: "r2", name: "Suleiman O.", vehicle: "Cargo Van", distance: "1.2 km away", eta: "9 mins", rating: 4.8 },
  { id: "r3", name: "David A.", vehicle: "Heavy Haulage Truck", distance: "2.5 km away", eta: "15 mins", rating: 5.0 },
  { id: "r4", name: "Chidi N.", vehicle: "Refrigerated Van", distance: "1.8 km away", eta: "11 mins", rating: 4.7 },
  { id: "r5", name: "Mustapha B.", vehicle: "Tricycle Keke Cargo", distance: "0.7 km away", eta: "6 mins", rating: 4.9 }
];