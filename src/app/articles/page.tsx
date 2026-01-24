'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft, Search, Clock,
    Heart, MessageCircle, Bookmark, Eye,
    PenLine
} from 'lucide-react';

/* ============================================
   ARTICLES / TRAVEL BLOG PAGE
   User-Generated Travel Content
   ============================================ */

// Categories
const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'itinerary', label: 'Itineraries' },
    { id: 'guide', label: 'Travel Guides' },
    { id: 'culture', label: 'Culture & Heritage' },
    { id: 'wildlife', label: 'Wildlife & Nature' },
    { id: 'food', label: 'Food & Cuisine' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'tips', label: 'Travel Tips' },
];

// Sample Articles
const articles = [
    {
        id: '1',
        title: '7 Days in Assam: The Ultimate First-Timer\'s Itinerary',
        slug: '7-days-assam-itinerary',
        excerpt: 'From the rhinos of Kaziranga to the monks of Majuli, here\'s everything you need to know for the perfect week in Assam.',
        category: 'itinerary',
        coverImage: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=800&q=80',
        author: {
            name: 'Priya Sharma',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        },
        publishedAt: '2026-01-15',
        readTime: '12 min read',
        views: 4520,
        likes: 234,
        comments: 45,
        tags: ['First Visit', 'Wildlife', 'Culture', 'Week Trip'],
        season: 'November',
        budget: '₹35,000',
        featured: true,
    },
    {
        id: '2',
        title: 'Majuli Island: A Photographer\'s Paradise',
        slug: 'majuli-photography-guide',
        excerpt: 'Discover the best spots, times, and techniques for capturing the beauty of the world\'s largest river island.',
        category: 'guide',
        coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
        author: {
            name: 'Rahul Borah',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        },
        publishedAt: '2026-01-10',
        readTime: '8 min read',
        views: 2890,
        likes: 189,
        comments: 32,
        tags: ['Photography', 'Majuli', 'Satras'],
        season: 'October-March',
        budget: '₹8,000',
        featured: true,
    },
    {
        id: '3',
        title: 'The Soul of Bihu: A Cultural Deep Dive',
        slug: 'bihu-cultural-guide',
        excerpt: 'More than just a festival - understanding the history, traditions, and community spirit behind Assam\'s most important celebration.',
        category: 'culture',
        coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
        author: {
            name: 'Dipika Baruah',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        },
        publishedAt: '2026-01-05',
        readTime: '15 min read',
        views: 5670,
        likes: 456,
        comments: 89,
        tags: ['Bihu', 'Festival', 'Traditions', 'Dance'],
        season: 'April',
        budget: 'Varies',
        featured: true,
    },
    {
        id: '4',
        title: 'Kaziranga Safari Tips: How to Maximize Your Rhino Spotting',
        slug: 'kaziranga-safari-tips',
        excerpt: 'Expert tips from a wildlife photographer on which ranges to visit, best times, and how to ethically enjoy the safari experience.',
        category: 'wildlife',
        coverImage: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=800&q=80',
        author: {
            name: 'Raktim Hazarika',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
        },
        publishedAt: '2025-12-28',
        readTime: '10 min read',
        views: 6780,
        likes: 345,
        comments: 67,
        tags: ['Kaziranga', 'Wildlife', 'Safari', 'Rhino'],
        season: 'November-April',
        budget: '₹15,000',
        featured: false,
    },
    {
        id: '5',
        title: 'Assamese Food: 15 Dishes You Must Try',
        slug: 'assamese-food-guide',
        excerpt: 'From Masor Tenga to Pitha, a comprehensive guide to the unique flavors of Assamese cuisine.',
        category: 'food',
        coverImage: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80',
        author: {
            name: 'Jonali Kalita',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
        },
        publishedAt: '2025-12-20',
        readTime: '7 min read',
        views: 8920,
        likes: 567,
        comments: 123,
        tags: ['Food', 'Cuisine', 'Culture'],
        season: 'Year-round',
        budget: '₹500-2000/day',
        featured: false,
    },
    {
        id: '6',
        title: 'Trekking in Karbi Anglong: Hidden Trails of the Hills',
        slug: 'karbi-anglong-trekking',
        excerpt: 'Discover the unexplored trekking routes in Assam\'s hill district, complete with maps and difficulty ratings.',
        category: 'adventure',
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        author: {
            name: 'Karbi Terang',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
        },
        publishedAt: '2025-12-15',
        readTime: '9 min read',
        views: 2340,
        likes: 134,
        comments: 28,
        tags: ['Trekking', 'Adventure', 'Hills', 'Karbi'],
        season: 'October-March',
        budget: '₹5,000',
        featured: false,
    },
    {
        id: '7',
        title: 'Budget Travel Tips: Exploring Assam Under ₹15,000',
        slug: 'budget-travel-assam',
        excerpt: 'Practical tips for backpackers and budget travelers to experience the best of Assam without breaking the bank.',
        category: 'tips',
        coverImage: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=800&q=80',
        author: {
            name: 'Anirban Sen',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        },
        publishedAt: '2025-12-10',
        readTime: '11 min read',
        views: 7890,
        likes: 423,
        comments: 98,
        tags: ['Budget', 'Tips', 'Backpacking'],
        season: 'Year-round',
        budget: '< ₹15,000',
        featured: false,
    },
];

export default function ArticlesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [savedArticles, setSavedArticles] = useState<string[]>([]);

    // Filter articles
    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const featuredArticles = filteredArticles.filter(a => a.featured);


    const toggleSave = (id: string) => {
        setSavedArticles(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-12 relative overflow-hidden"
                style={{ background: 'var(--gradient-tea)' }}
            >
                <div className="absolute inset-0 tea-pattern-bg opacity-10" />
                <div className="container-custom relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="max-w-2xl">
                            <span className="badge badge-muga mb-4">
                                <PenLine className="w-4 h-4" />
                                Travel Stories
                            </span>
                            <h1
                                className="text-3xl md:text-4xl font-bold text-white mb-4"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Insider <span style={{ color: 'var(--muga-light)' }}>Articles</span>
                            </h1>
                            <p className="text-lg text-white/80">
                                Travel stories, guides, and tips from explorers who know Assam best
                            </p>
                        </div>

                        <Link href="/articles/write" className="btn-muga whitespace-nowrap">
                            <PenLine className="w-4 h-4" />
                            Write Article
                        </Link>
                    </div>
                </div>
            </header>

            {/* Filters */}
            <section
                className="py-6 sticky top-0 z-40"
                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}
            >
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search articles, topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'text-white' : ''
                                        }`}
                                    style={{
                                        background: selectedCategory === cat.id ? 'var(--gradient-tea)' : 'var(--bg-card)',
                                        border: '1px solid var(--border-light)'
                                    }}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
                <section className="section-padding-sm">
                    <div className="container-custom">
                        <h2
                            className="text-xl font-bold mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Featured Stories
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Main Featured */}
                            {featuredArticles[0] && (
                                <div className="md:col-span-2 heritage-card overflow-hidden">
                                    <div className="relative h-64 md:h-80">
                                        <Image
                                            src={featuredArticles[0].coverImage}
                                            alt={featuredArticles[0].title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <span className="badge badge-muga mb-3">
                                                {categories.find(c => c.id === featuredArticles[0].category)?.label}
                                            </span>
                                            <h3
                                                className="text-xl md:text-2xl font-bold text-white mb-2"
                                                style={{ fontFamily: 'var(--font-heading)' }}
                                            >
                                                {featuredArticles[0].title}
                                            </h3>
                                            <p className="text-white/70 text-sm line-clamp-2 mb-3">
                                                {featuredArticles[0].excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-white/60 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {featuredArticles[0].readTime}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    {featuredArticles[0].views.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Side Featured */}
                            <div className="space-y-4">
                                {featuredArticles.slice(1, 3).map((article) => (
                                    <div key={article.id} className="heritage-card overflow-hidden">
                                        <div className="relative h-32">
                                            <Image
                                                src={article.coverImage}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h4 className="text-sm font-semibold text-white line-clamp-2">
                                                    {article.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* All Articles */}
            <section className="section-padding">
                <div className="container-custom">
                    <h2
                        className="text-xl font-bold mb-6"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Latest Stories ({filteredArticles.length})
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredArticles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                isSaved={savedArticles.includes(article.id)}
                                onToggleSave={() => toggleSave(article.id)}
                                formatDate={formatDate}
                            />
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-12">
                            <p style={{ color: 'var(--text-muted)' }}>
                                No articles found matching your criteria
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section
                className="section-padding"
                style={{ background: 'var(--bg-secondary)' }}
            >
                <div className="container-custom text-center max-w-2xl mx-auto">
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Share Your Assam Story
                    </h2>
                    <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                        Have you explored Assam? Share your experiences, tips, and recommendations with fellow travelers.
                    </p>
                    <Link href="/articles/write" className="btn-primary">
                        <PenLine className="w-4 h-4" />
                        Start Writing
                    </Link>
                </div>
            </section>
        </div>
    );
}

// Article Card Component
function ArticleCard({
    article,
    isSaved,
    onToggleSave,
    formatDate
}: {
    article: typeof articles[0];
    isSaved: boolean;
    onToggleSave: () => void;
    formatDate: (date: string) => string;
}) {
    return (
        <div className="heritage-card overflow-hidden group">
            {/* Image */}
            <div className="relative h-48">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Save Button */}
                <button
                    onClick={onToggleSave}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                >
                    <Bookmark
                        className="w-5 h-5 text-white"
                        style={{
                            fill: isSaved ? 'var(--muga-gold)' : 'none',
                            color: isSaved ? 'var(--muga-gold)' : 'white'
                        }}
                    />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                    <span className="badge badge-tea">
                        {categories.find(c => c.id === article.category)?.label}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-tea-garden transition-colors">
                    {article.title}
                </h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                    <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <p className="text-sm font-medium">{article.author.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {formatDate(article.publishedAt)}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {article.likes}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {article.comments}
                        </span>
                    </div>
                    <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {article.views.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
