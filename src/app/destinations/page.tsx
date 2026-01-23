import { Header, Footer } from "@/components/ui/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import Link from "next/link";
import {
    MapPin,
    Compass,
    Star,
    ArrowRight,
    Calendar,
    Users,
    Thermometer,
    CloudRain,
    Search
} from "lucide-react";

// Sample destination data
const DESTINATIONS = [
    {
        id: "1",
        name: "Hampi",
        slug: "hampi",
        tagline: "The Forgotten Empire",
        description: "A UNESCO World Heritage Site featuring the ruins of the magnificent Vijayanagara Empire, spread across boulder-strewn hills.",
        image: "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=800&q=80",
        region: "Karnataka",
        pois: 45,
        trails: 5,
        rating: 4.8,
        bestTime: "Oct - Feb",
        weather: "Pleasant",
    },
    {
        id: "2",
        name: "Varanasi",
        slug: "varanasi",
        tagline: "City of Light",
        description: "One of the world's oldest continuously inhabited cities, famous for its ghats along the sacred Ganges River.",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        region: "Uttar Pradesh",
        pois: 38,
        trails: 4,
        rating: 4.7,
        bestTime: "Oct - Mar",
        weather: "Cool",
    },
    {
        id: "3",
        name: "Jaipur",
        slug: "jaipur",
        tagline: "The Pink City",
        description: "A vibrant blend of royal heritage, stunning forts, and colorful bazaars that define Rajasthani grandeur.",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        region: "Rajasthan",
        pois: 52,
        trails: 6,
        rating: 4.9,
        bestTime: "Oct - Mar",
        weather: "Moderate",
    },
    {
        id: "4",
        name: "Khajuraho",
        slug: "khajuraho",
        tagline: "Temples of Desire",
        description: "Famous for its stunning group of Hindu and Jain temples, renowned for their nagara-style architectural symbolism.",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
        region: "Madhya Pradesh",
        pois: 28,
        trails: 3,
        rating: 4.6,
        bestTime: "Oct - Mar",
        weather: "Pleasant",
    },
    {
        id: "5",
        name: "Mahabalipuram",
        slug: "mahabalipuram",
        tagline: "Shore Temple Legacy",
        description: "An ancient port city with rock-cut temples and cave monuments, showcasing Pallava dynasty art and architecture.",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
        region: "Tamil Nadu",
        pois: 22,
        trails: 2,
        rating: 4.5,
        bestTime: "Nov - Feb",
        weather: "Tropical",
    },
    {
        id: "6",
        name: "Ajanta & Ellora",
        slug: "ajanta-ellora",
        tagline: "Cave Masterpieces",
        description: "Rock-cut Buddhist, Hindu and Jain cave monuments dating from the 2nd century BCE, with stunning murals and sculptures.",
        image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
        region: "Maharashtra",
        pois: 34,
        trails: 4,
        rating: 4.8,
        bestTime: "Oct - Mar",
        weather: "Moderate",
    },
];

export default function DestinationsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[var(--header-height)]">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-[var(--neutral-900)] to-[var(--neutral-800)] py-16 md:py-24">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <span className="badge badge-heritage mb-4">Explore India</span>
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                                Heritage Destinations
                            </h1>
                            <p className="text-lg text-white/70 mb-8">
                                From ancient temples to royal palaces, discover UNESCO World Heritage Sites
                                and hidden cultural gems across India
                            </p>

                            {/* Search */}
                            <div className="relative max-w-xl">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                <input
                                    type="text"
                                    placeholder="Search destinations..."
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--heritage-gold)]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Destinations Grid */}
                <section className="section-padding bg-[var(--bg-primary)]">
                    <div className="container-custom">
                        {/* Stats Bar */}
                        <div className="flex flex-wrap gap-6 items-center justify-between mb-12 pb-8 border-b border-[var(--border-light)]">
                            <div className="flex items-center gap-6 text-sm">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-[var(--heritage-gold)]" />
                                    <strong>{DESTINATIONS.length}</strong> Destinations
                                </span>
                                <span className="flex items-center gap-2">
                                    <Compass className="w-4 h-4 text-[var(--nature-teal)]" />
                                    <strong>24</strong> Heritage Trails
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[var(--heritage-bronze)]" />
                                    <strong>50+</strong> Local Guides
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-[var(--text-muted)]">Sort by:</span>
                                <select className="bg-[var(--bg-secondary)] rounded-lg px-3 py-2 text-sm focus:outline-none">
                                    <option>Popular</option>
                                    <option>Rating</option>
                                    <option>Name A-Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {DESTINATIONS.map((dest, index) => (
                                <Link
                                    key={dest.id}
                                    href={`/destinations/${dest.slug}`}
                                    className="group heritage-card animate-slide-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Rating Badge */}
                                        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                                            <Star className="w-3 h-3 text-[var(--heritage-gold)] fill-[var(--heritage-gold)]" />
                                            <span className="text-xs font-medium text-white">{dest.rating}</span>
                                        </div>

                                        {/* Title */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="text-sm text-white/80 mb-1">{dest.tagline}</p>
                                            <h3 className="text-2xl font-heading font-bold text-white">{dest.name}</h3>
                                            <p className="text-sm text-white/70 mt-1">{dest.region}</p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                                            {dest.description}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] mb-4">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {dest.pois} Sites
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Compass className="w-3 h-3" /> {dest.trails} Trails
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {dest.bestTime}
                                            </span>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
                                            <span className="text-sm font-medium text-[var(--heritage-gold)] group-hover:text-[var(--heritage-bronze)] transition-colors">
                                                Explore Destination
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--heritage-gold)] group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Best Time to Visit */}
                <section className="section-padding bg-[var(--bg-secondary)]">
                    <div className="container-custom">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="badge badge-nature mb-3">Plan Ahead</span>
                            <h2 className="text-3xl font-heading font-bold mb-4">Best Time to Visit</h2>
                            <p className="text-[var(--text-secondary)]">
                                India offers diverse experiences throughout the year.
                                Here&apos;s a quick guide to help you plan your heritage journey.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    season: "Winter (Oct - Feb)",
                                    icon: Thermometer,
                                    description: "Best time for most heritage sites. Pleasant weather, clear skies, and major festivals.",
                                    destinations: ["Hampi", "Jaipur", "Varanasi", "Khajuraho"],
                                    color: "var(--nature-teal)",
                                },
                                {
                                    season: "Spring (Mar - May)",
                                    icon: Calendar,
                                    description: "Shoulder season with fewer crowds. Some regions get warm but still manageable.",
                                    destinations: ["Hill Stations", "South India", "Northeast"],
                                    color: "var(--heritage-gold)",
                                },
                                {
                                    season: "Monsoon (Jun - Sep)",
                                    icon: CloudRain,
                                    description: "Lush green landscapes. Some sites may be less accessible but offer unique beauty.",
                                    destinations: ["Kerala", "Western Ghats", "Rajasthan"],
                                    color: "var(--nature-forest)",
                                },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.season}
                                        className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)]"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                            style={{ backgroundColor: `${item.color}20` }}
                                        >
                                            <Icon className="w-6 h-6" style={{ color: item.color }} />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{item.season}</h3>
                                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                                            {item.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.destinations.map((dest) => (
                                                <span
                                                    key={dest}
                                                    className="px-2 py-1 bg-[var(--bg-secondary)] rounded-full text-xs"
                                                >
                                                    {dest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
