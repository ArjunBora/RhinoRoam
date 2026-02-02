import { Footer } from "@/components/ui/navigation";
import Link from "next/link";
import {
    MapPin,
    Users,
    Home,
    Coffee,
    Palette,
    Compass,
    Phone,
    MessageCircle,
    Star,
    ArrowRight,
    Heart,
    Camera,
    Utensils
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

// Sample CBT Village Data
const VILLAGES = [
    {
        id: "1",
        name: "Anegundi",
        slug: "anegundi",
        tagline: "Birthplace of Mythology",
        description: "A living heritage village across the Tungabhadra from Hampi, believed to be the Kishkindha of Ramayana. Experience rural Karnataka life alongside ancient temples and cave paintings.",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
        location: "Near Hampi, Karnataka",
        experiences: ["Coracle Ride", "Cave Paintings", "Temple Walk", "Organic Farming"],
        homestays: 8,
        priceRange: "₹800 - ₹2,000",
    },
    {
        id: "2",
        name: "Hodka",
        slug: "hodka",
        tagline: "Kutchi Artisan Village",
        description: "A traditional Kutchi village known for its mud houses, embroidery crafts, and warm hospitality. Part of the Rann of Kutch experience.",
        image: "https://images.unsplash.com/photo-1545043059-438f9b8f9aa8?w=800&q=80",
        location: "Kutch, Gujarat",
        experiences: ["Rogan Art", "Mud Architecture", "Desert Safari", "Folk Music"],
        homestays: 12,
        priceRange: "₹1,200 - ₹3,500",
    },
];

// Sample Artisan Data
const ARTISANS = [
    {
        id: "1",
        name: "Ramesh Jangid",
        craft: "Stone Carving",
        location: "Hampi, Karnataka",
        image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=300&q=80",
        story: "Third-generation stone carver preserving Vijayanagara sculptural traditions.",
        workshopAvailable: true,
        rating: 4.9,
    },
    {
        id: "2",
        name: "Fatima Ben",
        craft: "Block Printing",
        location: "Jaipur, Rajasthan",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&q=80",
        story: "Master block printer creating traditional Rajasthani textile designs.",
        workshopAvailable: true,
        rating: 4.8,
    },
    {
        id: "3",
        name: "Lakshmi Devi",
        craft: "Terracotta Pottery",
        location: "Khurja, UP",
        image: "https://images.unsplash.com/photo-1564294636501-be9877b18f68?w=300&q=80",
        story: "Keeping alive the ancient tradition of hand-thrown terracotta pottery.",
        workshopAvailable: false,
        rating: 4.7,
    },
];

// Sample Guide Data
const GUIDES = [
    {
        id: "1",
        name: "Suresh Kumar",
        location: "Hampi",
        languages: ["English", "Hindi", "Kannada"],
        expertise: ["Architecture", "History", "Photography"],
        pricePerDay: 2500,
        rating: 4.9,
        reviewCount: 156,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    },
    {
        id: "2",
        name: "Priya Sharma",
        location: "Varanasi",
        languages: ["English", "Hindi", "Sanskrit"],
        expertise: ["Spirituality", "Culture", "Local Food"],
        pricePerDay: 2000,
        rating: 4.8,
        reviewCount: 98,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    },
];

export default function CommunityPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 md:py-28 bg-gradient-to-b from-[var(--neutral-900)] to-[var(--neutral-800)] overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--heritage-gold)]/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--nature-teal)]/10 rounded-full blur-3xl" />
                    </div>

                    <div className="container-custom relative z-10">
                        <div className="max-w-3xl">
                            <span className="badge badge-heritage mb-4">Community Tourism</span>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                                Travel That <span className="text-gradient-heritage">Empowers</span> Communities
                            </h1>
                            <p className="text-xl text-white/70 mb-8 leading-relaxed">
                                Connect with village communities, learn traditional crafts from local artisans,
                                and experience authentic homestays. Every visit directly benefits the people
                                who preserve our cultural heritage.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#villages" className="btn-primary">
                                    <Home className="w-5 h-5" />
                                    Explore Villages
                                </a>
                                <a href="#artisans" className="btn-secondary text-white border-white/30 hover:border-white">
                                    <Palette className="w-5 h-5" />
                                    Meet Artisans
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-12 bg-[var(--bg-card)] border-b border-[var(--border-light)]">
                    <div className="container-custom">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: "15+", label: "Partner Villages", icon: Home },
                                { value: "100+", label: "Local Artisans", icon: Palette },
                                { value: "50+", label: "Verified Guides", icon: Users },
                                { value: "500+", label: "Happy Travelers", icon: Heart },
                            ].map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={stat.label} className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Icon className="w-5 h-5 text-[var(--heritage-gold)]" />
                                            <span className="text-3xl font-bold">{stat.value}</span>
                                        </div>
                                        <span className="text-sm text-[var(--text-secondary)]">{stat.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CBT Villages Section */}
                <section id="villages" className="section-padding bg-[var(--bg-primary)]">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                            <div>
                                <span className="badge badge-nature mb-3">Village Tourism</span>
                                <h2 className="text-3xl font-heading font-bold">Community Villages</h2>
                                <p className="text-[var(--text-secondary)] mt-2 max-w-xl">
                                    Experience authentic rural India through our community-based tourism partners
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {VILLAGES.map((village, index) => (
                                <Link
                                    key={village.id}
                                    href={`/community/${village.slug}`}
                                    className="group flex flex-col md:flex-row bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)] overflow-hidden hover:shadow-[var(--shadow-xl)] transition-all animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                                        <img
                                            src={village.image}
                                            alt={village.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="md:w-3/5 p-6">
                                        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-2">
                                            <MapPin className="w-4 h-4" />
                                            {village.location}
                                        </div>
                                        <h3 className="text-xl font-heading font-bold mb-1 group-hover:text-[var(--heritage-gold)] transition-colors">
                                            {village.name}
                                        </h3>
                                        <p className="text-sm text-[var(--heritage-gold)] mb-3">{village.tagline}</p>
                                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                                            {village.description}
                                        </p>

                                        {/* Experiences */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {village.experiences.map((exp) => (
                                                <span
                                                    key={exp}
                                                    className="px-2 py-1 bg-[var(--bg-secondary)] rounded-full text-xs"
                                                >
                                                    {exp}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
                                            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                                                <span className="flex items-center gap-1">
                                                    <Home className="w-4 h-4" /> {village.homestays} homestays
                                                </span>
                                                <span>{village.priceRange}/night</span>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--heritage-gold)] group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Artisans Section */}
                <section id="artisans" className="section-padding bg-[var(--bg-secondary)]">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                            <div>
                                <span className="badge badge-heritage mb-3">Local Crafts</span>
                                <h2 className="text-3xl font-heading font-bold">Meet Local Artisans</h2>
                                <p className="text-[var(--text-secondary)] mt-2 max-w-xl">
                                    Learn traditional crafts directly from master artisans and support their livelihoods
                                </p>
                            </div>
                            <Link href="/artisans" className="btn-ghost text-[var(--heritage-gold)]">
                                View All Artisans
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {ARTISANS.map((artisan, index) => (
                                <div
                                    key={artisan.id}
                                    className="bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)] overflow-hidden hover:shadow-[var(--shadow-lg)] transition-all animate-slide-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={artisan.image}
                                            alt={artisan.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {artisan.workshopAvailable && (
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-[var(--success)] text-white text-xs font-medium rounded-full">
                                                Workshop Available
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="badge badge-heritage">{artisan.craft}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-[var(--heritage-gold)] fill-[var(--heritage-gold)]" />
                                                <span className="text-sm font-medium">{artisan.rating}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-1">{artisan.name}</h3>
                                        <p className="text-sm text-[var(--text-muted)] flex items-center gap-1 mb-3">
                                            <MapPin className="w-3 h-3" /> {artisan.location}
                                        </p>
                                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                                            {artisan.story}
                                        </p>
                                        <button className="w-full btn-secondary py-2 text-sm">
                                            <MessageCircle className="w-4 h-4" />
                                            Enquire Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Guides Section */}
                <section id="guides" className="section-padding bg-[var(--bg-primary)]">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                            <div>
                                <span className="badge badge-nature mb-3">Local Expertise</span>
                                <h2 className="text-3xl font-heading font-bold">Hire a Local Guide</h2>
                                <p className="text-[var(--text-secondary)] mt-2 max-w-xl">
                                    Explore heritage sites with knowledgeable local guides who bring history to life
                                </p>
                            </div>
                            <Link href="/guides" className="btn-ghost text-[var(--heritage-gold)]">
                                View All Guides
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {GUIDES.map((guide, index) => (
                                <div
                                    key={guide.id}
                                    className="flex gap-4 p-5 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all animate-slide-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={guide.image}
                                            alt={guide.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold">{guide.name}</h3>
                                                <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {guide.location}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-[var(--heritage-gold)] fill-[var(--heritage-gold)]" />
                                                <span className="text-sm font-medium">{guide.rating}</span>
                                                <span className="text-xs text-[var(--text-muted)]">({guide.reviewCount})</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-1">
                                            {guide.expertise.map((exp) => (
                                                <span
                                                    key={exp}
                                                    className="px-2 py-0.5 bg-[var(--bg-secondary)] rounded text-xs"
                                                >
                                                    {exp}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="text-sm">
                                                <span className="text-[var(--text-muted)]">Languages: </span>
                                                <span>{guide.languages.join(", ")}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-[var(--heritage-gold)]">
                                                    {formatCurrency(guide.pricePerDay)}
                                                </p>
                                                <p className="text-xs text-[var(--text-muted)]">per day</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-heritage relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                        />
                    </div>

                    <div className="container-custom relative z-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                            Join Our Community Tourism Network
                        </h2>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                            Are you a village community, artisan, or local guide?
                            Partner with us to reach conscious travelers from around the world.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="px-8 py-4 bg-white text-[var(--heritage-bronze)] rounded-xl font-semibold hover:bg-white/90 transition-colors">
                                <Users className="w-5 h-5 inline mr-2" />
                                Register as Partner
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                                <Phone className="w-5 h-5 inline mr-2" />
                                Contact Us
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
