import { Header, Footer } from "@/components/ui/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import Link from "next/link";
import {
    BookOpen,
    Calendar,
    MapPin,
    User,
    Clock,
    Heart,
    MessageCircle,
    Search,
    Filter,
    ArrowRight
} from "lucide-react";

// Sample Articles Data
const ARTICLES = [
    {
        id: "1",
        title: "A Week in Hampi: Exploring the Forgotten Empire",
        slug: "week-in-hampi-exploring-forgotten-empire",
        excerpt: "My journey through the boulder-strewn ruins of Vijayanagara, discovering hidden temples and sunset viewpoints that most tourists miss.",
        coverImage: "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=800&q=80",
        author: {
            name: "Ananya Rao",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        },
        destination: "Hampi",
        travelDate: "December 2023",
        readTime: 8,
        likes: 234,
        comments: 45,
        tags: ["Heritage", "Solo Travel", "Photography"],
        isFeatured: true,
    },
    {
        id: "2",
        title: "The Living Culture of Varanasi",
        slug: "living-culture-varanasi",
        excerpt: "Witnessing the eternal cycle of life and death along the ghats of the world's oldest continuously inhabited city.",
        coverImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        author: {
            name: "Rahul Mehta",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        },
        destination: "Varanasi",
        travelDate: "January 2024",
        readTime: 12,
        likes: 189,
        comments: 32,
        tags: ["Culture", "Spirituality", "Food"],
        isFeatured: true,
    },
    {
        id: "3",
        title: "Budget Guide to Rajasthan's Royal Trail",
        slug: "budget-guide-rajasthan-royal-trail",
        excerpt: "How I explored Jaipur, Jodhpur, and Udaipur in 10 days without breaking the bank.",
        coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        author: {
            name: "Priya Singh",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        },
        destination: "Rajasthan",
        travelDate: "November 2023",
        readTime: 15,
        likes: 456,
        comments: 78,
        tags: ["Budget", "Forts", "Desert"],
        isFeatured: false,
    },
    {
        id: "4",
        title: "Khajuraho: Beyond the Famous Sculptures",
        slug: "khajuraho-beyond-famous-sculptures",
        excerpt: "There's more to Khajuraho than the erotic sculptures - a deep dive into Chandela architecture and the surrounding villages.",
        coverImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
        author: {
            name: "Vikram Desai",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
        },
        destination: "Khajuraho",
        travelDate: "October 2023",
        readTime: 10,
        likes: 167,
        comments: 23,
        tags: ["Architecture", "History", "Off-beat"],
        isFeatured: false,
    },
    {
        id: "5",
        title: "A Homestay Experience in Rural Karnataka",
        slug: "homestay-experience-rural-karnataka",
        excerpt: "Living with a local family in Anegundi village, learning to cook Kannadiga cuisine, and understanding sustainable tourism.",
        coverImage: "https://images.unsplash.com/photo-1545043059-438f9b8f9aa8?w=800&q=80",
        author: {
            name: "Meera Krishnan",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
        },
        destination: "Karnataka",
        travelDate: "February 2024",
        readTime: 7,
        likes: 312,
        comments: 56,
        tags: ["Homestay", "Community", "Food"],
        isFeatured: false,
    },
];

const TAGS = ["All", "Heritage", "Culture", "Budget", "Solo Travel", "Food", "Photography", "Off-beat", "Community"];

export default function StoriesPage() {
    const featuredArticles = ARTICLES.filter((a) => a.isFeatured);
    const regularArticles = ARTICLES.filter((a) => !a.isFeatured);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[var(--header-height)]">
                {/* Hero Section */}
                <section className="py-16 md:py-20 bg-gradient-to-b from-[var(--neutral-900)] to-[var(--neutral-800)]">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <span className="badge badge-heritage mb-4">Travel Stories</span>
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                                Stories from the Road
                            </h1>
                            <p className="text-xl text-white/70 mb-8">
                                Real experiences from travelers exploring India&apos;s heritage.
                                Get inspired, learn from others, and share your own journey.
                            </p>

                            {/* Search */}
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                    <input
                                        type="text"
                                        placeholder="Search stories..."
                                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--heritage-gold)]"
                                    />
                                </div>
                                <button className="px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors">
                                    <Filter className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tags */}
                <section className="py-6 bg-[var(--bg-card)] border-b border-[var(--border-light)] sticky top-[var(--header-height)] z-10">
                    <div className="container-custom">
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                            {TAGS.map((tag) => (
                                <button
                                    key={tag}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${tag === "All"
                                            ? "bg-gradient-heritage text-white"
                                            : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-light)]"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Stories */}
                <section className="section-padding bg-[var(--bg-primary)]">
                    <div className="container-custom">
                        <h2 className="text-2xl font-heading font-bold mb-8">Featured Stories</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredArticles.map((article, index) => (
                                <Link
                                    key={article.id}
                                    href={`/stories/${article.slug}`}
                                    className="group heritage-card animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={article.coverImage}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Tags */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {article.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Destination */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="text-sm text-white/80 flex items-center gap-1 mb-2">
                                                <MapPin className="w-3 h-3" /> {article.destination}
                                            </p>
                                            <h3 className="text-xl font-heading font-bold text-white line-clamp-2 group-hover:text-[var(--heritage-gold)] transition-colors">
                                                {article.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={article.author.avatar}
                                                    alt={article.author.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium">{article.author.name}</p>
                                                    <p className="text-xs text-[var(--text-muted)]">{article.travelDate}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {article.readTime} min
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Heart className="w-3 h-3" /> {article.likes}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* All Stories */}
                <section className="section-padding bg-[var(--bg-secondary)]">
                    <div className="container-custom">
                        <h2 className="text-2xl font-heading font-bold mb-8">Latest Stories</h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {regularArticles.map((article, index) => (
                                <Link
                                    key={article.id}
                                    href={`/stories/${article.slug}`}
                                    className="group bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-sm)] overflow-hidden hover:shadow-[var(--shadow-lg)] transition-all animate-slide-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={article.coverImage}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-full text-xs font-medium">
                                            <MapPin className="w-3 h-3 inline mr-1" />
                                            {article.destination}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-[var(--heritage-gold)] transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={article.author.avatar}
                                                    alt={article.author.name}
                                                    className="w-6 h-6 rounded-full object-cover"
                                                />
                                                <span className="text-xs text-[var(--text-muted)]">{article.author.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                                                <span className="flex items-center gap-0.5">
                                                    <Heart className="w-3 h-3" /> {article.likes}
                                                </span>
                                                <span className="flex items-center gap-0.5">
                                                    <MessageCircle className="w-3 h-3" /> {article.comments}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-12">
                            <button className="btn-secondary">
                                Load More Stories
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Write CTA */}
                <section className="py-16 bg-gradient-heritage">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-heading font-bold text-white mb-4">
                            Share Your Travel Story
                        </h2>
                        <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                            Inspire fellow travelers with your heritage journey.
                            Write about your experiences and help others discover India&apos;s cultural treasures.
                        </p>
                        <button className="px-8 py-4 bg-white text-[var(--heritage-bronze)] rounded-xl font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Start Writing
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
