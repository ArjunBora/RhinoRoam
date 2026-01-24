'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft, MapPin, Star, Search, Filter, Calendar,
    Globe, Check, MessageCircle, Clock, Users, Award, Shield
} from 'lucide-react';

/* ============================================
   HIRE A LOCAL GUIDE PAGE
   Local Guide Directory
   ============================================ */

// Guide Expertise
const expertiseAreas = [
    { id: 'all', label: 'All Guides' },
    { id: 'wildlife', label: 'Wildlife & Nature' },
    { id: 'heritage', label: 'Heritage & History' },
    { id: 'tribal', label: 'Tribal Culture' },
    { id: 'tea', label: 'Tea Tourism' },
    { id: 'adventure', label: 'Adventure & Trekking' },
    { id: 'spiritual', label: 'Spiritual & Religious' },
    { id: 'photography', label: 'Photography Tours' },
];

// Sample Guides
const guides = [
    {
        id: '1',
        name: 'Raktim Hazarika',
        slug: 'raktim-hazarika',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        expertise: ['wildlife', 'photography'],
        expertiseLabels: ['Wildlife & Nature', 'Photography Tours'],
        location: 'Kaziranga',
        district: 'Golaghat',
        bio: '12+ years of guiding experience in Kaziranga. Certified naturalist with deep knowledge of one-horned rhino behavior and birdlife.',
        languages: ['English', 'Hindi', 'Assamese'],
        pricePerDay: 3500,
        currency: 'INR',
        rating: 4.9,
        reviewCount: 234,
        verified: true,
        superguide: true,
        yearsExperience: 12,
        toursCompleted: 450,
        responseTime: '< 1 hour',
        availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        certifications: ['Certified Naturalist', 'Wildlife First Aid'],
    },
    {
        id: '2',
        name: 'Pranjal Saikia',
        slug: 'pranjal-saikia',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
        expertise: ['tribal', 'heritage'],
        expertiseLabels: ['Tribal Culture', 'Heritage & History'],
        location: 'Majuli Island',
        district: 'Majuli',
        bio: 'Born and raised in a Satra. Expert in Vaishnavite culture, Mising tribal traditions, and the unique heritage of Majuli Island.',
        languages: ['English', 'Assamese', 'Mising', 'Hindi'],
        pricePerDay: 2500,
        currency: 'INR',
        rating: 4.8,
        reviewCount: 189,
        verified: true,
        superguide: true,
        yearsExperience: 8,
        toursCompleted: 320,
        responseTime: '< 2 hours',
        availability: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
        certifications: ['Cultural Heritage Guide'],
    },
    {
        id: '3',
        name: 'Dipankar Borah',
        slug: 'dipankar-borah',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        expertise: ['tea', 'heritage'],
        expertiseLabels: ['Tea Tourism', 'Heritage & History'],
        location: 'Dibrugarh',
        district: 'Dibrugarh',
        bio: 'Third-generation tea planter turned guide. Offers insider access to heritage tea estates and shares stories of colonial-era Assam.',
        languages: ['English', 'Hindi', 'Assamese', 'Bengali'],
        pricePerDay: 4000,
        currency: 'INR',
        rating: 4.9,
        reviewCount: 156,
        verified: true,
        superguide: false,
        yearsExperience: 15,
        toursCompleted: 280,
        responseTime: '< 3 hours',
        availability: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        certifications: ['Tea Tourism Expert'],
    },
    {
        id: '4',
        name: 'Swmdwn Boro',
        slug: 'swmdwn-boro',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        expertise: ['tribal', 'adventure'],
        expertiseLabels: ['Tribal Culture', 'Adventure & Trekking'],
        location: 'Kokrajhar',
        district: 'Kokrajhar',
        bio: 'Bodo cultural expert and adventure guide. Specializes in immersive tribal experiences and trekking in the BTR region.',
        languages: ['Bodo', 'Assamese', 'English', 'Hindi'],
        pricePerDay: 2000,
        currency: 'INR',
        rating: 4.7,
        reviewCount: 98,
        verified: true,
        superguide: false,
        yearsExperience: 6,
        toursCompleted: 180,
        responseTime: '< 4 hours',
        availability: ['Mon', 'Wed', 'Thu', 'Sat', 'Sun'],
        certifications: ['Adventure Guide', 'First Aid'],
    },
    {
        id: '5',
        name: 'Karbi Terang',
        slug: 'karbi-terang',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        expertise: ['tribal', 'adventure'],
        expertiseLabels: ['Tribal Culture', 'Adventure & Trekking'],
        location: 'Diphu',
        district: 'Karbi Anglong',
        bio: 'Karbi tribal guide specializing in hill treks, cultural immersion, and secret waterfalls of Karbi Anglong.',
        languages: ['Karbi', 'Assamese', 'English', 'Hindi'],
        pricePerDay: 1800,
        currency: 'INR',
        rating: 4.6,
        reviewCount: 67,
        verified: true,
        superguide: false,
        yearsExperience: 5,
        toursCompleted: 120,
        responseTime: '< 6 hours',
        availability: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat'],
        certifications: ['Trekking Guide'],
    },
    {
        id: '6',
        name: 'Lakshmi Devi',
        slug: 'lakshmi-devi',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        expertise: ['spiritual', 'heritage'],
        expertiseLabels: ['Spiritual & Religious', 'Heritage & History'],
        location: 'Guwahati',
        district: 'Kamrup Metro',
        bio: 'Temple tour specialist with deep knowledge of Shakti Peethas and Kamakhya traditions. Offers authentic spiritual experiences.',
        languages: ['Hindi', 'English', 'Assamese', 'Bengali'],
        pricePerDay: 2500,
        currency: 'INR',
        rating: 4.8,
        reviewCount: 145,
        verified: true,
        superguide: true,
        yearsExperience: 10,
        toursCompleted: 380,
        responseTime: '< 2 hours',
        availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        certifications: ['Heritage Guide', 'Tantric Studies'],
    },
];

export default function GuidesPage() {
    const [selectedExpertise, setSelectedExpertise] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 5000]);

    // Filter guides
    const filteredGuides = guides.filter(guide => {
        const matchesExpertise = selectedExpertise === 'all' || guide.expertise.includes(selectedExpertise);
        const matchesSearch = guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.expertiseLabels.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesPrice = guide.pricePerDay >= priceFilter[0] && guide.pricePerDay <= priceFilter[1];
        return matchesExpertise && matchesSearch && matchesPrice;
    });

    // Sort: Superguides first, then by rating
    const sortedGuides = [...filteredGuides].sort((a, b) => {
        if (a.superguide && !b.superguide) return -1;
        if (!a.superguide && b.superguide) return 1;
        return b.rating - a.rating;
    });

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

                    <div className="max-w-2xl">
                        <span className="badge badge-muga mb-4">
                            <Users className="w-4 h-4" />
                            Expert Guides
                        </span>
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Hire a <span style={{ color: 'var(--muga-light)' }}>Local Guide</span>
                        </h1>
                        <p className="text-lg text-white/80">
                            Connect with verified local experts for authentic, personalized experiences
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
                                placeholder="Search guides, locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>

                        {/* Expertise Filter */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            {expertiseAreas.map((area) => (
                                <button
                                    key={area.id}
                                    onClick={() => setSelectedExpertise(area.id)}
                                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedExpertise === area.id ? 'text-white' : ''
                                        }`}
                                    style={{
                                        background: selectedExpertise === area.id ? 'var(--gradient-tea)' : 'var(--bg-card)',
                                        border: '1px solid var(--border-light)'
                                    }}
                                >
                                    {area.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Guides List */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold">
                            {sortedGuides.length} guides available
                        </h2>
                        <select className="input-field py-2 w-auto">
                            <option>Sort by: Recommended</option>
                            <option>Rating: High to Low</option>
                            <option>Price: Low to High</option>
                            <option>Experience</option>
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedGuides.map((guide) => (
                            <GuideCard key={guide.id} guide={guide} />
                        ))}
                    </div>

                    {sortedGuides.length === 0 && (
                        <div className="text-center py-12">
                            <p style={{ color: 'var(--text-muted)' }}>
                                No guides found matching your criteria
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works */}
            <section
                className="section-padding"
                style={{ background: 'var(--bg-secondary)' }}
            >
                <div className="container-custom">
                    <h2
                        className="text-2xl font-bold text-center mb-10"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                style={{ background: 'var(--gradient-tea)' }}
                            >
                                <span className="text-white text-2xl font-bold">1</span>
                            </div>
                            <h3 className="font-semibold mb-2">Browse Guides</h3>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Filter by expertise, location, and availability to find your perfect guide
                            </p>
                        </div>
                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                style={{ background: 'var(--gradient-tea)' }}
                            >
                                <span className="text-white text-2xl font-bold">2</span>
                            </div>
                            <h3 className="font-semibold mb-2">Send Request</h3>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Contact the guide with your dates and requirements. No payment required yet.
                            </p>
                        </div>
                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                style={{ background: 'var(--gradient-tea)' }}
                            >
                                <span className="text-white text-2xl font-bold">3</span>
                            </div>
                            <h3 className="font-semibold mb-2">Confirm & Go</h3>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Once confirmed, meet your guide and enjoy an authentic local experience
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="container-custom text-center max-w-2xl mx-auto">
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Are you a local guide?
                    </h2>
                    <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                        Join RhinoRoam to connect with travelers who value authentic, local experiences.
                    </p>
                    <Link href="/hosts/register" className="btn-primary">
                        Register as Guide
                    </Link>
                </div>
            </section>
        </div>
    );
}

// Guide Card Component
function GuideCard({ guide }: { guide: typeof guides[0] }) {
    return (
        <div className="heritage-card p-5">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                    <Image
                        src={guide.avatar}
                        alt={guide.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                    />
                    {guide.verified && (
                        <div
                            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white"
                            style={{ background: 'var(--tea-garden)' }}
                        >
                            <Check className="w-3 h-3" />
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{guide.name}</h3>
                        {guide.superguide && (
                            <Award className="w-4 h-4" style={{ color: 'var(--muga-gold)' }} />
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <MapPin className="w-3 h-3" />
                        {guide.location}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                        <span className="text-sm font-medium">{guide.rating}</span>
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            ({guide.reviewCount} reviews)
                        </span>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {guide.expertiseLabels.map((label, idx) => (
                    <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ background: 'var(--bg-secondary)' }}
                    >
                        {label}
                    </span>
                ))}
            </div>

            {/* Bio */}
            <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {guide.bio}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
                <div
                    className="p-2 rounded-lg"
                    style={{ background: 'var(--bg-secondary)' }}
                >
                    <p className="font-semibold">{guide.yearsExperience}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Years</p>
                </div>
                <div
                    className="p-2 rounded-lg"
                    style={{ background: 'var(--bg-secondary)' }}
                >
                    <p className="font-semibold">{guide.toursCompleted}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tours</p>
                </div>
                <div
                    className="p-2 rounded-lg"
                    style={{ background: 'var(--bg-secondary)' }}
                >
                    <p className="font-semibold">{guide.languages.length}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Languages</p>
                </div>
            </div>

            {/* Languages */}
            <div className="flex items-center gap-2 text-sm mb-4">
                <Globe className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                    {guide.languages.join(', ')}
                </span>
            </div>

            {/* Footer */}
            <div
                className="pt-4 flex items-center justify-between"
                style={{ borderTop: '1px solid var(--border-light)' }}
            >
                <div>
                    <span className="text-xl font-bold" style={{ color: 'var(--tea-deep)' }}>
                        ₹{guide.pricePerDay.toLocaleString()}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}> / day</span>
                </div>
                <button className="btn-primary text-sm py-2">
                    <MessageCircle className="w-4 h-4" />
                    Contact
                </button>
            </div>
        </div>
    );
}
