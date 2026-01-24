'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft, MapPin, Star, Search, Sparkles, Check, MessageCircle
} from 'lucide-react';

/* ============================================
   ARTISANS DIRECTORY PAGE
   Local Artisans & Products
   ============================================ */

// Craft Types
const craftTypes = [
    { id: 'all', label: 'All Crafts' },
    { id: 'weaving', label: 'Weaving & Textiles' },
    { id: 'pottery', label: 'Pottery' },
    { id: 'mask', label: 'Mask Making' },
    { id: 'bamboo', label: 'Bamboo & Cane' },
    { id: 'jewelry', label: 'Traditional Jewelry' },
    { id: 'metalwork', label: 'Bell Metal & Brass' },
    { id: 'woodwork', label: 'Wood Carving' },
];

// Sample Artisans
const artisans = [
    {
        id: '1',
        name: 'Hemprova Devi',
        slug: 'hemprova-devi',
        craft: 'Muga Silk Weaving',
        craftType: 'weaving',
        location: 'Sualkuchi',
        district: 'Kamrup',
        story: 'Third-generation Muga silk weaver from the "Weaving Village" of Sualkuchi. Hemprova creates exquisite Mekhela Sadors using traditional pit looms passed down through generations.',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
        products: ['Muga Silk Mekhela Sador', 'Pat Silk Sarees', 'Silk Stoles'],
        workshopAvailable: true,
        workshopDetails: '3-hour weaving introduction workshop',
        rating: 4.9,
        reviewCount: 67,
        verified: true,
        priceRange: '₹5,000 - ₹50,000',
        featured: true,
    },
    {
        id: '2',
        name: 'Bhabendra Nath',
        slug: 'bhabendra-nath',
        craft: 'Traditional Mask Making',
        craftType: 'mask',
        location: 'Majuli',
        district: 'Majuli',
        story: 'Master craftsman preserving the 500-year-old art of Satra mask making. Each mask depicts characters from Vaishnavite mythology and takes weeks to complete.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        products: ['Mythological Masks', 'Decorative Masks', 'Miniature Masks'],
        workshopAvailable: true,
        workshopDetails: 'Full-day mask making experience',
        rating: 4.8,
        reviewCount: 89,
        verified: true,
        priceRange: '₹2,000 - ₹25,000',
        featured: true,
    },
    {
        id: '3',
        name: 'Phukan Ceramics',
        slug: 'phukan-ceramics',
        craft: 'Assamese Pottery',
        craftType: 'pottery',
        location: 'Dhing',
        district: 'Nagaon',
        story: 'Family-run pottery workshop keeping alive the Hira tradition of Assamese pottery. Known for distinctive black and red earthenware.',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
        products: ['Hira Pottery', 'Traditional Utensils', 'Decorative Items'],
        workshopAvailable: true,
        workshopDetails: '2-hour pottery making session',
        rating: 4.7,
        reviewCount: 45,
        verified: true,
        priceRange: '₹500 - ₹5,000',
        featured: false,
    },
    {
        id: '4',
        name: 'Doley Bamboo Crafts',
        slug: 'doley-bamboo-crafts',
        craft: 'Bamboo & Cane Work',
        craftType: 'bamboo',
        location: 'Jonai',
        district: 'Dhemaji',
        story: 'Mising tribal artisan collective creating traditional bamboo items using sustainable practices. From furniture to household items, everything is handcrafted.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
        products: ['Bamboo Furniture', 'Fishing Baskets', 'Home Decor'],
        workshopAvailable: false,
        workshopDetails: '',
        rating: 4.6,
        reviewCount: 32,
        verified: true,
        priceRange: '₹300 - ₹15,000',
        featured: false,
    },
    {
        id: '5',
        name: 'Bodo Sisters Collective',
        slug: 'bodo-sisters-collective',
        craft: 'Dokhona Weaving',
        craftType: 'weaving',
        location: 'Kokrajhar',
        district: 'Kokrajhar',
        story: 'Women\'s self-help group preserving Bodo weaving traditions. Each Dokhona features intricate geometric patterns unique to Bodo culture.',
        image: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400&q=80',
        products: ['Dokhona', 'Aronai', 'Jwmgra (Shawl)'],
        workshopAvailable: true,
        workshopDetails: 'Weaving demonstration and mini workshop',
        rating: 4.8,
        reviewCount: 56,
        verified: true,
        priceRange: '₹2,000 - ₹8,000',
        featured: true,
    },
    {
        id: '6',
        name: 'Khargeswar Saikia',
        slug: 'khargeswar-saikia',
        craft: 'Bell Metal (Kanh)',
        craftType: 'metalwork',
        location: 'Sarthebari',
        district: 'Barpeta',
        story: 'Master craftsman of Sarthebari\'s famous bell metal industry. Creates traditional utensils, bells, and decorative items using ancient techniques.',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80',
        products: ['Bell Metal Utensils', 'Decorative Bells', 'Traditional Items'],
        workshopAvailable: true,
        workshopDetails: 'Visit workshop and see crafting process',
        rating: 4.7,
        reviewCount: 41,
        verified: true,
        priceRange: '₹500 - ₹20,000',
        featured: false,
    },
];

export default function ArtisansPage() {
    const [selectedCraft, setSelectedCraft] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showWorkshopOnly, setShowWorkshopOnly] = useState(false);

    // Filter artisans
    const filteredArtisans = artisans.filter(artisan => {
        const matchesCraft = selectedCraft === 'all' || artisan.craftType === selectedCraft;
        const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artisan.craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artisan.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesWorkshop = !showWorkshopOnly || artisan.workshopAvailable;
        return matchesCraft && matchesSearch && matchesWorkshop;
    });

    // Featured artisans
    const featuredArtisans = filteredArtisans.filter(a => a.featured);
    const otherArtisans = filteredArtisans.filter(a => !a.featured);

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-12 relative overflow-hidden"
                style={{ background: 'var(--gradient-muga)' }}
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

                    <div className="max-w-2xl">
                        <span className="badge bg-white/20 text-white mb-4">
                            <Sparkles className="w-4 h-4" />
                            Handcrafted Heritage
                        </span>
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Local <span className="opacity-80">Artisans</span>
                        </h1>
                        <p className="text-lg text-white/80">
                            Meet the master craftspeople keeping Assam&apos;s traditional arts alive
                        </p>
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
                                placeholder="Search artisans, crafts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>

                        {/* Craft Filter */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            {craftTypes.map((craft) => (
                                <button
                                    key={craft.id}
                                    onClick={() => setSelectedCraft(craft.id)}
                                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCraft === craft.id ? 'text-white' : ''
                                        }`}
                                    style={{
                                        background: selectedCraft === craft.id ? 'var(--gradient-muga)' : 'var(--bg-card)',
                                        border: '1px solid var(--border-light)'
                                    }}
                                >
                                    {craft.label}
                                </button>
                            ))}
                        </div>

                        {/* Workshop Toggle */}
                        <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
                            <input
                                type="checkbox"
                                checked={showWorkshopOnly}
                                onChange={(e) => setShowWorkshopOnly(e.target.checked)}
                                className="rounded"
                            />
                            <span className="text-sm">Workshop available</span>
                        </label>
                    </div>
                </div>
            </section>

            {/* Artisans List */}
            <section className="section-padding">
                <div className="container-custom">
                    {/* Featured */}
                    {featuredArtisans.length > 0 && (
                        <div className="mb-12">
                            <h2
                                className="text-xl font-bold mb-6"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Featured Artisans
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredArtisans.map((artisan) => (
                                    <ArtisanCard key={artisan.id} artisan={artisan} featured />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Artisans */}
                    <div>
                        <h2
                            className="text-xl font-bold mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            All Artisans ({filteredArtisans.length})
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherArtisans.map((artisan) => (
                                <ArtisanCard key={artisan.id} artisan={artisan} />
                            ))}
                        </div>
                    </div>

                    {filteredArtisans.length === 0 && (
                        <div className="text-center py-12">
                            <p style={{ color: 'var(--text-muted)' }}>
                                No artisans found matching your criteria
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
                        Are you an artisan?
                    </h2>
                    <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                        Join RhinoRoam to showcase your craft and connect with travelers who appreciate authentic handmade products.
                    </p>
                    <Link href="/hosts/register" className="btn-primary">
                        Register as Artisan
                    </Link>
                </div>
            </section>
        </div>
    );
}

// Artisan Card Component
function ArtisanCard({ artisan, featured = false }: { artisan: typeof artisans[0]; featured?: boolean }) {
    return (
        <div className={`heritage-card overflow-hidden ${featured ? 'ring-2 ring-[var(--muga-gold)]' : ''}`}>
            {/* Image */}
            <div className="relative h-48">
                <Image
                    src={artisan.image}
                    alt={artisan.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {artisan.verified && (
                        <span className="badge badge-tea">
                            <Check className="w-3 h-3" />
                            Verified
                        </span>
                    )}
                    {artisan.workshopAvailable && (
                        <span className="badge badge-muga">Workshop</span>
                    )}
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-black/50 text-white">
                    <Star className="w-3 h-3" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                    {artisan.rating}
                </div>

                {/* Craft Badge */}
                <div className="absolute bottom-3 left-3">
                    <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ background: 'var(--tea-garden)' }}
                    >
                        {artisan.craft}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-semibold text-lg">{artisan.name}</h3>
                <div className="flex items-center gap-1 text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                    <MapPin className="w-3 h-3" />
                    {artisan.location}, {artisan.district}
                </div>

                <p className="text-sm mt-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {artisan.story}
                </p>

                {/* Products */}
                <div className="flex flex-wrap gap-1 mt-3">
                    {artisan.products.slice(0, 3).map((product, idx) => (
                        <span
                            key={idx}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            {product}
                        </span>
                    ))}
                </div>

                {/* Price Range */}
                <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-light)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {artisan.priceRange}
                    </span>
                    <button className="btn-ghost text-sm py-1">
                        <MessageCircle className="w-4 h-4" />
                        Enquire
                    </button>
                </div>
            </div>
        </div>
    );
}
