'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft, MapPin, Clock, Navigation, Star, Users,
    Compass, Camera, Mountain, Bird, Heart, Check, ChevronRight,
    Play, Download
} from 'lucide-react';

/* ============================================
   HERITAGE TRAILS PAGE
   Curated walking/driving routes
   ============================================ */

// Sample Heritage Trails
const heritageTrails = [
    {
        id: '1',
        name: 'Ahom Heritage Trail',
        slug: 'ahom-heritage-trail',
        tagline: '600 Years of Royal Legacy',
        description: 'Journey through the magnificent architectural marvels of the Ahom Kingdom that ruled Assam for 600 years. This trail covers the royal amphitheatre, underground palaces, and sacred tanks that speak of a glorious past.',
        heroImage: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=1200&q=80',
        district: 'Sivasagar',
        theme: 'Royal Heritage',
        duration: '1 Day',
        durationHours: 8,
        distance: '15 km',
        difficulty: 'Easy',
        bestTime: 'October - March',
        rating: 4.8,
        reviewCount: 245,
        stops: [
            {
                order: 1,
                name: 'Rang Ghar',
                description: 'Asia\'s oldest surviving amphitheatre where royals watched buffalo fights',
                duration: '1 hour',
                image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=400&q=80',
            },
            {
                order: 2,
                name: 'Talatal Ghar',
                description: 'Seven-storied palace with three underground floors and secret tunnels',
                duration: '1.5 hours',
                image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80',
            },
            {
                order: 3,
                name: 'Sivasagar Tank',
                description: 'One of Asia\'s largest man-made tanks surrounded by historic temples',
                duration: '45 mins',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
            },
            {
                order: 4,
                name: 'Shiva Doul',
                description: '180-feet tall Shiva temple with stunning Ahom architecture',
                duration: '30 mins',
                image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=400&q=80',
            },
        ],
        highlights: [
            'Asia\'s oldest amphitheatre',
            'Underground tunnels exploration',
            'Sunset at Sivasagar Tank',
            'Ahom architectural marvels'
        ],
        included: ['Audio guide', 'Entry fees', 'Lunch'],
        tips: [
            'Wear comfortable walking shoes',
            'Carry water and sunscreen',
            'Best visited early morning',
            'Hire a local guide for stories'
        ],
    },
    {
        id: '2',
        name: 'Spiritual Guwahati Walk',
        slug: 'spiritual-guwahati-walk',
        tagline: 'Sacred Temples & Mystical Energy',
        description: 'Discover the spiritual heart of Assam through its ancient temples. From the powerful Kamakhya on Nilachal Hill to the river island of Umananda, experience the mystical energy that draws pilgrims from around the world.',
        heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
        district: 'Kamrup Metro',
        theme: 'Spiritual Journey',
        duration: 'Half Day',
        durationHours: 5,
        distance: '12 km',
        difficulty: 'Moderate',
        bestTime: 'Year-round (except Ambubachi week)',
        rating: 4.7,
        reviewCount: 412,
        stops: [
            {
                order: 1,
                name: 'Kamakhya Temple',
                description: 'One of the most sacred Shakti Peethas, atop Nilachal Hill',
                duration: '2 hours',
                image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80',
            },
            {
                order: 2,
                name: 'Umananda Temple',
                description: 'Shiva temple on Peacock Island, accessed by ferry',
                duration: '1.5 hours',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
            },
            {
                order: 3,
                name: 'Navagraha Temple',
                description: 'Temple dedicated to the nine celestial bodies',
                duration: '45 mins',
                image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=400&q=80',
            },
        ],
        highlights: [
            'Powerful Shakti Peetha',
            'Ferry ride to Umananda',
            'Panoramic city views',
            'Ancient tantric traditions'
        ],
        included: ['Guide', 'Ferry tickets', 'Temple offerings'],
        tips: [
            'Dress modestly (no shorts)',
            'Remove leather items',
            'Be prepared for long queues at Kamakhya',
            'Respect local customs'
        ],
    },
    {
        id: '3',
        name: 'Majuli Island Cultural Trail',
        slug: 'majuli-cultural-trail',
        tagline: 'Living Museum of Vaishnavite Culture',
        description: 'Explore the world\'s largest river island and witness 500-year-old Vaishnavite Satra traditions. This immersive trail takes you through ancient monasteries, mask-making workshops, and traditional Mising villages.',
        heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
        district: 'Majuli',
        theme: 'Cultural Heritage',
        duration: '2 Days',
        durationHours: 16,
        distance: '30 km',
        difficulty: 'Easy',
        bestTime: 'October - March',
        rating: 4.9,
        reviewCount: 189,
        stops: [
            {
                order: 1,
                name: 'Kamalabari Satra',
                description: 'One of the oldest and most active Satras with Sattriya dance',
                duration: '2 hours',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
            },
            {
                order: 2,
                name: 'Auniati Satra',
                description: 'Famous for its museum of Ahom artifacts and manuscripts',
                duration: '1.5 hours',
                image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80',
            },
            {
                order: 3,
                name: 'Mask Making Village',
                description: 'Watch artisans create traditional masks used in Sattriya performances',
                duration: '2 hours',
                image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=400&q=80',
            },
            {
                order: 4,
                name: 'Mising Village',
                description: 'Experience the unique stilt-house culture of the riverine Mising tribe',
                duration: '3 hours',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
            },
        ],
        highlights: [
            'World\'s largest river island',
            'Ancient Satra traditions',
            'Mask-making workshop',
            'Mising tribal culture'
        ],
        included: ['Ferry', 'Bicycle', 'Satra donations', 'Local guide'],
        tips: [
            'Book ferry in advance',
            'Carry cash (limited ATMs)',
            'Cycling is the best way to explore',
            'Respect Satra monks and rules'
        ],
    },
    {
        id: '4',
        name: 'Tea Heritage Circuit',
        slug: 'tea-heritage-circuit',
        tagline: 'From Leaf to Cup',
        description: 'Trace the 150-year history of Assam tea through colonial bungalows, working gardens, and heritage factories. Understand the journey from leaf to cup while staying in authentic tea planter accommodations.',
        heroImage: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=1200&q=80',
        district: 'Dibrugarh / Jorhat',
        theme: 'Heritage & Agriculture',
        duration: '2 Days',
        durationHours: 20,
        distance: '80 km',
        difficulty: 'Easy',
        bestTime: 'March - November',
        rating: 4.8,
        reviewCount: 156,
        stops: [
            {
                order: 1,
                name: 'Mancotta Tea Estate',
                description: 'One of Assam\'s oldest tea estates with heritage bungalow stay',
                duration: 'Overnight',
                image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=400&q=80',
            },
            {
                order: 2,
                name: 'Tea Plucking Experience',
                description: 'Join workers in the garden for authentic tea plucking',
                duration: '2 hours',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
            },
            {
                order: 3,
                name: 'Factory Tour',
                description: 'See the CTC and Orthodox processing methods',
                duration: '1.5 hours',
                image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=400&q=80',
            },
            {
                order: 4,
                name: 'High Tea & Tasting',
                description: 'Learn to taste tea like an expert with a tea taster',
                duration: '2 hours',
                image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80',
            },
        ],
        highlights: [
            'Stay in colonial bungalow',
            'Pluck tea with workers',
            'Factory processing tour',
            'Professional tea tasting'
        ],
        included: ['Bungalow stay', 'All meals', 'Factory tour', 'Tea gift'],
        tips: [
            'Wake early for garden visits',
            'Wear comfortable shoes',
            'Plucking season is March-November',
            'Carry camera for garden shots'
        ],
    },
];

export default function TrailsPage() {
    const [selectedTrail, setSelectedTrail] = useState<typeof heritageTrails[0] | null>(null);

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
                        <span className="badge badge-muga mb-4">
                            <Compass className="w-4 h-4" />
                            Curated Journeys
                        </span>
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Heritage <span style={{ color: 'var(--muga-light)' }}>Trails</span>
                        </h1>
                        <p className="text-lg text-white/80">
                            Curated walking and driving routes through Assam's history, culture, and natural beauty
                        </p>
                    </div>
                </div>
            </header>

            {/* Trail List */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid gap-8">
                        {heritageTrails.map((trail, idx) => (
                            <div
                                key={trail.id}
                                className="heritage-card overflow-hidden"
                            >
                                <div className={`grid md:grid-cols-2 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Image */}
                                    <div className="relative h-64 md:h-auto">
                                        <Image
                                            src={trail.heroImage}
                                            alt={trail.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent" />
                                        <div className="absolute bottom-4 left-4 md:hidden">
                                            <span className="badge badge-tea">{trail.theme}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8">
                                        <div className="hidden md:block mb-3">
                                            <span className="badge badge-tea">{trail.theme}</span>
                                        </div>
                                        <h2
                                            className="text-2xl font-bold mb-2"
                                            style={{ fontFamily: 'var(--font-heading)' }}
                                        >
                                            {trail.name}
                                        </h2>
                                        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                                            {trail.tagline}
                                        </p>
                                        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                                            {trail.description.slice(0, 200)}...
                                        </p>

                                        {/* Stats */}
                                        <div className="flex flex-wrap gap-4 mb-6 text-sm">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                                {trail.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Navigation className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                                {trail.distance}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                                {trail.district}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Star className="w-4 h-4" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                                {trail.rating} ({trail.reviewCount})
                                            </span>
                                        </div>

                                        {/* Stops Preview */}
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="text-sm font-medium">{trail.stops.length} stops:</span>
                                            <div className="flex -space-x-2">
                                                {trail.stops.slice(0, 4).map((stop) => (
                                                    <div
                                                        key={stop.order}
                                                        className="w-8 h-8 rounded-full bg-cover bg-center border-2"
                                                        style={{
                                                            backgroundImage: `url(${stop.image})`,
                                                            borderColor: 'var(--bg-card)'
                                                        }}
                                                        title={stop.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <Link
                                                href={`/trails/${trail.slug}`}
                                                className="btn-primary"
                                            >
                                                View Trail
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                            <button className="btn-ghost">
                                                <Download className="w-4 h-4" />
                                                Download Map
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
                        Can't find the perfect trail?
                    </h2>
                    <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                        Let our AI create a personalized itinerary based on your interests, duration, and travel style.
                    </p>
                    <Link href="/plan" className="btn-primary">
                        Create Custom Trail
                    </Link>
                </div>
            </section>
        </div>
    );
}
