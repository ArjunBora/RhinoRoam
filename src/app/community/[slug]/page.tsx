import { Header, Footer } from "@/components/ui/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import Link from "next/link";
import {
    MapPin,
    Home,
    Utensils,
    Palette,
    Compass,
    Phone,
    MessageCircle,
    Mail,
    Calendar,
    Clock,
    Users,
    Star,
    ChevronRight,
    ArrowRight,
    Heart,
    Camera
} from "lucide-react";
import { cn, formatCurrency, formatDuration } from "@/lib/utils";

// Sample CBT Village Data
const VILLAGE = {
    id: "1",
    name: "Anegundi",
    slug: "anegundi",
    tagline: "Birthplace of Mythology",
    destinationId: "hampi",
    destinationName: "Hampi",
    story: `Anegundi is a living heritage village across the Tungabhadra River from Hampi, believed to be the legendary Kishkindha from the epic Ramayana. This is where the monkey king Sugriva is said to have held court and where Hanuman was born.

Unlike Hampi, which lies in picturesque ruins, Anegundi continues to thrive as a village, preserving traditions that date back centuries. Walking through its narrow lanes, you'll encounter ancient temples still in daily worship, traditional homes with intricate carvings, and artisans practicing crafts passed down through generations.

The village has pioneered community-based tourism in India, with local families opening their traditional homes to travelers. Every visit here directly benefits the community while offering guests an authentic glimpse into rural Karnataka life that has remained largely unchanged for centuries.`,
    culture: `The culture of Anegundi is a beautiful tapestry of Hindu traditions, agrarian practices, and artistic heritage. The village is known for its banana fiber craft, where local women weave beautiful products from the fiber of banana trees – a sustainable practice that provides livelihood while protecting the environment.

Traditional music and dance are integral to life here, especially during festivals. The Pampa River (Tungabhadra) is considered sacred, and ritual bathing is a morning tradition. Village elders gather in the evenings at the ancient temple precinct, sharing stories of the Ramayana that are believed to have unfolded in these very hills.`,
    latitude: 15.3489,
    longitude: 76.4845,
    images: [
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80",
        "https://images.unsplash.com/photo-1545043059-438f9b8f9aa8?w=800&q=80",
        "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    ],
    festivals: [
        {
            name: "Hampi Utsav",
            month: "November",
            description: "The grandest festival in the region, celebrating the rich heritage of Vijayanagara through dance, music, puppet shows, and craft exhibitions. Anegundi hosts traditional performances during this time.",
        },
        {
            name: "Virupaksha Temple Car Festival",
            month: "February",
            description: "During Maha Shivaratri, a massive wooden chariot carrying the deity is pulled through Hampi Bazaar. Villagers from Anegundi cross the river to participate in this sacred procession.",
        },
        {
            name: "Pongal / Sankranti",
            month: "January",
            description: "The harvest festival is celebrated with great enthusiasm. Homes are decorated with rangoli, cattle are honored, and special dishes are prepared using the new harvest.",
        },
    ],
    homestays: [
        {
            name: "Uramma Heritage Homes",
            capacity: 4,
            pricePerNight: 1500,
            description: "Beautiful restored heritage home with traditional courtyard. Experience authentic village hospitality with home-cooked meals.",
            amenities: ["Traditional Architecture", "Home Cooking", "Courtyard", "Hot Water"],
            contact: "+91-9876543212",
            rating: 4.8,
        },
        {
            name: "Kishkinda Trust Homestay",
            capacity: 6,
            pricePerNight: 1200,
            description: "Run by the Kishkinda Trust, this homestay supports local community development. Stunning river views and morning yoga sessions.",
            amenities: ["River View", "Village Tours", "Craft Workshops", "Yoga"],
            contact: "+91-9876543213",
            rating: 4.7,
        },
        {
            name: "Farmer's Pride Homestay",
            capacity: 4,
            pricePerNight: 800,
            description: "Stay with a local farming family. Participate in daily farm activities and enjoy organic, farm-fresh meals.",
            amenities: ["Farm Experience", "Organic Food", "Bicycle Available"],
            contact: "+91-9876543214",
            rating: 4.6,
        },
    ],
    foodOptions: [
        {
            name: "Traditional Karnataka Breakfast",
            type: "veg",
            price: 150,
            description: "Idli, vada, dosa with varieties of chutneys, sambar, and filter coffee. Prepared fresh each morning by village hosts.",
        },
        {
            name: "Thali Lunch",
            type: "veg",
            price: 200,
            description: "Complete meal with rice, sambar, rasam, dry vegetables, buttermilk (majjige), pickles, papad, and payasam for dessert.",
        },
        {
            name: "Evening Snacks",
            type: "veg",
            price: 100,
            description: "Local specialties like Jolada Rotti (millet bread) with chutney, bajji (fritters), or kesari (sweet).",
        },
    ],
    workshops: [
        {
            name: "Banana Fiber Craft",
            craft: "Eco-Craft",
            duration: 120,
            price: 500,
            description: "Learn the art of creating bags, coasters, and decorative items from banana fiber. Take home your own creation!",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80",
        },
        {
            name: "Traditional Pottery",
            craft: "Pottery",
            duration: 90,
            price: 400,
            description: "Try your hand at the potter's wheel with guidance from master craftsmen. Create a clay pot or lamp to take home.",
            image: "https://images.unsplash.com/photo-1564294636501-be9877b18f68?w=400&q=80",
        },
        {
            name: "Rangoli & Kolam Art",
            craft: "Folk Art",
            duration: 60,
            price: 300,
            description: "Learn to create traditional floor patterns using rice flour and natural colors. Perfect morning activity.",
            image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=400&q=80",
        },
    ],
    tours: [
        {
            name: "Coracle Ride & Cave Paintings",
            description: "Cross the Tungabhadra in traditional coracles (round boats) to see prehistoric cave paintings in the nearby hills. Includes local guide and refreshments.",
            duration: 180,
            price: 500,
            highlights: ["Coracle ride", "Neolithic paintings", "Village walk", "Guide included"],
        },
        {
            name: "Village Heritage Walk",
            description: "Walking tour through ancient temples, stepwells, traditional homes, and artisan workshops. Meet local families and learn about daily life.",
            duration: 120,
            price: 300,
            highlights: ["Ancient temples", "Traditional homes", "Meet artisans", "Tea break"],
        },
        {
            name: "Sunrise Trek to Anjanadri Hill",
            description: "Trek to the birthplace of Hanuman for a spectacular sunrise over the boulder landscape. Includes temple visit and breakfast.",
            duration: 240,
            price: 400,
            highlights: ["Sunrise views", "Temple visit", "Breakfast included", "Photo stops"],
        },
    ],
    contactEmail: "info@anegundi-tourism.org",
    contactWhatsapp: "+91-9876543214",
    contactPhone: "+91-9876543214",
};

export default function CBTVillageDetailPage({ params }: { params: { slug: string } }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[var(--header-height)]">
                {/* Hero */}
                <section className="relative h-[60vh]">
                    <img
                        src={VILLAGE.images[0]}
                        alt={VILLAGE.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="container-custom">
                            <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
                                <Link href="/community" className="hover:text-white">Community</Link>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-white">{VILLAGE.name}</span>
                            </nav>
                            <span className="badge badge-nature mb-4">Community Village</span>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">
                                {VILLAGE.name}
                            </h1>
                            <p className="text-xl text-white/80 mb-4">{VILLAGE.tagline}</p>
                            <div className="flex items-center gap-4 text-sm text-white/70">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> Near {VILLAGE.destinationName}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Home className="w-4 h-4" /> {VILLAGE.homestays.length} Homestays
                                </span>
                                <span className="flex items-center gap-1">
                                    <Palette className="w-4 h-4" /> {VILLAGE.workshops.length} Workshops
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Contact Bar */}
                <section className="bg-gradient-heritage py-4">
                    <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-white text-center md:text-left">
                            <p className="font-medium">Ready to experience Anegundi?</p>
                            <p className="text-sm text-white/80">Contact us for bookings and inquiries</p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href={`https://wa.me/${VILLAGE.contactWhatsapp?.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                                WhatsApp
                            </a>
                            <a
                                href={`tel:${VILLAGE.contactPhone}`}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                            <a
                                href={`mailto:${VILLAGE.contactEmail}`}
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-[var(--heritage-bronze)] hover:bg-white/90 transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                                Email
                            </a>
                        </div>
                    </div>
                </section>

                {/* Story & Culture */}
                <section className="section-padding bg-[var(--bg-primary)]">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-heading font-bold mb-6">Our Story</h2>
                                <div className="prose prose-lg text-[var(--text-secondary)]">
                                    {VILLAGE.story.split('\n\n').map((para, i) => (
                                        <p key={i} className="mb-4 leading-relaxed">{para}</p>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-heading font-bold mb-6">Culture & Traditions</h2>
                                <div className="prose prose-lg text-[var(--text-secondary)]">
                                    {VILLAGE.culture.split('\n\n').map((para, i) => (
                                        <p key={i} className="mb-4 leading-relaxed">{para}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Photo Gallery */}
                <section className="py-12 bg-[var(--bg-secondary)]">
                    <div className="container-custom">
                        <div className="grid grid-cols-4 gap-4">
                            {VILLAGE.images.map((img, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "rounded-xl overflow-hidden",
                                        i === 0 && "col-span-2 row-span-2"
                                    )}
                                >
                                    <img
                                        src={img}
                                        alt={`${VILLAGE.name} - ${i + 1}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Homestays */}
                <section className="section-padding bg-[var(--bg-primary)]" id="homestays">
                    <div className="container-custom">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="badge badge-heritage mb-3">Stay with Locals</span>
                            <h2 className="text-3xl font-heading font-bold mb-4">Community Homestays</h2>
                            <p className="text-[var(--text-secondary)]">
                                Experience authentic village hospitality. Stay with local families in traditional homes
                                and enjoy home-cooked meals.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {VILLAGE.homestays.map((homestay, i) => (
                                <div key={i} className="heritage-card">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-lg">{homestay.name}</h3>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Star className="w-4 h-4 text-[var(--heritage-gold)] fill-[var(--heritage-gold)]" />
                                                    <span className="text-sm font-medium">{homestay.rating}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-[var(--heritage-gold)]">
                                                    {formatCurrency(homestay.pricePerNight)}
                                                </p>
                                                <p className="text-xs text-[var(--text-muted)]">per night</p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                                            {homestay.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {homestay.amenities.map((amenity) => (
                                                <span
                                                    key={amenity}
                                                    className="px-2 py-1 bg-[var(--bg-secondary)] rounded-full text-xs"
                                                >
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
                                            <span className="text-sm text-[var(--text-muted)]">
                                                <Users className="w-4 h-4 inline mr-1" />
                                                Up to {homestay.capacity} guests
                                            </span>
                                            <a
                                                href={`https://wa.me/${homestay.contact.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-[var(--heritage-gold)] hover:underline"
                                            >
                                                Book Now →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Workshops */}
                <section className="section-padding bg-[var(--bg-secondary)]" id="workshops">
                    <div className="container-custom">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="badge badge-nature mb-3">Learn & Create</span>
                            <h2 className="text-3xl font-heading font-bold mb-4">Craft Workshops</h2>
                            <p className="text-[var(--text-secondary)]">
                                Learn traditional crafts directly from local artisans. Take home your own handmade creation.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {VILLAGE.workshops.map((workshop, i) => (
                                <div key={i} className="bg-[var(--bg-card)] rounded-2xl overflow-hidden shadow-[var(--shadow-md)]">
                                    <div className="h-48 relative">
                                        <img
                                            src={workshop.image}
                                            alt={workshop.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 left-3 badge badge-heritage">
                                            {workshop.craft}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-semibold text-lg mb-2">{workshop.name}</h3>
                                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                                            {workshop.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" /> {formatDuration(workshop.duration)}
                                                </span>
                                                <span className="font-medium text-[var(--heritage-gold)]">
                                                    {formatCurrency(workshop.price)}
                                                </span>
                                            </div>
                                            <button className="text-sm font-medium text-[var(--heritage-gold)] hover:underline">
                                                Book →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tours */}
                <section className="section-padding bg-[var(--bg-primary)]" id="tours">
                    <div className="container-custom">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="badge badge-heritage mb-3">Guided Experiences</span>
                            <h2 className="text-3xl font-heading font-bold mb-4">Village Tours</h2>
                            <p className="text-[var(--text-secondary)]">
                                Explore the area with knowledgeable local guides who bring stories and history to life.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {VILLAGE.tours.map((tour, i) => (
                                <div key={i} className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
                                            <p className="text-sm text-[var(--text-secondary)] mb-3">{tour.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {tour.highlights.map((h) => (
                                                    <span key={h} className="px-2 py-1 bg-[var(--bg-secondary)] rounded-full text-xs">
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-[var(--heritage-gold)]">
                                                    {formatCurrency(tour.price)}
                                                </p>
                                                <p className="text-xs text-[var(--text-muted)]">per person</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-medium">{formatDuration(tour.duration)}</p>
                                                <p className="text-xs text-[var(--text-muted)]">duration</p>
                                            </div>
                                            <button className="btn-primary">
                                                Book Tour
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Festivals */}
                <section className="section-padding bg-[var(--bg-secondary)]">
                    <div className="container-custom">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="badge badge-nature mb-3">Cultural Calendar</span>
                            <h2 className="text-3xl font-heading font-bold mb-4">Festivals & Events</h2>
                            <p className="text-[var(--text-secondary)]">
                                Plan your visit around these vibrant celebrations to experience local culture at its best.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {VILLAGE.festivals.map((festival, i) => (
                                <div key={i} className="p-6 bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)]">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calendar className="w-5 h-5 text-[var(--heritage-gold)]" />
                                        <span className="font-medium text-[var(--heritage-gold)]">{festival.month}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{festival.name}</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">{festival.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Location */}
                <section className="section-padding bg-[var(--bg-primary)]">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl font-heading font-bold mb-6">How to Reach</h2>
                                <div className="space-y-4 text-[var(--text-secondary)]">
                                    <p>
                                        <strong className="text-[var(--text-primary)]">From Hampi:</strong><br />
                                        Take a coracle (traditional round boat) across the Tungabhadra River from near
                                        Virupaksha Temple. The crossing takes about 5 minutes and costs ₹20-50.
                                    </p>
                                    <p>
                                        <strong className="text-[var(--text-primary)]">From Hospet:</strong><br />
                                        Auto-rickshaw or taxi to Anegundi takes about 30 minutes and costs ₹300-400.
                                    </p>
                                    <p>
                                        <strong className="text-[var(--text-primary)]">By Road:</strong><br />
                                        The village is accessible by road via Gangavati, approximately 12 km from Hampi.
                                    </p>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${VILLAGE.latitude},${VILLAGE.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary mt-6"
                                >
                                    <MapPin className="w-5 h-5" />
                                    Get Directions
                                </a>
                            </div>
                            <InteractiveMap
                                className="h-80 rounded-2xl"
                                initialCenter={[VILLAGE.longitude, VILLAGE.latitude]}
                                initialZoom={13}
                                markers={[
                                    {
                                        id: VILLAGE.id,
                                        name: VILLAGE.name,
                                        latitude: VILLAGE.latitude,
                                        longitude: VILLAGE.longitude,
                                        type: "village",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
