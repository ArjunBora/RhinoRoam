'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Search, MapPin, Star, Users, Shield, MessageCircle,
    ChevronLeft, ArrowRight, X, Filter, Award, Heart,
    Languages, Calendar, Clock, CheckCircle
} from 'lucide-react';

/* ============================================
   COMMUNITY HOSTS PAGE
   Meet the Local Hosts of Assam
   ============================================ */

// Types
interface Host {
    id: string;
    name: string;
    slug: string;
    type: 'guide' | 'homestay' | 'artisan' | 'tour_operator' | 'chef';
    avatar: string;
    coverImage: string;
    location: string;
    district: string;
    languages: string[];
    verified: boolean;
    superhost?: boolean;
    rating: number;
    reviews: number;
    experienceCount: number;
    yearsHosting: number;
    bio: string;
    specialties: string[];
    responseTime: string;
    responseRate: string;
    community?: string;
}

const hostTypes = [
    { id: 'all', label: 'All Hosts' },
    { id: 'guide', label: 'Local Guides' },
    { id: 'homestay', label: 'Homestay Owners' },
    { id: 'artisan', label: 'Artisans' },
    { id: 'tour_operator', label: 'Tour Operators' },
    { id: 'chef', label: 'Local Chefs' }
];

const districts = [
    'All Districts', 'Kamrup Metro', 'Golaghat', 'Majuli', 'Sivasagar',
    'Dibrugarh', 'Jorhat', 'Dhemaji', 'Kokrajhar', 'Karbi Anglong'
];

// Sample hosts data
const allHosts: Host[] = [
    {
        id: '1',
        name: 'Bhupen Borah',
        slug: 'bhupen-borah',
        type: 'guide',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
        location: 'Kaziranga',
        district: 'Golaghat',
        languages: ['English', 'Hindi', 'Assamese'],
        verified: true,
        superhost: true,
        rating: 4.9,
        reviews: 234,
        experienceCount: 5,
        yearsHosting: 15,
        bio: 'Born and raised near Kaziranga, I\'ve been a certified naturalist for 15 years. My passion is wildlife conservation and showing visitors the incredible biodiversity of our national park.',
        specialties: ['Wildlife Safari', 'Bird Watching', 'Conservation Tours'],
        responseTime: 'within 1 hour',
        responseRate: '100%'
    },
    {
        id: '2',
        name: 'Pranjal Saikia',
        slug: 'pranjal-saikia',
        type: 'guide',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
        location: 'Majuli Island',
        district: 'Majuli',
        languages: ['English', 'Assamese', 'Mising'],
        verified: true,
        superhost: true,
        rating: 4.8,
        reviews: 189,
        experienceCount: 4,
        yearsHosting: 8,
        bio: 'I grew up in a Satra on Majuli Island. I offer unique experiences exploring the Vaishnavite culture, mask-making traditions, and the Mising tribal villages of my homeland.',
        specialties: ['Satra Culture', 'Mask Making', 'Mising Village Tours'],
        responseTime: 'within 2 hours',
        responseRate: '98%',
        community: 'Mising'
    },
    {
        id: '3',
        name: 'Lakshmi Devi Das',
        slug: 'lakshmi-devi-das',
        type: 'artisan',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        location: 'Sualkuchi',
        district: 'Kamrup',
        languages: ['Assamese', 'Hindi'],
        verified: true,
        rating: 4.9,
        reviews: 156,
        experienceCount: 2,
        yearsHosting: 25,
        bio: 'Master weaver with 25 years of experience in traditional Muga and Pat silk weaving. I teach the ancient art of Assamese handloom, passed down through generations in my family.',
        specialties: ['Muga Silk Weaving', 'Pat Silk', 'Mekhela Sador Making'],
        responseTime: 'within 4 hours',
        responseRate: '95%'
    },
    {
        id: '4',
        name: 'Swmdwn Boro',
        slug: 'swmdwn-boro',
        type: 'homestay',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        location: 'Kokrajhar',
        district: 'Kokrajhar',
        languages: ['Bodo', 'Assamese', 'English', 'Hindi'],
        verified: true,
        superhost: true,
        rating: 4.8,
        reviews: 98,
        experienceCount: 3,
        yearsHosting: 6,
        bio: 'Welcome to my traditional Bodo homestay! I offer authentic cultural immersion experiences including Bagurumba dance lessons, Bodo cuisine cooking, and village tours.',
        specialties: ['Bodo Culture', 'Bagurumba Dance', 'Traditional Cuisine'],
        responseTime: 'within 3 hours',
        responseRate: '97%',
        community: 'Bodo'
    },
    {
        id: '5',
        name: 'Mibu Mili',
        slug: 'mibu-mili',
        type: 'homestay',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        location: 'Dhemaji',
        district: 'Dhemaji',
        languages: ['Mising', 'Assamese', 'Hindi', 'English'],
        verified: true,
        rating: 4.7,
        reviews: 87,
        experienceCount: 2,
        yearsHosting: 4,
        bio: 'Experience authentic Mising tribal life in our traditional stilted house by the Brahmaputra. I teach fishing, cooking, and take guests on village walks.',
        specialties: ['Mising Culture', 'Traditional Fishing', 'Tribal Cuisine'],
        responseTime: 'within 2 hours',
        responseRate: '96%',
        community: 'Mising'
    },
    {
        id: '6',
        name: 'Mancotta Heritage Estate',
        slug: 'mancotta-heritage',
        type: 'tour_operator',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=600&q=80',
        location: 'Dibrugarh',
        district: 'Dibrugarh',
        languages: ['English', 'Hindi', 'Assamese'],
        verified: true,
        superhost: true,
        rating: 4.9,
        reviews: 312,
        experienceCount: 6,
        yearsHosting: 18,
        bio: 'Third-generation tea planters offering heritage bungalow stays and authentic tea tourism experiences. Explore the world of Assam tea from plucking to tasting.',
        specialties: ['Tea Tourism', 'Heritage Stays', 'Plantation Tours'],
        responseTime: 'within 1 hour',
        responseRate: '100%'
    },
    {
        id: '7',
        name: 'Ranju Hazarika',
        slug: 'ranju-hazarika',
        type: 'chef',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
        location: 'Guwahati',
        district: 'Kamrup Metro',
        languages: ['Assamese', 'English', 'Hindi'],
        verified: true,
        rating: 4.8,
        reviews: 145,
        experienceCount: 3,
        yearsHosting: 10,
        bio: 'Chef and food researcher specializing in traditional Assamese cuisine. I offer cooking classes, food walks, and curated culinary experiences exploring the flavors of Assam.',
        specialties: ['Assamese Cuisine', 'Cooking Classes', 'Food Tours'],
        responseTime: 'within 2 hours',
        responseRate: '98%'
    },
    {
        id: '8',
        name: 'Kaziranga Eco Lodge',
        slug: 'kaziranga-eco-lodge',
        type: 'tour_operator',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
        location: 'Kaziranga',
        district: 'Golaghat',
        languages: ['English', 'Hindi', 'Assamese'],
        verified: true,
        superhost: true,
        rating: 4.9,
        reviews: 567,
        experienceCount: 8,
        yearsHosting: 12,
        bio: 'Family-run eco-lodge with 12 years of experience in sustainable wildlife tourism. Our team of expert naturalists offers unforgettable safari experiences.',
        specialties: ['Wildlife Safari', 'Eco-Tourism', 'Bird Watching'],
        responseTime: 'within 1 hour',
        responseRate: '100%'
    },
    {
        id: '9',
        name: 'Jonali Terang',
        slug: 'jonali-terang',
        type: 'guide',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        location: 'Diphu',
        district: 'Karbi Anglong',
        languages: ['Karbi', 'Assamese', 'English', 'Hindi'],
        verified: true,
        rating: 4.7,
        reviews: 65,
        experienceCount: 3,
        yearsHosting: 5,
        bio: 'First female trekking guide from Karbi Anglong. I specialize in hill treks, village immersion experiences, and sharing my Karbi culture with visitors.',
        specialties: ['Hill Trekking', 'Karbi Culture', 'Village Tours'],
        responseTime: 'within 3 hours',
        responseRate: '94%',
        community: 'Karbi'
    },
    {
        id: '10',
        name: 'Heritage Assam Tours',
        slug: 'heritage-assam-tours',
        type: 'tour_operator',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=600&q=80',
        location: 'Sivasagar',
        district: 'Sivasagar',
        languages: ['English', 'Assamese', 'Hindi'],
        verified: true,
        rating: 4.8,
        reviews: 203,
        experienceCount: 5,
        yearsHosting: 10,
        bio: 'Specialists in Ahom heritage and history tours. Our expert guides bring alive 600 years of Ahom dynasty through immersive experiences.',
        specialties: ['Ahom Heritage', 'Historical Tours', 'Archaeological Sites'],
        responseTime: 'within 2 hours',
        responseRate: '99%'
    }
];

export default function CommunityHostsPage() {
    const [selectedType, setSelectedType] = useState('all');
    const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter hosts
    const filteredHosts = allHosts.filter(host => {
        const matchesType = selectedType === 'all' || host.type === selectedType;
        const matchesDistrict = selectedDistrict === 'All Districts' || host.district === selectedDistrict;
        const matchesSearch = !searchQuery ||
            host.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            host.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            host.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesType && matchesDistrict && matchesSearch;
    });

    // Get type label
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'guide': return 'Local Guide';
            case 'homestay': return 'Homestay Host';
            case 'artisan': return 'Artisan';
            case 'tour_operator': return 'Tour Operator';
            case 'chef': return 'Local Chef';
            default: return type;
        }
    };

    // Get type color
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'guide': return 'var(--tea-garden)';
            case 'homestay': return 'var(--mekhela-red)';
            case 'artisan': return 'var(--muga-gold)';
            case 'tour_operator': return 'var(--brahma-blue)';
            case 'chef': return 'var(--earth-assam)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-20 relative overflow-hidden"
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

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="badge badge-muga mb-4">
                                <Users className="w-4 h-4" />
                                {allHosts.length}+ Verified Hosts
                            </span>
                            <h1
                                className="text-4xl md:text-5xl font-bold text-white mb-4"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Meet Our <span style={{ color: 'var(--muga-light)' }}>Community</span>
                            </h1>
                            <p className="text-lg text-white/80 max-w-2xl">
                                Connect with local guides, homestay hosts, artisans, and experts
                                who bring Assam's authentic experiences to life
                            </p>
                        </div>

                        <Link
                            href="/hosts/register"
                            className="btn-primary"
                            style={{ background: 'white', color: 'var(--tea-deep)' }}
                        >
                            Become a Host
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Filters */}
            <section className="py-6 sticky top-0 z-40" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}>
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search hosts, specialties..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-12 pr-10"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <X className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                </button>
                            )}
                        </div>

                        {/* Type Pills */}
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full lg:w-auto">
                            {hostTypes.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedType === type.id ? 'text-white shadow-lg' : ''
                                        }`}
                                    style={{
                                        background: selectedType === type.id ? 'var(--gradient-tea)' : 'var(--bg-card)',
                                        border: '1px solid var(--border-light)'
                                    }}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* District Filter */}
                    <div className="mt-4 flex items-center gap-4">
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

                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {filteredHosts.length} hosts found
                        </span>
                    </div>
                </div>
            </section>

            {/* Hosts Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    {filteredHosts.length === 0 ? (
                        <div className="text-center py-20">
                            <Users className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                            <h3 className="text-xl font-semibold mb-2">No hosts found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredHosts.map((host) => (
                                <Link
                                    key={host.id}
                                    href={`/hosts/${host.slug}`}
                                    className="experience-card group"
                                >
                                    {/* Cover Image */}
                                    <div className="relative h-40 overflow-hidden">
                                        <Image
                                            src={host.coverImage}
                                            alt={host.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 50%)' }}
                                        />

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span
                                                className="badge"
                                                style={{ background: `${getTypeColor(host.type)}20`, color: getTypeColor(host.type) }}
                                            >
                                                {getTypeLabel(host.type)}
                                            </span>
                                            {host.superhost && (
                                                <span className="badge badge-muga">
                                                    <Award className="w-3 h-3" /> Superhost
                                                </span>
                                            )}
                                        </div>

                                        {/* Avatar */}
                                        <div className="absolute -bottom-8 left-6">
                                            <Image
                                                src={host.avatar}
                                                alt={host.name}
                                                width={64}
                                                height={64}
                                                className="rounded-full border-4"
                                                style={{ borderColor: 'var(--bg-card)' }}
                                            />
                                            {host.verified && (
                                                <div
                                                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white"
                                                    style={{ background: 'var(--success)' }}
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 pt-12">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-semibold text-lg">{host.name}</h3>
                                                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                                    <MapPin className="w-4 h-4" />
                                                    {host.location}, {host.district}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                                <span className="font-semibold">{host.rating}</span>
                                            </div>
                                        </div>

                                        {host.community && (
                                            <span
                                                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                                                style={{ background: 'rgba(183, 28, 28, 0.1)', color: 'var(--mekhela-red)' }}
                                            >
                                                {host.community} Community
                                            </span>
                                        )}

                                        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                            {host.bio}
                                        </p>

                                        {/* Specialties */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {host.specialties.slice(0, 3).map((specialty, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 rounded-full text-xs"
                                                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                                                >
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div
                                            className="flex items-center justify-between pt-4 text-sm"
                                            style={{ borderTop: '1px solid var(--border-light)' }}
                                        >
                                            <div className="flex items-center gap-4" style={{ color: 'var(--text-muted)' }}>
                                                <span className="flex items-center gap-1">
                                                    <Star className="w-4 h-4" />
                                                    {host.reviews} reviews
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {host.experienceCount} experiences
                                                </span>
                                            </div>
                                            <span className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                                <Languages className="w-4 h-4" />
                                                {host.languages.length} languages
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Become a Host CTA */}
            <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container-custom">
                    <div
                        className="heritage-card overflow-hidden"
                        style={{ background: 'var(--gradient-muga)' }}
                    >
                        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                            <div>
                                <span className="badge mb-4" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                    <Heart className="w-4 h-4" />
                                    Join Our Community
                                </span>
                                <h2
                                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    Share Your Passion,<br />
                                    Earn With Purpose
                                </h2>
                                <p className="text-white/80 mb-6">
                                    Whether you're a local guide, homestay owner, artisan, or anyone
                                    with authentic Assam experiences to share — join our platform and
                                    turn your passion into sustainable income.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        'Set your own prices and availability',
                                        'Get verified and build your reputation',
                                        'Access booking management tools',
                                        'Connect with travelers worldwide'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-white/90">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/hosts/register"
                                    className="btn-primary"
                                    style={{ background: 'white', color: 'var(--muga-gold)' }}
                                >
                                    Start Hosting Today
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="relative h-64 md:h-80">
                                <Image
                                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80"
                                    alt="Community Host"
                                    fill
                                    className="object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
