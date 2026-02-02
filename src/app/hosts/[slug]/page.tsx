'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft, MapPin, Star, MessageCircle, Share2, Heart,
    Check, Clock, Globe, Languages, Award, Calendar, Users,
    ChevronRight, Shield
} from 'lucide-react';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ReviewForm } from '@/components/reviews/ReviewForm';

/* ============================================
   HOST PROFILE PAGE
   Community host details and experiences
   ============================================ */

// Sample host data
const sampleHost = {
    id: '1',
    name: 'Pranjal Saikia',
    slug: 'pranjal-saikia',
    type: 'guide',
    typeLabel: 'Local Guide',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    location: 'Majuli Island, Jorhat',
    district: 'Majuli',
    community: 'Mising',
    bio: `Born and raised in a Satra on Majuli Island, I have spent my life immersed in the rich Vaishnavite traditions and the vibrant Mising tribal culture. My journey as a guide began when I started sharing my home with curious travelers who wanted to understand our unique way of life.

Over the past 8 years, I have hosted hundreds of guests from around the world, taking them on journeys through our ancient Satras, teaching them the art of mask-making, and introducing them to the warm hospitality of Mising villages.

My mission is to preserve and share the cultural heritage of Majuli while ensuring that tourism benefits our local communities directly.`,
    languages: ['English', 'Assamese', 'Mising', 'Hindi'],
    specialties: ['Satra Culture', 'Mask Making', 'Mising Village Tours', 'Vaishnavite Heritage', 'Traditional Crafts'],
    verified: true,
    superhost: true,
    rating: 4.8,
    reviewCount: 189,
    yearsHosting: 8,
    responseTime: 'within 2 hours',
    responseRate: '98%',
    joinedDate: 'March 2018',
    totalGuests: 850,
    experiences: [
        {
            id: '1',
            title: 'Majuli Island: Living Heritage of the Satras',
            slug: 'majuli-satra-heritage',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
            duration: '3 Days / 2 Nights',
            price: 8500,
            rating: 4.8,
            reviewCount: 324,
            category: 'Tribal Immersion',
        },
        {
            id: '2',
            title: 'Mask Making Workshop with Master Artisan',
            slug: 'mask-making-workshop',
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
            duration: 'Half Day',
            price: 2500,
            rating: 4.9,
            reviewCount: 98,
            category: 'Handloom & Crafts',
        },
        {
            id: '3',
            title: 'Mising Village Stay & Cultural Evening',
            slug: 'mising-village-stay',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
            duration: '1 Night',
            price: 3500,
            rating: 4.7,
            reviewCount: 156,
            category: 'Homestay',
        },
    ],
    reviews: [
        {
            id: '1',
            author: 'Sarah M.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            rating: 5,
            date: 'December 2025',
            text: 'Pranjal is an incredible guide! His knowledge of Majuli\'s history and culture is encyclopedic, and his passion for sharing it is infectious. The Satra visit was a highlight of our India trip.',
            experience: 'Majuli Island: Living Heritage',
        },
        {
            id: '2',
            author: 'Rahul K.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            rating: 5,
            date: 'November 2025',
            text: 'The mask-making workshop was absolutely amazing. Pranjal connected us with a master craftsman and translated the entire experience. We learned so much about the symbolism behind the masks.',
            experience: 'Mask Making Workshop',
        },
        {
            id: '3',
            author: 'Emily T.',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
            rating: 5,
            date: 'October 2025',
            text: 'Staying with a Mising family was the most authentic travel experience I\'ve ever had. Pranjal made sure we were comfortable while still immersing us in local life. The rice beer was a bonus!',
            experience: 'Mising Village Stay',
        },
    ],
    highlights: [
        { label: 'Response Rate', value: '98%' },
        { label: 'Response Time', value: '2 hours' },
        { label: 'Guests Hosted', value: '850+' },
        { label: 'Years Hosting', value: '8' },
    ],
};

export default function HostProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [isSaved, setIsSaved] = useState(false);

    // In production, fetch host data by slug
    const host = sampleHost;

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Cover Image */}
            <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                    src={host.coverImage}
                    alt={host.name}
                    fill
                    className="object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}
                />

                {/* Back Button */}
                <Link
                    href="/communities"
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-colors"
                    style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </Link>

                {/* Actions */}
                <div className="absolute top-6 right-6 flex gap-2">
                    <button
                        onClick={() => setIsSaved(!isSaved)}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
                    >
                        <Heart
                            className="w-5 h-5 text-white"
                            style={{ fill: isSaved ? 'var(--mekhela-red)' : 'none', color: isSaved ? 'var(--mekhela-red)' : 'white' }}
                        />
                    </button>
                    <button
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
                    >
                        <Share2 className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container-custom relative -mt-24">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="heritage-card p-6 sticky top-24">
                            {/* Avatar */}
                            <div className="text-center -mt-20 mb-4">
                                <div className="relative inline-block">
                                    <Image
                                        src={host.avatar}
                                        alt={host.name}
                                        width={120}
                                        height={120}
                                        className="rounded-full object-cover ring-4 ring-[var(--bg-card)]"
                                    />
                                    {host.verified && (
                                        <div
                                            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white"
                                            style={{ background: 'var(--tea-garden)' }}
                                        >
                                            <Check className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Name & Badges */}
                            <div className="text-center mb-6">
                                <h1
                                    className="text-2xl font-bold"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {host.name}
                                </h1>
                                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                                    {host.typeLabel}
                                </p>
                                <div className="flex justify-center gap-2 mt-3">
                                    {host.verified && (
                                        <span className="badge badge-tea">
                                            <Shield className="w-3 h-3" />
                                            Verified
                                        </span>
                                    )}
                                    {host.superhost && (
                                        <span className="badge badge-muga">
                                            <Award className="w-3 h-3" />
                                            Superhost
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Rating */}
                            <div
                                className="flex items-center justify-center gap-4 py-4 mb-4"
                                style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}
                            >
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <Star className="w-5 h-5" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                        <span className="text-xl font-bold">{host.rating}</span>
                                    </div>
                                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Rating</span>
                                </div>
                                <div className="h-10 w-px" style={{ background: 'var(--border-light)' }} />
                                <div className="text-center">
                                    <span className="text-xl font-bold">{host.reviewCount}</span>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Reviews</p>
                                </div>
                                <div className="h-10 w-px" style={{ background: 'var(--border-light)' }} />
                                <div className="text-center">
                                    <span className="text-xl font-bold">{host.yearsHosting}</span>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Years</p>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                    <span>{host.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Users className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                    <span>{host.community} Community</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Globe className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                    <span>{host.languages.join(', ')}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Clock className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                    <span>Responds {host.responseTime}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                    <span>Hosting since {host.joinedDate}</span>
                                </div>
                            </div>

                            {/* Contact Button */}
                            <button className="btn-primary w-full mb-3">
                                <MessageCircle className="w-4 h-4" />
                                Contact {host.name.split(' ')[0]}
                            </button>
                            <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                                Usually responds within {host.responseTime}
                            </p>
                        </div>
                    </div>

                    {/* Right: Main Content */}
                    <div className="lg:col-span-2 pb-12">
                        {/* About */}
                        <section className="heritage-card p-6 mb-6">
                            <h2
                                className="text-xl font-bold mb-4"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                About {host.name.split(' ')[0]}
                            </h2>
                            <div className="prose max-w-none" style={{ color: 'var(--text-secondary)' }}>
                                {host.bio.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </section>

                        {/* Specialties */}
                        <section className="heritage-card p-6 mb-6">
                            <h2
                                className="text-xl font-bold mb-4"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Specialties
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {host.specialties.map((specialty, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 rounded-full text-sm font-medium"
                                        style={{ background: 'var(--bg-secondary)' }}
                                    >
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Experiences */}
                        <section className="heritage-card p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2
                                    className="text-xl font-bold"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    Experiences by {host.name.split(' ')[0]}
                                </h2>
                                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    {host.experiences.length} experiences
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {host.experiences.map((exp) => (
                                    <Link
                                        key={exp.id}
                                        href={`/experiences/${exp.slug}`}
                                        className="experience-card group block"
                                    >
                                        <div className="relative h-36 rounded-xl overflow-hidden mb-3">
                                            <Image
                                                src={exp.image}
                                                alt={exp.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <span
                                            className="text-xs font-medium"
                                            style={{ color: 'var(--tea-garden)' }}
                                        >
                                            {exp.category}
                                        </span>
                                        <h3 className="font-semibold text-sm line-clamp-2 mt-1">{exp.title}</h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm">
                                                <strong>₹{exp.price.toLocaleString()}</strong>
                                                <span style={{ color: 'var(--text-muted)' }}> / person</span>
                                            </span>
                                            <div className="flex items-center gap-1 text-sm">
                                                <Star className="w-3 h-3" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                                <span>{exp.rating}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Reviews */}
                        <section className="heritage-card p-6" id="reviews">
                            <div className="flex items-center justify-between mb-8">
                                <h2
                                    className="text-xl font-bold"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    Reviews
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                    <span className="font-semibold">{host.rating}</span>
                                    <span style={{ color: 'var(--text-muted)' }}>({host.reviewCount} reviews)</span>
                                </div>
                            </div>

                            <div className="mb-10">
                                <ReviewForm onSubmit={async (data) => {
                                    // In a real app, this would be an API call
                                    console.log('Submitted review:', data);
                                    await new Promise(resolve => setTimeout(resolve, 1000));
                                }} />
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-4 text-lg">Recent Reviews</h3>
                                <ReviewList reviews={host.reviews.map(r => ({
                                    id: r.id,
                                    userName: r.author,
                                    userAvatar: r.avatar,
                                    rating: r.rating,
                                    date: r.date,
                                    comment: r.text
                                }))} />
                            </div>

                            <button className="btn-ghost w-full mt-4">
                                View All {host.reviewCount} Reviews
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
