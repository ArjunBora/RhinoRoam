import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting seed...");

    // Create Hampi destination
    const hampi = await prisma.destination.upsert({
        where: { slug: "hampi" },
        update: {},
        create: {
            name: "Hampi",
            slug: "hampi",
            description:
                "A UNESCO World Heritage Site featuring the ruins of the magnificent Vijayanagara Empire. Spread across 26 square kilometers of boulder-strewn terrain, Hampi transports you to a 14th-century world of royal grandeur, spiritual devotion, and architectural brilliance. The ruins include temples, palaces, market streets, and royal pavilions that once made up one of the largest cities in the medieval world.",
            latitude: 15.335,
            longitude: 76.46,
            region: "Karnataka",
            state: "Karnataka",
            country: "India",
            heroImage:
                "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=1600&q=80",
            images: [
                "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
                "https://images.unsplash.com/photo-1564294636501-be9877b18f68?w=800&q=80",
                "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
            ],
            highlights: [
                "UNESCO World Heritage Site",
                "14th Century Vijayanagara Ruins",
                "Stone Chariot at Vittala Temple",
                "Sunrise from Matanga Hill",
                "Coracle Ride on Tungabhadra",
            ],
            howToReach: {
                airport: {
                    name: "Hubli Airport (HBX)",
                    distance: "143 km",
                    duration: "3 hours",
                    cost: "₹2,500 - ₹3,500 (taxi)",
                },
                railway: {
                    name: "Hospet Junction",
                    distance: "13 km",
                    duration: "20 minutes",
                    cost: "₹150 - ₹300 (auto)",
                },
                bus: {
                    name: "Hospet Bus Stand",
                    distance: "13 km",
                    duration: "30 minutes",
                    cost: "₹20 - ₹50",
                },
                selfDrive: {
                    note: "Well-connected via NH48. Parking available near main sites.",
                    duration: "6 hours from Bangalore",
                },
            },
            bestTime: {
                peak: ["October", "November", "December", "January", "February"],
                offPeak: ["March", "September"],
                avoid: ["April", "May", "June", "July", "August"],
            },
        },
    });

    console.log("✅ Created destination:", hampi.name);

    // Create POIs for Hampi
    const pois = [
        {
            name: "Virupaksha Temple",
            slug: "virupaksha-temple",
            category: "TEMPLE" as const,
            description:
                "The oldest and most sacred temple in Hampi, dedicated to Lord Shiva as Virupaksha. This living temple has been in continuous worship since the 7th century and is the main center of pilgrimage in Hampi.",
            culturalSignificance:
                "The temple features a unique camera obscura effect where an inverted image of the main gopuram appears on the inner wall. This ancient optical phenomenon demonstrates the sophisticated understanding of light by the temple architects.",
            latitude: 15.335,
            longitude: 76.46,
            images: [
                "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=800&q=80",
            ],
            timings: {
                monday: { open: "06:00", close: "18:00" },
                tuesday: { open: "06:00", close: "18:00" },
                wednesday: { open: "06:00", close: "18:00" },
                thursday: { open: "06:00", close: "18:00" },
                friday: { open: "06:00", close: "18:00" },
                saturday: { open: "06:00", close: "18:00" },
                sunday: { open: "06:00", close: "18:00" },
            },
            entryFee: { indian: 0, foreigner: 0, camera: 50 },
            dressCodes: [
                "Modest clothing required",
                "Cover shoulders and knees",
                "Remove footwear at entrance",
            ],
            safetyTips: [
                "Temple elephant may be present - maintain safe distance",
                "Floors can be hot in afternoon - bring socks",
            ],
            culturalNorms: [
                "Walk clockwise around the shrine",
                "No photography inside main sanctum",
                "Maintain silence during prayer times",
            ],
            averageVisitTime: 90,
        },
        {
            name: "Vittala Temple Complex",
            slug: "vittala-temple",
            category: "TEMPLE" as const,
            description:
                "The crown jewel of Hampi's heritage, famous for the iconic Stone Chariot and the 56 musical pillars that produce different musical notes when struck. This 15th-century temple complex represents the pinnacle of Vijayanagara architecture.",
            culturalSignificance:
                "The musical pillars are an engineering marvel - each pillar produces a distinct musical note when tapped. The Stone Chariot, originally a shrine for Garuda, is one of the three famous stone chariots in India.",
            latitude: 15.3267,
            longitude: 76.4702,
            images: [
                "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
            ],
            timings: {
                monday: { open: "08:30", close: "17:30" },
                tuesday: { open: "08:30", close: "17:30" },
                wednesday: { open: "08:30", close: "17:30" },
                thursday: { open: "08:30", close: "17:30" },
                friday: { open: "08:30", close: "17:30" },
                saturday: { open: "08:30", close: "17:30" },
                sunday: { open: "08:30", close: "17:30" },
            },
            entryFee: { indian: 40, foreigner: 600, camera: 25 },
            dressCodes: ["Comfortable walking shoes recommended"],
            safetyTips: [
                "Large complex - allow 2-3 hours",
                "Carry water and sun protection",
                "Uneven terrain - watch your step",
            ],
            culturalNorms: [
                "Do not tap the musical pillars - they are protected",
                "Photography allowed in most areas",
            ],
            averageVisitTime: 120,
        },
        {
            name: "Matanga Hill",
            slug: "matanga-hill",
            category: "VIEWPOINT" as const,
            description:
                "The highest point in Hampi, offering breathtaking 360-degree panoramic views of the entire ruins landscape. Sacred in mythology as the place where Sugriva's minister Matanga performed penance.",
            culturalSignificance:
                "According to the Ramayana, sage Matanga lived here and blessed Shabari, whose dedication led to her meeting Lord Rama. Small temples and shrines dot the hilltop.",
            latitude: 15.3361,
            longitude: 76.4616,
            images: [
                "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
            ],
            entryFee: { indian: 0, foreigner: 0 },
            dressCodes: ["Sturdy footwear essential for climb"],
            safetyTips: [
                "Steep climb - takes 30-45 minutes",
                "Start early for sunrise - carry torch",
                "Can be slippery during monsoon",
                "Carry water",
            ],
            culturalNorms: ["Respect the small shrines on top"],
            averageVisitTime: 60,
        },
        {
            name: "Lotus Mahal",
            slug: "lotus-mahal",
            category: "PALACE" as const,
            description:
                "An exquisite pavilion in the Zenana Enclosure, showcasing a unique blend of Hindu and Islamic architectural styles. Its lotus bud-shaped dome and intricate arched windows make it one of Hampi's most photographed monuments.",
            culturalSignificance:
                "Built for the royal women of the Vijayanagara court, this structure demonstrates the cultural exchange and tolerance of the empire, combining Hindu temple carvings with Islamic arches.",
            latitude: 15.3186,
            longitude: 76.4621,
            images: [
                "https://images.unsplash.com/photo-1564294636501-be9877b18f68?w=800&q=80",
            ],
            timings: {
                monday: { open: "08:30", close: "17:30" },
                tuesday: { open: "08:30", close: "17:30" },
                wednesday: { open: "08:30", close: "17:30" },
                thursday: { open: "08:30", close: "17:30" },
                friday: { open: "08:30", close: "17:30" },
                saturday: { open: "08:30", close: "17:30" },
                sunday: { open: "08:30", close: "17:30" },
            },
            entryFee: { indian: 40, foreigner: 600 },
            safetyTips: ["Combined ticket with Royal Enclosure"],
            culturalNorms: ["Photography allowed outside the structure"],
            averageVisitTime: 45,
        },
        {
            name: "Elephant Stables",
            slug: "elephant-stables",
            category: "MONUMENT" as const,
            description:
                "A grand structure of eleven domed chambers that once housed the royal elephants. Each chamber has a unique dome design, combining Dravidian and Indo-Islamic architectural elements.",
            latitude: 15.3181,
            longitude: 76.4642,
            images: [
                "https://images.unsplash.com/photo-1545043059-438f9b8f9aa8?w=800&q=80",
            ],
            timings: {
                monday: { open: "08:30", close: "17:30" },
                tuesday: { open: "08:30", close: "17:30" },
                wednesday: { open: "08:30", close: "17:30" },
                thursday: { open: "08:30", close: "17:30" },
                friday: { open: "08:30", close: "17:30" },
                saturday: { open: "08:30", close: "17:30" },
                sunday: { open: "08:30", close: "17:30" },
            },
            entryFee: { indian: 40, foreigner: 600 },
            safetyTips: ["Included in Royal Enclosure ticket"],
            averageVisitTime: 30,
        },
        {
            name: "Hampi Bazaar",
            slug: "hampi-bazaar",
            category: "MARKET" as const,
            description:
                "A 750-meter-long ancient market street leading to Virupaksha Temple, once one of the richest markets in the world. Today, the column-lined ruins offer glimpses of the empire's commercial prosperity.",
            latitude: 15.3348,
            longitude: 76.4608,
            images: [
                "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
            ],
            entryFee: { indian: 0, foreigner: 0 },
            safetyTips: [
                "Active village life - respect local residents",
                "Small shops sell crafts and refreshments",
            ],
            culturalNorms: [
                "Support local artisans and vendors",
                "Ask permission before photographing locals",
            ],
            averageVisitTime: 45,
        },
    ];

    for (const poi of pois) {
        const created = await prisma.pOI.upsert({
            where: { slug: poi.slug },
            update: {},
            create: {
                ...poi,
                destinationId: hampi.id,
            },
        });
        console.log("✅ Created POI:", created.name);
    }

    // Create Heritage Trail
    const trail = await prisma.heritageTrail.upsert({
        where: { slug: "royal-heritage-walk" },
        update: {},
        create: {
            destinationId: hampi.id,
            name: "Royal Heritage Walk",
            slug: "royal-heritage-walk",
            description:
                "A comprehensive walking trail through Hampi's royal center, covering the main temples, palaces, and royal monuments. This trail offers the best introduction to Vijayanagara heritage.",
            theme: "Royal Heritage",
            durationMinutes: 180,
            distanceKm: 4.5,
            difficulty: "MODERATE",
            images: [
                "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=800&q=80",
            ],
        },
    });

    console.log("✅ Created heritage trail:", trail.name);

    // Create Stays
    const stays = [
        {
            name: "Clarks Inn Hampi",
            slug: "clarks-inn-hampi",
            type: "HOTEL" as const,
            description:
                "A comfortable mid-range hotel with modern amenities, located near Kamalapur. Offers clean rooms, restaurant, and convenient access to the ruins.",
            latitude: 15.3126,
            longitude: 76.4789,
            priceMin: 2500,
            priceMax: 4500,
            amenities: ["AC", "WiFi", "Restaurant", "Parking", "Room Service"],
            ecoPractices: ["Water conservation", "Solar heating"],
            images: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            ],
            rating: 4.2,
            reviewCount: 234,
        },
        {
            name: "Goan Corner Homestay",
            slug: "goan-corner-homestay",
            type: "HOMESTAY" as const,
            description:
                "A beloved backpacker favorite on Hippie Island, run by a friendly Goan family. Simple rooms with authentic home-cooked meals and stunning riverside views.",
            latitude: 15.3398,
            longitude: 76.4512,
            priceMin: 800,
            priceMax: 1500,
            amenities: ["River View", "Home Cooking", "WiFi", "Bicycle Rental"],
            ecoPractices: [
                "Local food sourcing",
                "Minimal plastic",
                "Solar power",
            ],
            images: [
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
            ],
            rating: 4.5,
            reviewCount: 456,
            isHomestay: true,
        },
        {
            name: "Kishkinda Heritage Resort",
            slug: "kishkinda-heritage-resort",
            type: "RESORT" as const,
            description:
                "A heritage-themed resort blending into the boulder landscape. Offers cottages designed like ancient Vijayanagara structures with modern comforts.",
            latitude: 15.3245,
            longitude: 76.4678,
            priceMin: 3500,
            priceMax: 7000,
            amenities: [
                "Pool",
                "Spa",
                "Restaurant",
                "Heritage Tours",
                "Ayurveda Center",
            ],
            ecoPractices: [
                "Rainwater harvesting",
                "Organic garden",
                "Wildlife preservation",
            ],
            images: [
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80",
            ],
            rating: 4.6,
            reviewCount: 189,
        },
    ];

    for (const stay of stays) {
        const created = await prisma.stay.upsert({
            where: { slug: stay.slug },
            update: {},
            create: {
                ...stay,
                destinationId: hampi.id,
            },
        });
        console.log("✅ Created stay:", created.name);
    }

    // Create Artisan
    const artisan = await prisma.artisan.upsert({
        where: { id: "artisan-1" },
        update: {},
        create: {
            id: "artisan-1",
            destinationId: hampi.id,
            name: "Ramesh Jangid",
            craftType: "Stone Carving",
            story:
                "Third-generation stone carver preserving Vijayanagara sculptural traditions. Learned the craft from his father and grandfather who worked on temple restoration projects.",
            latitude: 15.335,
            longitude: 76.462,
            images: [
                "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=300&q=80",
            ],
            products: ["Temple Sculptures", "Deity Figurines", "Souvenir Carvings"],
            workshopAvailable: true,
            workshopDetails:
                "2-hour stone carving workshop. Learn basic techniques and create your own small sculpture to take home. ₹1,500 per person.",
            contactPhone: "+91-9876543210",
            contactWhatsapp: "+91-9876543210",
            isVerified: true,
        },
    });

    console.log("✅ Created artisan:", artisan.name);

    // Create Local Guide
    const guide = await prisma.localGuide.upsert({
        where: { id: "guide-1" },
        update: {},
        create: {
            id: "guide-1",
            destinationId: hampi.id,
            name: "Suresh Kumar",
            bio: "Born and raised in Hampi, I've been guiding visitors through these ancient ruins for over 15 years. My family has lived here for generations, and I've heard countless stories about the Vijayanagara Empire from my grandparents. I specialize in architecture, history, and photography tours.",
            languages: ["English", "Hindi", "Kannada"],
            expertise: ["Architecture", "History", "Photography", "Local Stories"],
            pricePerDay: 2500,
            availableDays: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
            ],
            contactPhone: "+91-9876543211",
            contactWhatsapp: "+91-9876543211",
            images: [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
            ],
            rating: 4.9,
            reviewCount: 156,
            isVerified: true,
        },
    });

    console.log("✅ Created local guide:", guide.name);

    // Create CBT Village
    const village = await prisma.cBTVillage.upsert({
        where: { slug: "anegundi" },
        update: {},
        create: {
            destinationId: hampi.id,
            name: "Anegundi",
            slug: "anegundi",
            story:
                "A living heritage village across the Tungabhadra from Hampi, believed to be the Kishkindha of Ramayana where Lord Hanuman was born. While Hampi lies in ruins, Anegundi continues to thrive as a village, preserving traditions that date back centuries.",
            culture:
                "The village maintains traditional crafts including banana fiber craft, pottery, and weaving. Community-run tourism initiatives ensure that visitors can experience authentic rural Karnataka life while directly supporting local livelihoods.",
            latitude: 15.3489,
            longitude: 76.4845,
            images: [
                "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
                "https://images.unsplash.com/photo-1545043059-438f9b8f9aa8?w=800&q=80",
            ],
            festivals: [
                {
                    name: "Hampi Utsav",
                    month: "November",
                    description:
                        "Annual cultural festival celebrating Vijayanagara heritage with dance, music, and crafts exhibitions.",
                },
                {
                    name: "Virupaksha Temple Car Festival",
                    month: "February",
                    description:
                        "Massive chariot procession through Hampi Bazaar during Maha Shivaratri.",
                },
            ],
            homestays: [
                {
                    name: "Uramma Heritage Homes",
                    capacity: 4,
                    pricePerNight: 1500,
                    amenities: ["Traditional Architecture", "Home Cooking", "Courtyard"],
                    contact: "+91-9876543212",
                },
                {
                    name: "Kishkinda Trust Homestay",
                    capacity: 6,
                    pricePerNight: 1200,
                    amenities: ["River View", "Village Tours", "Craft Workshops"],
                    contact: "+91-9876543213",
                },
            ],
            foodOptions: [
                {
                    name: "Village Breakfast",
                    type: "veg",
                    price: 150,
                    description:
                        "Traditional Karnataka breakfast - idli, vada, chutney, and filter coffee",
                },
                {
                    name: "Thali Lunch",
                    type: "veg",
                    price: 200,
                    description:
                        "Full meal with rice, sambar, rasam, vegetables, papad, and payasam",
                },
            ],
            workshops: [
                {
                    name: "Banana Fiber Craft",
                    craft: "Eco-craft",
                    duration: 120,
                    price: 500,
                    description:
                        "Learn to make bags and items from banana fiber with local artisans",
                },
                {
                    name: "Traditional Pottery",
                    craft: "Pottery",
                    duration: 90,
                    price: 400,
                    description: "Hands-on pottery session using traditional techniques",
                },
            ],
            tours: [
                {
                    name: "Coracle Ride & Cave Paintings",
                    description:
                        "Cross the Tungabhadra in traditional coracles to see prehistoric cave paintings",
                    duration: 180,
                    price: 500,
                },
                {
                    name: "Village Heritage Walk",
                    description:
                        "Walking tour through ancient temples, stepwells, and traditional homes",
                    duration: 120,
                    price: 300,
                },
            ],
            contactEmail: "info@anegundi-tourism.org",
            contactWhatsapp: "+91-9876543214",
            contactPhone: "+91-9876543214",
        },
    });

    console.log("✅ Created CBT village:", village.name);

    // Create Seasonality data
    const seasonality = [
        {
            month: 1,
            weather: "Cool and pleasant",
            temperature: { min: 17, max: 28, unit: "C" },
            crowdLevel: "PEAK" as const,
            priceTrend: "PEAK" as const,
            festivals: ["Makar Sankranti"],
            events: ["Temple car festivals"],
            recommendations:
                "Best time to visit. Book accommodations in advance. Perfect weather for exploring the ruins all day.",
            whatToPack: [
                "Light layers",
                "Sun hat",
                "Comfortable walking shoes",
                "Sunscreen",
            ],
        },
        {
            month: 2,
            weather: "Pleasant with rising temperatures",
            temperature: { min: 19, max: 31, unit: "C" },
            crowdLevel: "HIGH" as const,
            priceTrend: "HIGH" as const,
            festivals: ["Maha Shivaratri at Virupaksha"],
            events: ["Hampi Music Festival"],
            recommendations:
                "Excellent time to visit. Maha Shivaratri is a major celebration at Virupaksha Temple.",
            whatToPack: ["Light cotton clothes", "Sun protection", "Water bottle"],
        },
        {
            month: 10,
            weather: "Post-monsoon, pleasant",
            temperature: { min: 22, max: 32, unit: "C" },
            crowdLevel: "MODERATE" as const,
            priceTrend: "MODERATE" as const,
            festivals: ["Dussehra"],
            events: ["Navaratri celebrations"],
            recommendations:
                "Season begins. Landscape is green from monsoon. Fewer crowds than peak season.",
            whatToPack: ["Light clothes", "Rain jacket (occasional showers)", "Mosquito repellent"],
        },
        {
            month: 11,
            weather: "Cool and comfortable",
            temperature: { min: 20, max: 30, unit: "C" },
            crowdLevel: "HIGH" as const,
            priceTrend: "HIGH" as const,
            festivals: ["Hampi Utsav (variable)"],
            events: ["Cultural performances"],
            recommendations:
                "Hampi Utsav brings the ruins to life with cultural performances. Book early if visiting during festival.",
            whatToPack: ["Light layers", "Comfortable shoes", "Camera"],
        },
        {
            month: 12,
            weather: "Cool and dry",
            temperature: { min: 18, max: 28, unit: "C" },
            crowdLevel: "PEAK" as const,
            priceTrend: "PEAK" as const,
            festivals: ["Christmas", "New Year"],
            events: ["Holiday celebrations"],
            recommendations:
                "Peak holiday season. Many international visitors. Book well in advance.",
            whatToPack: [
                "Warm layers for evening",
                "Comfortable shoes",
                "Sun protection",
            ],
        },
    ];

    for (const s of seasonality) {
        await prisma.seasonality.upsert({
            where: {
                destinationId_month: { destinationId: hampi.id, month: s.month },
            },
            update: {},
            create: {
                ...s,
                destinationId: hampi.id,
            },
        });
    }

    console.log("✅ Created seasonality data");

    console.log("\n🎉 Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
