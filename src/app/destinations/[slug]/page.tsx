"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/ui/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import Link from "next/link";
import {
    MapPin,
    Compass,
    Clock,
    Calendar,
    Star,
    Users,
    Home,
    Plane,
    Train,
    Bus,
    Car,
    ChevronRight,
    ArrowRight,
    ExternalLink,
    Shield,
    Heart,
    Thermometer,
    Info
} from "lucide-react";
import { cn, POI_CATEGORY_ICONS, formatCurrency } from "@/lib/utils";

// Sample data for Hampi
const DESTINATION = {
    id: "1",
    name: "Hampi",
    slug: "hampi",
    tagline: "The Forgotten Empire",
    description: "A UNESCO World Heritage Site featuring the ruins of the magnificent Vijayanagara Empire. Spread across 26 square kilometers of boulder-strewn terrain, Hampi transports you to a 14th-century world of royal grandeur, spiritual devotion, and architectural brilliance.",
    heroImage: "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=1600&q=80",
    images: [
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
        "https://images.unsplash.com/photo-1564294636501-be9877b18f68?w=800&q=80",
        "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
    ],
    region: "Karnataka",
    state: "Karnataka",
    latitude: 15.335,
    longitude: 76.46,
    rating: 4.8,
    reviewCount: 2450,
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
};

const POIS = [
    {
        id: "1",
        name: "Virupaksha Temple",
        slug: "virupaksha-temple",
        category: "TEMPLE",
        image: "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=400&q=80",
        description: "The oldest and most sacred temple in Hampi, dedicated to Lord Shiva.",
        visitTime: 90,
        entryFee: 0,
    },
    {
        id: "2",
        name: "Vittala Temple Complex",
        slug: "vittala-temple",
        category: "TEMPLE",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80",
        description: "Home to the iconic Stone Chariot and musical pillars.",
        visitTime: 120,
        entryFee: 40,
    },
    {
        id: "3",
        name: "Matanga Hill",
        slug: "matanga-hill",
        category: "VIEWPOINT",
        image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=400&q=80",
        description: "The highest point offering panoramic sunrise and sunset views.",
        visitTime: 60,
        entryFee: 0,
    },
    {
        id: "4",
        name: "Lotus Mahal",
        slug: "lotus-mahal",
        category: "PALACE",
        image: "https://images.unsplash.com/photo-1564294636501-be9877b18f68?w=400&q=80",
        description: "A stunning blend of Hindu and Islamic architecture.",
        visitTime: 45,
        entryFee: 40,
    },
];

const TRAILS = [
    {
        id: "1",
        name: "Royal Heritage Walk",
        theme: "Royal Heritage",
        duration: 180,
        distance: 4.5,
        difficulty: "MODERATE",
        stops: 6,
    },
    {
        id: "2",
        name: "Sacred Temples Trail",
        theme: "Spiritual Journey",
        duration: 240,
        distance: 5.2,
        difficulty: "EASY",
        stops: 8,
    },
    {
        id: "3",
        name: "Sunrise Photography Walk",
        theme: "Photography",
        duration: 150,
        distance: 3.0,
        difficulty: "CHALLENGING",
        stops: 4,
    },
];

const STAYS = [
    {
        id: "1",
        name: "Clarks Inn Hampi",
        type: "HOTEL",
        priceMin: 2500,
        priceMax: 4500,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
    },
    {
        id: "2",
        name: "Goan Corner Homestay",
        type: "HOMESTAY",
        priceMin: 800,
        priceMax: 1500,
        rating: 4.5,
        isHomestay: true,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
    },
    {
        id: "3",
        name: "Kishkinda Heritage Resort",
        type: "RESORT",
        priceMin: 3500,
        priceMax: 7000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80",
    },
];

const SEASONALITY = [
    { month: "Oct", crowd: "MODERATE", price: "MODERATE", weather: "Pleasant", temp: "24-32°C" },
    { month: "Nov", crowd: "HIGH", price: "HIGH", weather: "Cool", temp: "20-30°C" },
    { month: "Dec", crowd: "PEAK", price: "PEAK", weather: "Cool", temp: "18-28°C" },
    { month: "Jan", crowd: "PEAK", price: "PEAK", weather: "Cool", temp: "17-28°C" },
    { month: "Feb", crowd: "HIGH", price: "HIGH", weather: "Warm", temp: "19-31°C" },
    { month: "Mar", crowd: "MODERATE", price: "MODERATE", weather: "Hot", temp: "22-35°C" },
];

const TABS = [
    { id: "overview", label: "Overview" },
    { id: "pois", label: "Places to Visit" },
    { id: "trails", label: "Heritage Trails" },
    { id: "stays", label: "Where to Stay" },
    { id: "plan", label: "Plan Your Visit" },
];

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[var(--header-height)]">
                {/* Hero Section */}
                <section className="relative h-[50vh] md:h-[60vh]">
                    <img
                        src={DESTINATION.heroImage}
                        alt={DESTINATION.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="container-custom">
                            <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                                <Link href="/destinations" className="hover:text-white">Destinations</Link>
                                <ChevronRight className="w-4 h-4" />
                                <span>{DESTINATION.region}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">
                                {DESTINATION.name}
                            </h1>
                            <p className="text-xl text-white/80 mb-4">{DESTINATION.tagline}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                                <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-[var(--heritage-gold)] fill-[var(--heritage-gold)]" />
                                    {DESTINATION.rating} ({DESTINATION.reviewCount} reviews)
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> {POIS.length} Heritage Sites
                                </span>
                                <span className="flex items-center gap-1">
                                    <Compass className="w-4 h-4" /> {TRAILS.length} Walking Trails
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tab Navigation */}
                <div className="sticky top-[var(--header-height)] z-20 bg-[var(--bg-card)] border-b border-[var(--border-light)]">
                    <div className="container-custom">
                        <div className="flex gap-1 overflow-x-auto hide-scrollbar py-2">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                                        activeTab === tab.id
                                            ? "bg-gradient-heritage text-white"
                                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="section-padding bg-[var(--bg-primary)]">
                    <div className="container-custom">
                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Description */}
                                    <div>
                                        <h2 className="text-2xl font-heading font-bold mb-4">About {DESTINATION.name}</h2>
                                        <p className="text-[var(--text-secondary)] leading-relaxed">
                                            {DESTINATION.description}
                                        </p>
                                    </div>

                                    {/* Highlights */}
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {DESTINATION.highlights.map((highlight, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-xl"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-heritage flex items-center justify-center text-white text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <span className="text-sm font-medium">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Map Preview */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-semibold">Location</h3>
                                            <Link
                                                href="/explore"
                                                className="text-sm text-[var(--heritage-gold)] hover:underline flex items-center gap-1"
                                            >
                                                Open Full Map <ExternalLink className="w-3 h-3" />
                                            </Link>
                                        </div>
                                        <InteractiveMap
                                            className="h-64 rounded-2xl"
                                            initialCenter={[DESTINATION.longitude, DESTINATION.latitude]}
                                            initialZoom={12}
                                            showControls={false}
                                            showGeolocate={false}
                                        />
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* Quick Actions */}
                                    <div className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)]">
                                        <h4 className="font-semibold mb-4">Quick Actions</h4>
                                        <div className="space-y-3">
                                            <Link href="/plan" className="btn-primary w-full justify-center">
                                                <Calendar className="w-4 h-4" />
                                                Plan Your Trip
                                            </Link>
                                            <Link href="/explore" className="btn-secondary w-full justify-center">
                                                <Compass className="w-4 h-4" />
                                                Explore on Map
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Best Time */}
                                    <div className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)]">
                                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[var(--heritage-gold)]" />
                                            Best Time to Visit
                                        </h4>
                                        <div className="space-y-2">
                                            {SEASONALITY.slice(0, 4).map((s) => (
                                                <div
                                                    key={s.month}
                                                    className="flex items-center justify-between py-2 border-b border-[var(--border-light)] last:border-0"
                                                >
                                                    <span className="font-medium">{s.month}</span>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <span className="flex items-center gap-1 text-[var(--text-muted)]">
                                                            <Thermometer className="w-3 h-3" /> {s.temp}
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                "px-2 py-0.5 rounded-full",
                                                                s.crowd === "PEAK" && "bg-red-100 text-red-700",
                                                                s.crowd === "HIGH" && "bg-orange-100 text-orange-700",
                                                                s.crowd === "MODERATE" && "bg-green-100 text-green-700"
                                                            )}
                                                        >
                                                            {s.crowd}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Cultural Tips */}
                                    <div className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)]">
                                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-[var(--nature-teal)]" />
                                            Cultural Tips
                                        </h4>
                                        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                                            <li className="flex items-start gap-2">
                                                <span className="text-[var(--heritage-gold)]">•</span>
                                                Dress modestly when visiting temples
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[var(--heritage-gold)]">•</span>
                                                Remove footwear at religious sites
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[var(--heritage-gold)]">•</span>
                                                Photography may be restricted inside sanctums
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[var(--heritage-gold)]">•</span>
                                                Carry water and sun protection
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Places to Visit Tab */}
                        {activeTab === "pois" && (
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-heading font-bold">Heritage Sites</h2>
                                        <p className="text-[var(--text-secondary)] mt-1">
                                            Explore {POIS.length} must-visit places in {DESTINATION.name}
                                        </p>
                                    </div>
                                    <Link href="/explore" className="btn-secondary">
                                        <MapPin className="w-4 h-4" />
                                        View on Map
                                    </Link>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {POIS.map((poi) => (
                                        <Link
                                            key={poi.id}
                                            href={`/pois/${poi.slug}`}
                                            className="heritage-card group"
                                        >
                                            <div className="relative h-48">
                                                <img
                                                    src={poi.image}
                                                    alt={poi.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-full text-xs font-medium">
                                                    {POI_CATEGORY_ICONS[poi.category]} {poi.category}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-1 group-hover:text-[var(--heritage-gold)] transition-colors">
                                                    {poi.name}
                                                </h3>
                                                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
                                                    {poi.description}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {poi.visitTime} min
                                                    </span>
                                                    <span>
                                                        {poi.entryFee === 0 ? "Free Entry" : formatCurrency(poi.entryFee)}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Heritage Trails Tab */}
                        {activeTab === "trails" && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-heading font-bold">Heritage Walking Trails</h2>
                                    <p className="text-[var(--text-secondary)] mt-1">
                                        Curated walking routes to explore {DESTINATION.name}&apos;s heritage
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {TRAILS.map((trail) => (
                                        <div
                                            key={trail.id}
                                            className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="badge badge-heritage">{trail.theme}</span>
                                                        <span
                                                            className={cn(
                                                                "badge",
                                                                trail.difficulty === "EASY" && "bg-green-100 text-green-700",
                                                                trail.difficulty === "MODERATE" && "bg-yellow-100 text-yellow-700",
                                                                trail.difficulty === "CHALLENGING" && "bg-red-100 text-red-700"
                                                            )}
                                                        >
                                                            {trail.difficulty}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold">{trail.name}</h3>
                                                </div>
                                                <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)]">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" /> {Math.floor(trail.duration / 60)}h {trail.duration % 60}m
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Compass className="w-4 h-4" /> {trail.distance} km
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" /> {trail.stops} stops
                                                    </span>
                                                    <Link
                                                        href={`/trails/${trail.id}`}
                                                        className="btn-primary text-sm py-2"
                                                    >
                                                        View Trail
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Where to Stay Tab */}
                        {activeTab === "stays" && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-heading font-bold">Where to Stay</h2>
                                    <p className="text-[var(--text-secondary)] mt-1">
                                        Recommended accommodations near {DESTINATION.name}
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {STAYS.map((stay) => (
                                        <div key={stay.id} className="heritage-card">
                                            <div className="relative h-48">
                                                <img
                                                    src={stay.image}
                                                    alt={stay.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-full text-xs font-medium">
                                                    <Home className="w-3 h-3 inline mr-1" />
                                                    {stay.type}
                                                </div>
                                                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full">
                                                    <Star className="w-3 h-3 text-[var(--heritage-gold)] fill-[var(--heritage-gold)]" />
                                                    <span className="text-xs text-white">{stay.rating}</span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">{stay.name}</h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-[var(--text-secondary)]">
                                                        {formatCurrency(stay.priceMin)} - {formatCurrency(stay.priceMax)}
                                                        <span className="text-xs"> /night</span>
                                                    </span>
                                                    <button className="text-sm font-medium text-[var(--heritage-gold)] hover:underline">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Plan Your Visit Tab */}
                        {activeTab === "plan" && (
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* How to Reach */}
                                <div>
                                    <h2 className="text-2xl font-heading font-bold mb-6">How to Reach</h2>
                                    <div className="space-y-4">
                                        {[
                                            { icon: Plane, title: "By Air", data: DESTINATION.howToReach.airport },
                                            { icon: Train, title: "By Train", data: DESTINATION.howToReach.railway },
                                            { icon: Bus, title: "By Bus", data: DESTINATION.howToReach.bus },
                                            { icon: Car, title: "Self Drive", data: DESTINATION.howToReach.selfDrive },
                                        ].map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <div
                                                    key={item.title}
                                                    className="p-4 bg-[var(--bg-card)] rounded-xl shadow-[var(--shadow-sm)]"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                                                            <Icon className="w-5 h-5 text-[var(--heritage-gold)]" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold">{item.title}</h4>
                                                            {item.data && (
                                                                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                                                                    {"name" in item.data && <p className="font-medium text-[var(--text-primary)]">{item.data.name}</p>}
                                                                    {"distance" in item.data && <p>Distance: {item.data.distance}</p>}
                                                                    {"duration" in item.data && <p>Duration: {item.data.duration}</p>}
                                                                    {"cost" in item.data && <p>Approx Cost: {item.data.cost}</p>}
                                                                    {"note" in item.data && <p>{item.data.note}</p>}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Seasonality Calendar */}
                                <div>
                                    <h2 className="text-2xl font-heading font-bold mb-6">Best Time to Visit</h2>
                                    <div className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)]">
                                        <div className="grid grid-cols-6 gap-2">
                                            {SEASONALITY.map((s) => (
                                                <div
                                                    key={s.month}
                                                    className={cn(
                                                        "p-3 rounded-xl text-center",
                                                        s.crowd === "PEAK" && "bg-gradient-heritage text-white",
                                                        s.crowd === "HIGH" && "bg-orange-100",
                                                        s.crowd === "MODERATE" && "bg-green-50"
                                                    )}
                                                >
                                                    <p className="font-medium text-sm">{s.month}</p>
                                                    <p className="text-xs mt-1 opacity-80">{s.temp.split("-")[0]}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                                            <span className="flex items-center gap-1">
                                                <div className="w-3 h-3 rounded bg-gradient-heritage" /> Peak Season
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <div className="w-3 h-3 rounded bg-orange-100" /> High Season
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <div className="w-3 h-3 rounded bg-green-50" /> Good Time
                                            </span>
                                        </div>

                                        <div className="mt-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                                            <div className="flex items-start gap-3">
                                                <Info className="w-5 h-5 text-[var(--nature-teal)] flex-shrink-0 mt-0.5" />
                                                <div className="text-sm">
                                                    <p className="font-medium">Recommended: October to February</p>
                                                    <p className="text-[var(--text-secondary)] mt-1">
                                                        Pleasant weather with temperatures between 18-30°C.
                                                        Best for outdoor exploration and photography.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-6 p-6 bg-gradient-heritage rounded-2xl text-white">
                                        <h3 className="font-semibold text-lg mb-2">Ready to Explore?</h3>
                                        <p className="text-sm text-white/80 mb-4">
                                            Let our AI assistant help you create a personalized itinerary
                                        </p>
                                        <button className="w-full py-3 bg-white text-[var(--heritage-bronze)] rounded-xl font-semibold hover:bg-white/90 transition-colors">
                                            Create My Itinerary
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
