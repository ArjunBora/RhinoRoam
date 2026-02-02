'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Search, MapPin, Calendar, Users, Filter, Star, Heart,
    ArrowRight, ChevronLeft, Clock, X, SlidersHorizontal,
    Compass, Bird, Leaf, Waves, Tent, Sparkles, Mountain
} from 'lucide-react';

/* ============================================
   EXPERIENCES PAGE
   Browse All Assam Experiences
   ============================================ */

// Types
interface Experience {
    id: string;
    title: string;
    slug: string;
    location: string;
    district: string;
    category: string;
    subcategory?: string;
    duration: string;
    difficulty?: 'Easy' | 'Moderate' | 'Challenging';
    groupSize?: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    price: number;
    priceType: 'per person' | 'per group' | 'per night';
    host: {
        name: string;
        image: string;
        verified: boolean;
    };
    highlights: string[];
    isFeatured?: boolean;
    isNewlyAdded?: boolean;
    bestSeason?: string;
}

// Categories
const categories = [
    { id: 'all', label: 'All Experiences', icon: <Compass className="w-5 h-5" />, color: 'var(--tea-deep)' },
    { id: 'wildlife', label: 'Wildlife Safari', icon: <Bird className="w-5 h-5" />, color: 'var(--forest-kaziranga)' },
    { id: 'tea', label: 'Tea Trails', icon: <Leaf className="w-5 h-5" />, color: 'var(--tea-garden)' },
    { id: 'river', label: 'River Journeys', icon: <Waves className="w-5 h-5" />, color: 'var(--brahma-blue)' },
    { id: 'tribal', label: 'Tribal Immersion', icon: <Tent className="w-5 h-5" />, color: 'var(--mekhela-red)' },
    { id: 'handloom', label: 'Handloom & Crafts', icon: <Sparkles className="w-5 h-5" />, color: 'var(--muga-gold)' },
    { id: 'adventure', label: 'Adventure', icon: <Mountain className="w-5 h-5" />, color: 'var(--earth-assam)' },
];

// Sample experiences data
const allExperiences: Experience[] = [
    {
        id: '1',
        title: 'Kaziranga Safari: Track the One-Horned Rhino',
        slug: 'kaziranga-rhino-safari',
        location: 'Kaziranga National Park',
        district: 'Golaghat',
        category: 'wildlife',
        subcategory: 'Safari',
        duration: '2 Days / 1 Night',
        difficulty: 'Easy',
        groupSize: '2-6 people',
        description: 'Experience the thrill of spotting the majestic one-horned rhinoceros in their natural habitat. Includes elephant safari at dawn and jeep safari through multiple ranges.',
        image: '/images/kaziranga-safari-conservation.webp',
        rating: 4.9,
        reviews: 567,
        price: 12000,
        priceType: 'per person',
        host: {
            name: 'Kaziranga Eco Lodge',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            verified: true
        },
        highlights: ['Elephant Safari', 'Jeep Safari', 'Bird Watching', 'Nature Walk'],
        isFeatured: true,
        bestSeason: 'November - April'
    },
    {
        id: '2',
        title: 'Majuli Island: Living Heritage of the Satras',
        slug: 'majuli-satra-heritage',
        location: 'Majuli Island',
        district: 'Majuli',
        category: 'tribal',
        subcategory: 'Cultural Heritage',
        duration: '3 Days / 2 Nights',
        difficulty: 'Easy',
        groupSize: '2-8 people',
        description: 'Immerse yourself in the 500-year old Vaishnavite Satra culture. Learn traditional mask-making, witness Sattriya dance, and stay with local Mising families.',
        image: '/images/majuli-island-heritage-walk.webp',
        rating: 4.8,
        reviews: 324,
        price: 8500,
        priceType: 'per person',
        host: {
            name: 'Pranjal Borah',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
            verified: true
        },
        highlights: ['Mask Making Workshop', 'Satra Visit', 'Mising Village Stay', 'Sattriya Dance'],
        isFeatured: true,
        bestSeason: 'October - March'
    },
    {
        id: '3',
        title: 'Tea Garden Stay & Plucking Experience',
        slug: 'tea-garden-experience',
        location: 'Dibrugarh',
        district: 'Dibrugarh',
        category: 'tea',
        subcategory: 'Agri Tourism',
        duration: '2 Days / 1 Night',
        difficulty: 'Easy',
        groupSize: '2-4 people',
        description: 'Stay in a heritage tea bungalow, learn the art of tea plucking with local workers, visit the factory to see processing, and enjoy high tea overlooking endless green gardens.',
        image: '/images/tea-garden-stay-plucking.webp',
        rating: 4.9,
        reviews: 412,
        price: 15000,
        priceType: 'per person',
        host: {
            name: 'Mancotta Tea Estate',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
            verified: true
        },
        highlights: ['Heritage Bungalow Stay', 'Tea Plucking', 'Factory Tour', 'High Tea Experience'],
        isFeatured: true,
        bestSeason: 'March - November'
    },
    {
        id: '4',
        title: 'Muga Silk Weaving Workshop in Sualkuchi',
        slug: 'muga-silk-workshop',
        location: 'Sualkuchi',
        district: 'Kamrup',
        category: 'handloom',
        subcategory: 'Artisan Craft',
        duration: '1 Day',
        difficulty: 'Easy',
        groupSize: '2-6 people',
        description: 'Learn the ancient art of Muga silk weaving from master weavers. Understand the entire process from cocoon to golden fabric and try your hand at the loom.',
        image: '/images/muga-silk-weaving-workshop.webp',
        rating: 4.7,
        reviews: 189,
        price: 2500,
        priceType: 'per person',
        host: {
            name: 'Lakshmi Devi Weavers',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
            verified: true
        },
        highlights: ['Weaving Demonstration', 'Hands-on Practice', 'Silk Farm Visit', 'Shopping'],
        isNewlyAdded: true,
    },
    {
        id: '5',
        title: 'Brahmaputra River Cruise: Guwahati to Majuli',
        slug: 'brahmaputra-cruise',
        location: 'Guwahati to Majuli',
        district: 'Kamrup Metro',
        category: 'river',
        subcategory: 'Luxury Cruise',
        duration: '4 Days / 3 Nights',
        difficulty: 'Easy',
        groupSize: '10-20 people',
        description: 'Sail the mighty Brahmaputra on a traditional country boat converted to a comfortable cruise. Visit river islands, spot Gangetic dolphins, and experience sunset over the river.',
        image: '/images/brahmaputra-river-cruise.webp',
        rating: 4.9,
        reviews: 234,
        price: 45000,
        priceType: 'per person',
        host: {
            name: 'Brahmaputra Cruises',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
            verified: true
        },
        highlights: ['Luxury Cruise', 'Dolphin Spotting', 'Island Visits', 'Sunset Views'],
        isFeatured: true,
        bestSeason: 'October - April'
    },
    {
        id: '6',
        title: 'Mising Tribal Village Homestay',
        slug: 'mising-village-homestay',
        location: 'Dhemaji',
        district: 'Dhemaji',
        category: 'tribal',
        subcategory: 'Homestay',
        duration: '3 Days / 2 Nights',
        difficulty: 'Easy',
        groupSize: '2-4 people',
        description: 'Stay in a traditional Mising stilted house along the Brahmaputra. Experience daily village life, learn to cook Mising cuisine, and participate in community activities.',
        image: '/images/mising-tribal-village-stay.webp',
        rating: 4.8,
        reviews: 156,
        price: 6000,
        priceType: 'per person',
        host: {
            name: 'Mibu Mili',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            verified: true
        },
        highlights: ['Stilted House Stay', 'Cooking Class', 'Fishing Experience', 'Village Walk'],
        bestSeason: 'October - March'
    },
    {
        id: '7',
        title: 'Bodo Cultural Immersion with Bagurumba Dance',
        slug: 'bodo-cultural-immersion',
        location: 'Kokrajhar',
        district: 'Kokrajhar',
        category: 'tribal',
        subcategory: 'Cultural Experience',
        duration: '2 Days / 1 Night',
        difficulty: 'Easy',
        groupSize: '4-10 people',
        description: 'Experience the vibrant Bodo culture in the heart of BTR. Learn the graceful Bagurumba dance, try traditional Bodo cuisine, and participate in village festivities.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
        rating: 4.6,
        reviews: 98,
        price: 5500,
        priceType: 'per person',
        host: {
            name: 'Swmdwn Boro',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
            verified: true
        },
        highlights: ['Bagurumba Dance', 'Traditional Cuisine', 'Handloom Visit', 'Village Stay'],
        isNewlyAdded: true
    },
    {
        id: '8',
        title: 'Dehing Patkai Rainforest Trek',
        slug: 'dehing-patkai-trek',
        location: 'Margherita',
        district: 'Tinsukia',
        category: 'adventure',
        subcategory: 'Trekking',
        duration: '3 Days / 2 Nights',
        difficulty: 'Challenging',
        groupSize: '4-8 people',
        description: 'Trek through the last lowland rainforest of India. Spot hoolock gibbons, discover WWII history, and camp under the canopy of ancient trees.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        rating: 4.7,
        reviews: 87,
        price: 9000,
        priceType: 'per person',
        host: {
            name: 'Rainforest Expeditions',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
            verified: true
        },
        highlights: ['Rainforest Trek', 'Wildlife Spotting', 'WWII History', 'Camping'],
        bestSeason: 'November - March'
    },
    {
        id: '9',
        title: 'Ahom Heritage Trail: Sivasagar',
        slug: 'ahom-heritage-trail',
        location: 'Sivasagar',
        district: 'Sivasagar',
        category: 'tribal',
        subcategory: 'Heritage Walk',
        duration: '2 Days / 1 Night',
        difficulty: 'Easy',
        groupSize: '2-10 people',
        description: 'Walk through 600 years of Ahom history. Visit the iconic Rang Ghar, explore Talatal Ghar\'s secret tunnels, and witness traditional Ahom rituals at Charaideo Maidams.',
        image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=800&q=80',
        rating: 4.8,
        reviews: 203,
        price: 4500,
        priceType: 'per person',
        host: {
            name: 'Heritage Assam Tours',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
            verified: true
        },
        highlights: ['Rang Ghar Visit', 'Talatal Ghar', 'Charaideo Maidams', 'Ahom Cuisine'],
        isFeatured: true
    },
    {
        id: '10',
        title: 'Manas Tiger Reserve: In Search of Bengal Tigers',
        slug: 'manas-tiger-safari',
        location: 'Manas National Park',
        district: 'Baksa',
        category: 'wildlife',
        subcategory: 'Safari',
        duration: '3 Days / 2 Nights',
        difficulty: 'Moderate',
        groupSize: '2-6 people',
        description: 'Explore the UNESCO World Heritage Site of Manas. Track Bengal tigers, spot golden langurs, and experience the unique ecosystem at the Bhutan foothills.',
        image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=800&q=80',
        rating: 4.7,
        reviews: 178,
        price: 14000,
        priceType: 'per person',
        host: {
            name: 'Manas Wild Lodge',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
            verified: true
        },
        highlights: ['Tiger Tracking', 'Golden Langur', 'Bird Watching', 'River Rafting'],
        bestSeason: 'November - April'
    },
    {
        id: '11',
        title: 'Karbi Anglong Hill Trek & Village Stay',
        slug: 'karbi-hill-trek',
        location: 'Diphu',
        district: 'Karbi Anglong',
        category: 'adventure',
        subcategory: 'Trekking',
        duration: '4 Days / 3 Nights',
        difficulty: 'Moderate',
        groupSize: '4-8 people',
        description: 'Trek through the scenic Karbi hills, stay in traditional Karbi villages, and participate in local festivals. Experience unique Karbi cuisine and crafts.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        rating: 4.6,
        reviews: 65,
        price: 7500,
        priceType: 'per person',
        host: {
            name: 'Karbi Heritage Trails',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
            verified: true
        },
        highlights: ['Hill Trekking', 'Village Stay', 'Karbi Cuisine', 'Craft Workshop'],
        isNewlyAdded: true
    },
    {
        id: '12',
        title: 'Haflong: Switzerland of the East Experience',
        slug: 'haflong-experience',
        location: 'Haflong',
        district: 'Dima Hasao',
        category: 'adventure',
        subcategory: 'Hill Station',
        duration: '3 Days / 2 Nights',
        difficulty: 'Easy',
        groupSize: '2-6 people',
        description: 'Discover the only hill station in Assam. Visit the serene Haflong Lake, explore Jatinga\'s mystery, and enjoy the panoramic views of the Blue Mountains.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        rating: 4.5,
        reviews: 92,
        price: 8000,
        priceType: 'per person',
        host: {
            name: 'Dimasa Heritage Tours',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
            verified: true
        },
        highlights: ['Haflong Lake', 'Jatinga Visit', 'Blue Mountains', 'Dimasa Culture'],
        bestSeason: 'October - May'
    }
];

// Districts for filtering
const districts = [
    'All Districts', 'Golaghat', 'Majuli', 'Dibrugarh', 'Kamrup', 'Kamrup Metro',
    'Dhemaji', 'Kokrajhar', 'Tinsukia', 'Sivasagar', 'Baksa', 'Karbi Anglong', 'Dima Hasao'
];

// Price ranges
const priceRanges = [
    { id: 'all', label: 'Any Price' },
    { id: 'budget', label: 'Under ₹5,000', max: 5000 },
    { id: 'mid', label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { id: 'premium', label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { id: 'luxury', label: 'Above ₹20,000', min: 20000 },
];

// Duration filters
const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'day', label: 'Day Trip' },
    { id: 'short', label: '2-3 Days' },
    { id: 'week', label: '4+ Days' },
];

export default function ExperiencesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [selectedDuration, setSelectedDuration] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [savedExperiences, setSavedExperiences] = useState<string[]>([]);

    // Filter experiences
    const filteredExperiences = allExperiences.filter(exp => {
        const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
        const matchesDistrict = selectedDistrict === 'All Districts' || exp.district === selectedDistrict;
        const matchesSearch = !searchQuery ||
            exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exp.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Price filter
        let matchesPrice = true;
        if (selectedPrice !== 'all') {
            const range = priceRanges.find(r => r.id === selectedPrice);
            if (range) {
                if (range.min && range.max) {
                    matchesPrice = exp.price >= range.min && exp.price <= range.max;
                } else if (range.min) {
                    matchesPrice = exp.price >= range.min;
                } else if (range.max) {
                    matchesPrice = exp.price <= range.max;
                }
            }
        }

        // Duration filter
        let matchesDuration = true;
        if (selectedDuration !== 'all') {
            if (selectedDuration === 'day') {
                matchesDuration = exp.duration.includes('1 Day');
            } else if (selectedDuration === 'short') {
                matchesDuration = exp.duration.includes('2 Days') || exp.duration.includes('3 Days');
            } else if (selectedDuration === 'week') {
                matchesDuration = exp.duration.includes('4 Days') || exp.duration.includes('5 Days') || exp.duration.includes('week');
            }
        }

        return matchesCategory && matchesDistrict && matchesSearch && matchesPrice && matchesDuration;
    });

    // Sort experiences
    const sortedExperiences = [...filteredExperiences].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'reviews':
                return b.reviews - a.reviews;
            default: // featured
                return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
    });

    const toggleSave = (id: string) => {
        setSavedExperiences(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const getCategoryColor = (categoryId: string) => {
        return categories.find(c => c.id === categoryId)?.color || 'var(--text-secondary)';
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-16 relative overflow-hidden"
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

                    <h1
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Authentic <span style={{ color: 'var(--muga-light)' }}>Experiences</span>
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mb-8">
                        {allExperiences.length}+ handpicked experiences hosted by local communities across Assam
                    </p>

                    {/* Search */}
                    <div className="search-hero max-w-2xl">
                        <Search className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search experiences, locations, activities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button>
                            Search
                        </button>
                    </div>
                </div>
            </header>

            {/* Category Pills */}
            <section className="py-6 sticky top-0 z-40" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}>
                <div className="container-custom">
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'text-white shadow-lg' : ''
                                    }`}
                                style={{
                                    background: selectedCategory === cat.id ? cat.color : 'var(--bg-card)',
                                    border: '1px solid var(--border-light)',
                                    color: selectedCategory === cat.id ? 'white' : cat.color
                                }}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filters Bar */}
            <section className="py-4" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${showFilters ? 'text-white' : ''}`}
                                style={{
                                    background: showFilters ? 'var(--gradient-tea)' : 'var(--bg-card)',
                                    border: '1px solid var(--border-light)'
                                }}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>

                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="px-4 py-2 rounded-xl text-sm border"
                                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-light)' }}
                            >
                                {districts.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>

                            <select
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                className="px-4 py-2 rounded-xl text-sm border"
                                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-light)' }}
                            >
                                {priceRanges.map(p => (
                                    <option key={p.id} value={p.id}>{p.label}</option>
                                ))}
                            </select>

                            <select
                                value={selectedDuration}
                                onChange={(e) => setSelectedDuration(e.target.value)}
                                className="px-4 py-2 rounded-xl text-sm border"
                                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-light)' }}
                            >
                                {durations.map(d => (
                                    <option key={d.id} value={d.id}>{d.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                {sortedExperiences.length} experiences
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 rounded-xl text-sm border"
                                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-light)' }}
                            >
                                <option value="featured">Featured First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="reviews">Most Reviewed</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(selectedCategory !== 'all' || selectedDistrict !== 'All Districts' || selectedPrice !== 'all' || selectedDuration !== 'all') && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {selectedCategory !== 'all' && (
                                <span
                                    className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                                    style={{ background: getCategoryColor(selectedCategory), color: 'white' }}
                                >
                                    {categories.find(c => c.id === selectedCategory)?.label}
                                    <button onClick={() => setSelectedCategory('all')}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                            {selectedDistrict !== 'All Districts' && (
                                <span
                                    className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                                    style={{ background: 'var(--brahma-blue)', color: 'white' }}
                                >
                                    {selectedDistrict}
                                    <button onClick={() => setSelectedDistrict('All Districts')}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSelectedDistrict('All Districts');
                                    setSelectedPrice('all');
                                    setSelectedDuration('all');
                                }}
                                className="text-xs font-medium underline"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Experiences Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    {sortedExperiences.length === 0 ? (
                        <div className="text-center py-20">
                            <Compass className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                            <h3 className="text-xl font-semibold mb-2">No experiences found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedExperiences.map((exp) => (
                                <div key={exp.id} className="experience-card group">
                                    <Link href={`/experiences/${exp.slug}`}>
                                        <div className="relative h-56 overflow-hidden">
                                            <Image
                                                src={exp.image}
                                                alt={exp.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                                <span
                                                    className="badge"
                                                    style={{ background: `${getCategoryColor(exp.category)}20`, color: getCategoryColor(exp.category) }}
                                                >
                                                    {categories.find(c => c.id === exp.category)?.label}
                                                </span>
                                                {exp.isFeatured && (
                                                    <span className="badge badge-muga">
                                                        <Star className="w-3 h-3" /> Featured
                                                    </span>
                                                )}
                                                {exp.isNewlyAdded && (
                                                    <span className="badge badge-river">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${savedExperiences.includes(exp.id) ? '' : ''
                                                    }`}
                                                style={{
                                                    background: savedExperiences.includes(exp.id) ? 'var(--mekhela-red)' : 'rgba(255,255,255,0.9)',
                                                    color: savedExperiences.includes(exp.id) ? 'white' : 'var(--text-muted)'
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleSave(exp.id);
                                                }}
                                            >
                                                <Heart className="w-5 h-5" fill={savedExperiences.includes(exp.id) ? 'currentColor' : 'none'} />
                                            </button>
                                        </div>
                                    </Link>

                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                                            <MapPin className="w-4 h-4" />
                                            {exp.location}
                                        </div>

                                        <Link href={`/experiences/${exp.slug}`}>
                                            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-gradient-tea transition-colors">
                                                {exp.title}
                                            </h3>
                                        </Link>

                                        <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                            {exp.description}
                                        </p>

                                        {/* Host Info */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <Image
                                                src={exp.host.image}
                                                alt={exp.host.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-1 text-sm font-medium">
                                                    {exp.host.name}
                                                    {exp.host.verified && (
                                                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs" style={{ background: 'var(--success)' }}>✓</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                                <span className="font-semibold">{exp.rating}</span>
                                                <span style={{ color: 'var(--text-muted)' }}>({exp.reviews})</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                                <Clock className="w-4 h-4" />
                                                {exp.duration}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                                            <div>
                                                <span className="text-xl font-bold" style={{ color: 'var(--tea-deep)' }}>
                                                    ₹{exp.price.toLocaleString()}
                                                </span>
                                                <span className="text-sm" style={{ color: 'var(--text-muted)' }}> / {exp.priceType}</span>
                                            </div>
                                            <Link
                                                href={`/experiences/${exp.slug}`}
                                                className="btn-primary py-2 px-4 text-sm"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
