import Link from "next/link";
import Image from "next/image";
import {
    MapPin,
    Compass,
    Users,
    Calendar,
    Star,
    ArrowRight,
    Clock,
    Heart,
    Shield,
    Sparkles,
    Mountain,
    TreePine
} from "lucide-react";

// Hero Section
function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--neutral-900)] to-[var(--neutral-800)]">
                <div className="absolute inset-0 opacity-30">
                    <div
                        className="absolute inset-0 opacity-10"
                    />
                </div>
                {/* Animated gradient orbs */}
                <div className="absolute top-20 left-20 w-96 h-96 bg-[var(--heritage-gold)]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--nature-teal)]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container-custom relative z-10 text-center py-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-8 animate-fade-in">
                    <Sparkles className="w-4 h-4 text-[var(--heritage-gold)]" />
                    <span>Aligned with SDG 8 & SDG 11 • Sustainable Tourism</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight animate-slide-up">
                    Discover India&apos;s
                    <span className="block text-gradient-heritage">Sacred Heritage</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 animate-slide-up stagger-1">
                    Explore ancient wonders, connect with local communities, and travel responsibly
                    with AI-powered heritage intelligence
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
                    <Link href="/explore" className="btn-primary text-lg px-8 py-4">
                        <Compass className="w-5 h-5" />
                        Explore Map
                    </Link>
                    <Link href="/destinations" className="btn-secondary text-lg px-8 py-4 text-white border-white/30 hover:border-white hover:text-white">
                        <MapPin className="w-5 h-5" />
                        View Destinations
                    </Link>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up stagger-3">
                    {[
                        { value: "50+", label: "Heritage Sites", icon: Mountain },
                        { value: "12", label: "Heritage Trails", icon: TreePine },
                        { value: "100+", label: "Local Artisans", icon: Heart },
                        { value: "25+", label: "Local Guides", icon: Users },
                    ].map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Icon className="w-5 h-5 text-[var(--heritage-gold)]" />
                                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                                </div>
                                <span className="text-sm text-white/60">{stat.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
}

// Featured Destinations Section
function FeaturedDestinations() {
    const destinations = [
        {
            name: "Kaziranga",
            slug: "kaziranga",
            tagline: "Home of the One-Horned Rhino",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/One_horn_Rhinoceros_at_Kaziranga_national_park.jpg/1280px-One_horn_Rhinoceros_at_Kaziranga_national_park.jpg",
            pois: 12,
            trails: 4,
        },
        {
            name: "Majuli",
            slug: "majuli",
            tagline: "World's Largest River Island",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kamalabari_Satra%2C_Majuli.jpg/1280px-Kamalabari_Satra%2C_Majuli.jpg",
            pois: 15,
            trails: 3,
        },
        {
            name: "Sivasagar",
            slug: "sivasagar",
            tagline: "Heart of Ahom Heritage",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rang_Ghar%2C_Sivasagar.jpg/1280px-Rang_Ghar%2C_Sivasagar.jpg",
            pois: 18,
            trails: 5,
        },
    ];

    return (
        <section className="section-padding bg-[var(--bg-primary)]">
            <div className="container-custom">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <span className="badge badge-heritage mb-3">Featured</span>
                        <h2 className="text-4xl font-heading font-bold">Explore Assam</h2>
                        <p className="text-[var(--text-secondary)] mt-2 max-w-xl">
                            Discover UNESCO World Heritage Sites, hidden gems, and vibrant cultures of Northeast India
                        </p>
                    </div>
                    <Link
                        href="/destinations"
                        className="btn-ghost text-[var(--heritage-gold)] hover:text-[var(--heritage-bronze)]"
                    >
                        View All Destinations
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Destination Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {destinations.map((dest, index) => (
                        <Link
                            key={dest.slug}
                            href={`/destinations/${dest.slug}`}
                            className="group heritage-card animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-sm text-white/80 mb-1">{dest.tagline}</p>
                                    <h3 className="text-2xl font-heading font-bold text-white">{dest.name}</h3>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> {dest.pois} Sites
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Compass className="w-4 h-4" /> {dest.trails} Trails
                                    </span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--heritage-gold)] group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Features Section
function FeaturesSection() {
    const features = [
        {
            icon: Compass,
            title: "Heritage Mapping",
            description: "Interactive maps with 50+ heritage sites, cultural POIs, and thematic walking trails",
        },
        {
            icon: Calendar,
            title: "Smart Trip Planning",
            description: "AI-powered itineraries based on your interests, time, and travel style",
        },
        {
            icon: Users,
            title: "Community Tourism",
            description: "Connect with local artisans, guides, and village homestays for authentic experiences",
        },
        {
            icon: Shield,
            title: "Responsible Travel",
            description: "Cultural etiquette guides, safety tips, and sustainable tourism practices",
        },
        {
            icon: Star,
            title: "Local Insights",
            description: "Seasonality calendars, festival dates, and insider recommendations",
        },
        {
            icon: Sparkles,
            title: "AI Assistant",
            description: "Get instant answers about heritage, culture, and travel logistics",
        },
    ];

    return (
        <section className="section-padding bg-[var(--bg-secondary)]">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="badge badge-nature mb-3">Platform Features</span>
                    <h2 className="text-4xl font-heading font-bold mb-4">
                        Everything for Mindful Travel
                    </h2>
                    <p className="text-[var(--text-secondary)]">
                        From discovery to navigation, we help you explore India&apos;s heritage
                        while supporting local communities
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 animate-slide-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-heritage flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Community Section
function CommunitySection() {
    return (
        <section className="section-padding bg-[var(--bg-primary)] overflow-hidden">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div>
                        <span className="badge badge-heritage mb-3">Community Tourism</span>
                        <h2 className="text-4xl font-heading font-bold mb-6">
                            Travel That Empowers Local Communities
                        </h2>
                        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                            Our Community-Based Tourism (CBT) initiative connects travelers with
                            village communities, local artisans, and authentic homestay experiences.
                            Every visit directly benefits the people who preserve our cultural heritage.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                "Village homestays with traditional hosts",
                                "Artisan workshops and craft demonstrations",
                                "Local guides with deep cultural knowledge",
                                "Transparent pricing and community benefit sharing",
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[var(--success)]/20 flex items-center justify-center">
                                        <span className="text-[var(--success)] text-sm">✓</span>
                                    </div>
                                    <span className="text-[var(--text-primary)]">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/community" className="btn-primary">
                            <Users className="w-5 h-5" />
                            Explore Community Tourism
                        </Link>
                    </div>

                    {/* Image Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="rounded-2xl overflow-hidden h-48">
                                    <img
                                        src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80"
                                        alt="Local artisan"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden h-64">
                                    <img
                                        src="https://images.unsplash.com/photo-1545043059-438f9b8f9aa8?w=400&q=80"
                                        alt="Village homestay"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="rounded-2xl overflow-hidden h-64">
                                    <img
                                        src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=400&q=80"
                                        alt="Cultural experience"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden h-48">
                                    <img
                                        src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80"
                                        alt="Heritage craft"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-heritage rounded-2xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// CTA Section
function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-r from-[var(--neutral-900)] to-[var(--neutral-800)] relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--heritage-gold)]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--nature-teal)]/10 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                    Ready to Explore India&apos;s Heritage?
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                    Start your journey today. Discover ancient wonders, support local communities,
                    and travel with purpose.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/explore" className="btn-primary text-lg px-8 py-4">
                        <Compass className="w-5 h-5" />
                        Start Exploring
                    </Link>
                    <Link href="/ai-trip-planner" className="btn-ghost text-white hover:bg-white/10 text-lg px-8 py-4">
                        <Sparkles className="w-5 h-5" />
                        AI Trip Planner
                    </Link>
                </div>
            </div>
        </section>
    );
}

// Main Page Component
export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <FeaturedDestinations />
            <FeaturesSection />
            <CommunitySection />
            <CTASection />
        </main>
    );
}
