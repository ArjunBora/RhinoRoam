'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft, MapPin, Star, Search, Filter, Wifi,
    Car, Utensils, Leaf, Check, ExternalLink, Heart,
    Home, Building, Tent, ChevronRight
} from 'lucide-react';

/* ============================================
   STAYS & HOTELS DIRECTORY
   Accommodation listings
   ============================================ */

// Stay Types
const stayTypes = [
    { id: 'all', label: 'All Stays', icon: <Building className="w-4 h-4" /> },
    { id: 'homestay', label: 'Homestays', icon: <Home className="w-4 h-4" /> },
    { id: 'resort', label: 'Resorts', icon: <Building className="w-4 h-4" /> },
    { id: 'hotel', label: 'Hotels', icon: <Building className="w-4 h-4" /> },
    { id: 'eco-lodge', label: 'Eco Lodges', icon: <Leaf className="w-4 h-4" /> },
    { id: 'tea-bungalow', label: 'Tea Bungalows', icon: <Home className="w-4 h-4" /> },
    { id: 'camping', label: 'Camping', icon: <Tent className="w-4 h-4" /> },
];

// Price Ranges
const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'budget', label: 'Budget (< ₹2,000)' },
    { id: 'mid', label: 'Mid-Range (₹2,000-5,000)' },
    { id: 'premium', label: 'Premium (₹5,000-10,000)' },
    { id: 'luxury', label: 'Luxury (> ₹10,000)' },
];

// Sample Stays
const stays = [
    {
        id: '1',
        name: 'Wild Grass Eco Lodge',
        slug: 'wild-grass-eco-lodge',
        type: 'eco-lodge',
        typeLabel: 'Eco Lodge',
        location: 'Kaziranga',
        district: 'Golaghat',
        description: 'Award-winning eco lodge on the edge of Kaziranga National Park. Experience sustainable luxury while contributing to conservation.',
        images: [
            'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        ],
        priceMin: 8000,
        priceMax: 15000,
        rating: 4.9,
        reviewCount: 324,
        amenities: ['WiFi', 'Restaurant', 'Parking', 'Safari Desk', 'Nature Walks'],
        ecoPractices: ['Solar Power', 'Rainwater Harvesting', 'Organic Garden', 'Zero Plastic'],
        distanceToPOI: '2 km from Kaziranga Central Range',
        transportAccess: 'Airport pickup available (Jorhat - 80km)',
        verified: true,
        featured: true,
        bookingUrl: 'https://example.com/book',
    },
    {
        id: '2',
        name: 'Mancotta Heritage Bungalow',
        slug: 'mancotta-heritage-bungalow',
        type: 'tea-bungalow',
        typeLabel: 'Heritage Tea Bungalow',
        location: 'Dibrugarh',
        district: 'Dibrugarh',
        description: 'Stay in a 150-year old colonial tea planter\'s bungalow. Experience the heritage of Assam tea with garden views and high tea traditions.',
        images: [
            'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=600&q=80',
        ],
        priceMin: 12000,
        priceMax: 18000,
        rating: 4.9,
        reviewCount: 189,
        amenities: ['Heritage Rooms', 'All Meals', 'Tea Tastings', 'Garden Tours', 'Library'],
        ecoPractices: ['Organic Tea', 'Heritage Conservation', 'Community Employment'],
        distanceToPOI: 'Within Mancotta Tea Estate',
        transportAccess: 'Dibrugarh Airport - 15km',
        verified: true,
        featured: true,
        bookingUrl: 'https://example.com/book',
    },
    {
        id: '3',
        name: 'Satra Guest House',
        slug: 'satra-guest-house',
        type: 'homestay',
        typeLabel: 'Satra Guesthouse',
        location: 'Majuli Island',
        district: 'Majuli',
        description: 'Simple, authentic accommodation within a 500-year old Satra. Experience monastic life and Vaishnavite traditions.',
        images: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        ],
        priceMin: 800,
        priceMax: 1500,
        rating: 4.6,
        reviewCount: 156,
        amenities: ['Simple Rooms', 'Vegetarian Meals', 'Cultural Programs', 'Morning Prayers'],
        ecoPractices: ['Traditional Living', 'No AC', 'Organic Food'],
        distanceToPOI: 'Within Kamalabari Satra',
        transportAccess: 'Ferry from Nimati Ghat (Jorhat)',
        verified: true,
        featured: false,
        bookingUrl: null,
    },
    {
        id: '4',
        name: 'Brahmaputra River Lodge',
        slug: 'brahmaputra-river-lodge',
        type: 'resort',
        typeLabel: 'River Resort',
        location: 'Guwahati',
        district: 'Kamrup Metro',
        description: 'Luxury riverside resort with stunning views of the Brahmaputra. Perfect for a relaxing stay in the city.',
        images: [
            'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
        ],
        priceMin: 6000,
        priceMax: 12000,
        rating: 4.7,
        reviewCount: 412,
        amenities: ['River View Rooms', 'Pool', 'Spa', 'Restaurant', 'Bar', 'WiFi'],
        ecoPractices: ['River Conservation', 'Solar Heating'],
        distanceToPOI: '5 km from Kamakhya Temple',
        transportAccess: 'Guwahati Airport - 25km',
        verified: true,
        featured: true,
        bookingUrl: 'https://example.com/book',
    },
    {
        id: '5',
        name: 'Mising Tribal Homestay',
        slug: 'mising-tribal-homestay',
        type: 'homestay',
        typeLabel: 'Tribal Homestay',
        location: 'Lakhimpur',
        district: 'Lakhimpur',
        description: 'Authentic stilt-house homestay with a Mising tribal family. Experience traditional cuisine, rice beer, and village life.',
        images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        ],
        priceMin: 1200,
        priceMax: 2000,
        rating: 4.8,
        reviewCount: 78,
        amenities: ['Traditional Home', 'Home-cooked Meals', 'Cultural Evening', 'Village Tour'],
        ecoPractices: ['Traditional Construction', 'Local Food', 'Community Tourism'],
        distanceToPOI: 'Brahmaputra Riverfront',
        transportAccess: 'Lakhimpur Town - 10km',
        verified: true,
        featured: false,
        bookingUrl: null,
    },
    {
        id: '6',
        name: 'Bodo Village Camp',
        slug: 'bodo-village-camp',
        type: 'camping',
        typeLabel: 'Community Camp',
        location: 'Kokrajhar',
        district: 'Kokrajhar',
        description: 'Glamping experience in a Bodo village. Comfortable tents with access to cultural programs and village activities.',
        images: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        ],
        priceMin: 2500,
        priceMax: 3500,
        rating: 4.5,
        reviewCount: 45,
        amenities: ['Glamping Tents', 'Attached Bath', 'Campfire', 'Bodo Cuisine', 'Dance Programs'],
        ecoPractices: ['Minimal Footprint', 'Local Employment', 'Cultural Preservation'],
        distanceToPOI: 'Within Bodo Cultural Village',
        transportAccess: 'Kokrajhar Station - 15km',
        verified: true,
        featured: false,
        bookingUrl: null,
    },
];

export default function StaysPage() {
    const [selectedType, setSelectedType] = useState('all');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [savedStays, setSavedStays] = useState<string[]>([]);

    // Filter stays
    const filteredStays = stays.filter(stay => {
        const matchesType = selectedType === 'all' || stay.type === selectedType;
        const matchesSearch = stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stay.location.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesPrice = true;
        if (selectedPrice === 'budget') matchesPrice = stay.priceMin < 2000;
        if (selectedPrice === 'mid') matchesPrice = stay.priceMin >= 2000 && stay.priceMax <= 5000;
        if (selectedPrice === 'premium') matchesPrice = stay.priceMin >= 5000 && stay.priceMax <= 10000;
        if (selectedPrice === 'luxury') matchesPrice = stay.priceMin > 10000;

        return matchesType && matchesSearch && matchesPrice;
    });

    const toggleSave = (id: string) => {
        setSavedStays(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-12 relative overflow-hidden"
                style={{ background: 'var(--gradient-river)' }}
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
                            <Home className="w-4 h-4" />
                            Unique Stays
                        </span>
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Where to <span className="opacity-80">Stay</span>
                        </h1>
                        <p className="text-lg text-white/80">
                            From heritage bungalows to tribal homestays - find your perfect accommodation
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
                                placeholder="Search stays, locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>

                        {/* Type Filter */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            {stayTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedType === type.id ? 'text-white' : ''
                                        }`}
                                    style={{
                                        background: selectedType === type.id ? 'var(--gradient-river)' : 'var(--bg-card)',
                                        border: '1px solid var(--border-light)'
                                    }}
                                >
                                    {type.icon}
                                    {type.label}
                                </button>
                            ))}
                        </div>

                        {/* Price Filter */}
                        <select
                            value={selectedPrice}
                            onChange={(e) => setSelectedPrice(e.target.value)}
                            className="input-field py-2 w-auto"
                        >
                            {priceRanges.map((range) => (
                                <option key={range.id} value={range.id}>{range.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Stays List */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStays.map((stay) => (
                            <div
                                key={stay.id}
                                className={`heritage-card overflow-hidden ${stay.featured ? 'ring-2 ring-[var(--muga-gold)]' : ''}`}
                            >
                                {/* Image */}
                                <div className="relative h-48">
                                    <Image
                                        src={stay.images[0]}
                                        alt={stay.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                    {/* Save Button */}
                                    <button
                                        onClick={() => toggleSave(stay.id)}
                                        className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                                        style={{ background: 'rgba(0,0,0,0.5)' }}
                                    >
                                        <Heart
                                            className="w-5 h-5 text-white"
                                            style={{
                                                fill: savedStays.includes(stay.id) ? 'var(--mekhela-red)' : 'none',
                                                color: savedStays.includes(stay.id) ? 'var(--mekhela-red)' : 'white'
                                            }}
                                        />
                                    </button>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="badge badge-tea">{stay.typeLabel}</span>
                                        {stay.verified && (
                                            <span className="badge bg-white/20 text-white">
                                                <Check className="w-3 h-3" /> Verified
                                            </span>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="absolute bottom-3 left-3">
                                        <p className="text-white font-bold">
                                            ₹{stay.priceMin.toLocaleString()} - ₹{stay.priceMax.toLocaleString()}
                                        </p>
                                        <p className="text-white/70 text-sm">per night</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-lg">{stay.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                            <span className="font-medium">{stay.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                                        <MapPin className="w-3 h-3" />
                                        {stay.location}, {stay.district}
                                    </div>

                                    <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                        {stay.description}
                                    </p>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {stay.amenities.slice(0, 4).map((amenity, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-2 py-0.5 rounded-full"
                                                style={{ background: 'var(--bg-secondary)' }}
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                        {stay.amenities.length > 4 && (
                                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                +{stay.amenities.length - 4} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Eco Practices */}
                                    {stay.ecoPractices.length > 0 && (
                                        <div className="flex items-center gap-2 text-xs mb-4" style={{ color: 'var(--success)' }}>
                                            <Leaf className="w-3 h-3" />
                                            {stay.ecoPractices.slice(0, 2).join(' • ')}
                                        </div>
                                    )}

                                    {/* Distance */}
                                    <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                                        📍 {stay.distanceToPOI}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/stays/${stay.slug}`}
                                            className="btn-ghost flex-1 text-sm py-2"
                                        >
                                            View Details
                                        </Link>
                                        {stay.bookingUrl ? (
                                            <a
                                                href={stay.bookingUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary text-sm py-2"
                                            >
                                                Book
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        ) : (
                                            <button className="btn-primary text-sm py-2">
                                                Enquire
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredStays.length === 0 && (
                        <div className="text-center py-12">
                            <p style={{ color: 'var(--text-muted)' }}>
                                No stays found matching your criteria
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
