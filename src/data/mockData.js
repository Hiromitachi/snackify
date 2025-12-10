// Mock data for snacks
export const mockSnacks = [
    {
        id: 1,
        name: "Rainbow Chips",
        brand: "CrunchCo",
        category: "Namkeen",
        image: "/snack_chips_1765382741382.png",
        rating: 4.5,
        reviewCount: 128,
        description: "Colorful and crispy potato chips with a perfect crunch"
    },
    {
        id: 2,
        name: "Dark Chocolate Delight",
        brand: "ChocoHeaven",
        category: "Sweet",
        image: "/snack_chocolate_1765382759645.png",
        rating: 4.8,
        reviewCount: 256,
        description: "Rich, glossy dark chocolate that melts in your mouth"
    },
    {
        id: 3,
        name: "Pastel Macarons",
        brand: "Sweet Dreams",
        category: "Sweet",
        image: "/snack_cookies_1765382775901.png",
        rating: 4.9,
        reviewCount: 342,
        description: "Delicate French macarons in beautiful pastel colors"
    },
    {
        id: 4,
        name: "Gourmet Popcorn",
        brand: "PopMagic",
        category: "Namkeen",
        image: "/snack_popcorn_1765382803367.png",
        rating: 4.3,
        reviewCount: 89,
        description: "Colorful gourmet popcorn with unique flavors"
    },
    {
        id: 5,
        name: "Gummy Paradise",
        brand: "CandyLand",
        category: "Sweet",
        image: "/snack_candy_1765382826878.png",
        rating: 4.6,
        reviewCount: 198,
        description: "Assorted gummy candies in vibrant colors"
    },
    {
        id: 6,
        name: "Salted Pretzels",
        brand: "BakeMaster",
        category: "Namkeen",
        image: "/snack_pretzels_1765382847291.png",
        rating: 4.4,
        reviewCount: 156,
        description: "Golden brown pretzels with perfect salt crystals"
    }
];

export const mockReviews = [
    {
        id: 1,
        snackId: 1,
        userId: 1,
        userName: "Sarah Chen",
        userAvatar: null,
        rating: 5,
        text: "Absolutely love these chips! The crunch is perfect and the flavors are amazing. My go-to snack for movie nights! 🍿",
        likes: 24,
        createdAt: "2024-12-08"
    },
    {
        id: 2,
        snackId: 1,
        userId: 2,
        userName: "Mike Johnson",
        userAvatar: null,
        rating: 4,
        text: "Really good chips, but I wish they came in a bigger pack. Still, highly recommend!",
        likes: 12,
        createdAt: "2024-12-07"
    },
    {
        id: 3,
        snackId: 2,
        userId: 3,
        userName: "Emma Davis",
        userAvatar: null,
        rating: 5,
        text: "Best chocolate I've ever had! Rich, smooth, and not too sweet. Perfect! 🍫",
        likes: 45,
        createdAt: "2024-12-09"
    }
];

export const categories = [
    { name: "All" },
    { name: "Sweet" },
    { name: "Spicy" },
    { name: "Namkeen" },
    { name: "Healthy" },
    { name: "Drinks" },
    { name: "Street Food" }
];

export const userBadges = [
    { name: "Chocolate Critic", icon: "🍫", description: "Reviewed 10+ chocolate snacks" },
    { name: "Chip Hunter", icon: "🥔", description: "Tried 15+ different chips" },
    { name: "Spice Warrior", icon: "🌶️", description: "Conquered 5+ spicy snacks" },
    { name: "Sweet Tooth", icon: "🍬", description: "Reviewed 20+ sweet treats" },
    { name: "Snack Explorer", icon: "🗺️", description: "Tried snacks from 10+ brands" }
];
