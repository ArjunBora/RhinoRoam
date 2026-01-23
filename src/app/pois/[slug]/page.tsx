"use client";

import { Header, Footer } from "@/components/ui/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import Link from "next/link";
import {
    MapPin,
    Clock,
    Calendar,
    DollarSign,
    Info,
    Shield,
    Camera,
    Volume2,
    ChevronRight,
    ChevronLeft,
    Star,
    Share2,
    Heart,
    Navigation,
    AlertTriangle,
    CheckCircle
} from "lucide-react";
import { cn, POI_CATEGORY_ICONS, POI_CATEGORY_LABELS, formatCurrency, formatDuration } from "@/lib/utils";

// Sample POI data
const POI = {
    id: "1",
    name: "Virupaksha Temple",
    slug: "virupaksha-temple",
    category: "TEMPLE",
    destinationId: "hampi",
    destinationName: "Hampi",
    description: "The oldest and most sacred temple in Hampi, dedicated to Lord Shiva as Virupaksha. This living temple has been in continuous worship since the 7th century and is the main center of pilgrimage in Hampi. The temple complex includes a main shrine, smaller shrines, pillared halls, and a 160-foot tall gopuram (tower) visible from miles away.",
    culturalSignificance: "The temple features a unique camera obscura effect where an inverted image of the main gopuram appears on the inner wall of the sanctum. This ancient optical phenomenon demonstrates the sophisticated understanding of light by the temple architects. The temple is also home to Lakshmi, the temple elephant who blesses devotees in exchange for a small offering.",
    latitude: 15.335,
    longitude: 76.46,
    images: [
        "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=1200&q=80",
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80",
        "https://images.unsplash.com/photo-1564294636501-be9877b18f68?w=1200&q=80",
        "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1200&q=80",
    ],
    audioGuideUrl: "/audio/virupaksha-guide.mp3",
    videoUrl: "https://www.youtube.com/watch?v=example",
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
        "Modest clothing required - cover shoulders and knees",
        "Remove footwear before entering temple premises",
        "No leather items inside the sanctum",
    ],
    restrictions: [
        "Photography not allowed inside main sanctum",
        "Non-Hindus may not enter the inner sanctum",
    ],
    safetyTips: [
        "Temple elephant Lakshmi may be present - maintain safe distance",
        "Floors can be hot in afternoon - carry socks if needed",
        "Watch for monkeys - don't carry visible food items",
        "Steep stairs to upper levels - use handrails",
    ],
    culturalNorms: [
        "Walk clockwise around the shrine (pradakshina)",
        "Join hands in namaste when greeting priests",
        "Maintain silence during prayer times",
        "Don't point feet toward deity or holy objects",
        "Accept prasad with right hand",
    ],
    healthAdvisories: [
        "Carry water - temple premises can be hot",
        "Watch for uneven stone floors",
    ],
    environmentalRules: [
        "No littering - use designated bins",
        "Don't feed the monkeys",
        "Don't touch or climb on ancient structures",
    ],
    averageVisitTime: 90,
    isVerified: true,
    rating: 4.8,
    reviewCount: 1234,
};

const NEARBY_POIS = [
    { id: "2", name: "Hampi Bazaar", category: "MARKET", distance: "0.2 km", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" },
    { id: "3", name: "Hemakuta Hill", category: "VIEWPOINT", distance: "0.4 km", image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=400&q=80" },
    { id: "4", name: "Monolithic Bull", category: "MONUMENT", distance: "0.5 km", image: "https://images.unsplash.com/photo-1564294636501-be9877b18f68?w=400&q=80" },
];

export default function POIDetailPage({ params }: { params: { slug: string } }) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
    const currentDay = days[new Date().getDay()] as keyof typeof POI.timings;
    const todayTimings = POI.timings[currentDay];


    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[var(--header-height)]">
                {/* Hero Image Gallery */}
                <section className="relative h-[50vh] md:h-[60vh] bg-[var(--neutral-900)]">
                    <div className="absolute inset-0 flex">
                        <div className="w-full md:w-2/3 relative">
                            <img
                                src={POI.images[0]}
                                alt={POI.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="hidden md:grid w-1/3 grid-rows-2 gap-1">
                            <img
                                src={POI.images[1]}
                                alt={POI.name}
                                className="w-full h-full object-cover"
                            />
                            <img
                                src={POI.images[2]}
                                alt={POI.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-colors">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Gallery Count */}
                    <button className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-xl text-white text-sm flex items-center gap-2 hover:bg-black/70 transition-colors">
                        <Camera className="w-4 h-4" />
                        View all {POI.images.length} photos
                    </button>
                </section>

                {/* Content */}
                <section className="section-padding bg-[var(--bg-primary)]">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Breadcrumb */}
                                <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                    <Link href="/destinations" className="hover:text-[var(--text-primary)]">Destinations</Link>
                                    <ChevronRight className="w-4 h-4" />
                                    <Link href={`/destinations/${POI.destinationId}`} className="hover:text-[var(--text-primary)]">{POI.destinationName}</Link>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-[var(--text-primary)]">{POI.name}</span>
                                </nav>

                                {/* Title Section */}
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="badge badge-heritage">
                                            {POI_CATEGORY_ICONS[POI.category]} {POI_CATEGORY_LABELS[POI.category]}
                                        </span>
                                        {POI.isVerified && (
                                            <span className="badge badge-verified">
                                                <CheckCircle className="w-3 h-3" /> Verified
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-4xl font-heading font-bold mb-3">{POI.name}</h1>
                                    <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-[var(--heritage-gold)] fill-[var(--heritage-gold)]" />
                                            <strong>{POI.rating}</strong> ({POI.reviewCount} reviews)
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> {POI.destinationName}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> {formatDuration(POI.averageVisitTime)}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">About</h2>
                                    <p className="text-[var(--text-secondary)] leading-relaxed">{POI.description}</p>
                                </div>

                                {/* Cultural Significance */}
                                {POI.culturalSignificance && (
                                    <div className="p-6 bg-[var(--heritage-gold)]/10 rounded-2xl border border-[var(--heritage-gold)]/20">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-heritage flex items-center justify-center flex-shrink-0">
                                                <Info className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">Cultural Significance</h3>
                                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                                    {POI.culturalSignificance}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Audio Guide */}
                                {POI.audioGuideUrl && (
                                    <div className="p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-[var(--nature-teal)]/20 flex items-center justify-center">
                                                <Volume2 className="w-6 h-6 text-[var(--nature-teal)]" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Audio Guide Available</h4>
                                                <p className="text-sm text-[var(--text-muted)]">Listen to the history and stories</p>
                                            </div>
                                        </div>
                                        <button className="btn-secondary py-2 px-4 text-sm">
                                            Play Guide
                                        </button>
                                    </div>
                                )}

                                {/* Cultural Norms & Safety */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Dress Code & Etiquette */}
                                    <div className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)]">
                                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-[var(--nature-teal)]" />
                                            Dress Code & Etiquette
                                        </h3>
                                        <ul className="space-y-3">
                                            {POI.dressCodes.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                    <span className="w-5 h-5 rounded-full bg-[var(--nature-teal)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <CheckCircle className="w-3 h-3 text-[var(--nature-teal)]" />
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                            {POI.culturalNorms.slice(0, 3).map((item, i) => (
                                                <li key={i + 10} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                    <span className="w-5 h-5 rounded-full bg-[var(--heritage-gold)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Info className="w-3 h-3 text-[var(--heritage-gold)]" />
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Safety Tips */}
                                    <div className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)]">
                                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />
                                            Safety Tips
                                        </h3>
                                        <ul className="space-y-3">
                                            {POI.safetyTips.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                    <span className="w-5 h-5 rounded-full bg-[var(--warning)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <AlertTriangle className="w-3 h-3 text-[var(--warning)]" />
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Location Map */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold">Location</h2>
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${POI.latitude},${POI.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary py-2 px-4 text-sm"
                                        >
                                            <Navigation className="w-4 h-4" />
                                            Get Directions
                                        </a>
                                    </div>
                                    <InteractiveMap
                                        className="h-64 rounded-2xl"
                                        initialCenter={[POI.longitude, POI.latitude]}
                                        initialZoom={15}
                                        markers={[{ id: POI.id, name: POI.name, latitude: POI.latitude, longitude: POI.longitude, type: "poi", category: POI.category }]}
                                    />
                                </div>

                                {/* Nearby Places */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Nearby Heritage Sites</h2>
                                    <div className="grid grid-cols-3 gap-4">
                                        {NEARBY_POIS.map((poi) => (
                                            <Link
                                                key={poi.id}
                                                href={`/pois/${poi.id}`}
                                                className="group bg-[var(--bg-card)] rounded-xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all"
                                            >
                                                <div className="h-24 relative overflow-hidden">
                                                    <img src={poi.image} alt={poi.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                                <div className="p-3">
                                                    <h4 className="text-sm font-medium truncate group-hover:text-[var(--heritage-gold)]">{poi.name}</h4>
                                                    <p className="text-xs text-[var(--text-muted)]">{poi.distance}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Quick Info Card */}
                                <div className="bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)] overflow-hidden sticky top-[calc(var(--header-height)+24px)]">
                                    <div className="p-6 border-b border-[var(--border-light)]">
                                        <h3 className="font-semibold mb-4">Visitor Information</h3>

                                        {/* Timings */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-[var(--text-muted)]">Today's Hours</span>
                                                <span className="text-sm font-medium text-[var(--success)]">Open Now</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-[var(--heritage-gold)]" />
                                                <span className="font-medium">{todayTimings.open} - {todayTimings.close}</span>
                                            </div>
                                        </div>

                                        {/* Entry Fee */}
                                        <div className="mb-4">
                                            <span className="text-sm text-[var(--text-muted)] block mb-2">Entry Fee</span>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span>Indian Citizens</span>
                                                    <span className="font-medium">
                                                        {POI.entryFee.indian === 0 ? "Free" : formatCurrency(POI.entryFee.indian)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span>Foreign Nationals</span>
                                                    <span className="font-medium">
                                                        {POI.entryFee.foreigner === 0 ? "Free" : formatCurrency(POI.entryFee.foreigner)}
                                                    </span>
                                                </div>
                                                {POI.entryFee.camera && (
                                                    <div className="flex justify-between text-sm">
                                                        <span>Camera Fee</span>
                                                        <span className="font-medium">{formatCurrency(POI.entryFee.camera)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Duration */}
                                        <div>
                                            <span className="text-sm text-[var(--text-muted)] block mb-2">Recommended Duration</span>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-5 h-5 text-[var(--heritage-gold)]" />
                                                <span className="font-medium">{formatDuration(POI.averageVisitTime)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-6 space-y-3">
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${POI.latitude},${POI.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary w-full justify-center"
                                        >
                                            <Navigation className="w-5 h-5" />
                                            Get Directions
                                        </a>
                                        <button className="btn-secondary w-full justify-center">
                                            <Calendar className="w-5 h-5" />
                                            Add to Itinerary
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
