'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    MapPin, Calendar, Clock, Users, Star, Heart, Share2,
    ChevronLeft, ChevronRight, Check, AlertCircle, Leaf,
    Sun, Cloud, Thermometer, Camera, Shield, Languages
} from 'lucide-react';

/* ============================================
   EXPERIENCE DETAIL PAGE
   [slug] - Dynamic Experience Page
   ============================================ */

// Sample experience data (in production, fetch from API based on slug)
const sampleExperience = {
    id: '1',
    title: 'Kaziranga Safari: Track the One-Horned Rhino',
    slug: 'kaziranga-rhino-safari',
    tagline: 'Experience the thrill of spotting the majestic one-horned rhinoceros in their natural habitat',
    location: 'Kaziranga National Park',
    district: 'Golaghat',
    region: 'Central Assam',
    category: 'Wildlife Safari',
    duration: '2 Days / 1 Night',
    difficulty: 'Easy',
    groupSize: '2-6 people',
    languages: ['English', 'Hindi', 'Assamese'],
    description: `Embark on an unforgettable journey into the heart of Kaziranga National Park, a UNESCO World Heritage Site and home to two-thirds of the world's one-horned rhinoceros population.

This carefully crafted experience combines the magic of an early morning elephant safari with the excitement of a jeep safari, giving you the best chance to spot not just rhinos, but also wild elephants, water buffaloes, swamp deer, and if you're lucky, the elusive Bengal tiger.

Your local naturalist guide, with years of experience in the park, will share insights about conservation efforts, animal behavior, and the ecosystem of this remarkable landscape.`,

    images: [
        'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=1200&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    ],

    rating: 4.9,
    reviewCount: 567,
    reviewBreakdown: {
        5: 485,
        4: 62,
        3: 15,
        2: 3,
        1: 2
    },

    price: 12000,
    priceType: 'per person',
    minGroupSize: 2,
    maxGroupSize: 6,

    host: {
        name: 'Kaziranga Eco Lodge',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        verified: true,
        rating: 4.9,
        totalExperiences: 8,
        yearsHosting: 12,
        languages: ['English', 'Hindi', 'Assamese'],
        bio: 'Family-run eco-lodge with 12 years of experience in sustainable wildlife tourism. Our naturalists have deep local knowledge and are passionate about conservation.',
        responseTime: 'within 2 hours',
        responseRate: '98%'
    },

    highlights: [
        'Elephant Safari at dawn through the grasslands',
        'Jeep Safari across multiple ranges',
        'Expert naturalist guide',
        'Bird watching with 480+ species',
        'Nature walk along the park boundary',
        'Authentic Assamese dinner'
    ],

    itinerary: [
        {
            day: 1,
            title: 'Arrival & Evening Safari',
            activities: [
                { time: '14:00', activity: 'Check-in at Kaziranga Eco Lodge' },
                { time: '14:30', activity: 'Welcome drink & orientation' },
                { time: '15:00', activity: 'Afternoon Jeep Safari (Central Range)' },
                { time: '18:00', activity: 'Return to lodge, evening tea' },
                { time: '19:30', activity: 'Traditional Assamese dinner' },
                { time: '21:00', activity: 'Night photography session (optional)' }
            ]
        },
        {
            day: 2,
            title: 'Dawn Safari & Departure',
            activities: [
                { time: '05:00', activity: 'Early morning Elephant Safari' },
                { time: '07:30', activity: 'Breakfast at lodge' },
                { time: '09:00', activity: 'Jeep Safari (Western Range)' },
                { time: '12:00', activity: 'Lunch & checkout' },
                { time: '13:00', activity: 'Visit Kaziranga Orchid Park (optional)' },
                { time: '14:00', activity: 'Departure' }
            ]
        }
    ],

    included: [
        '1 night accommodation at eco-lodge',
        'All meals (1 dinner, 1 breakfast, 1 lunch)',
        '2 Jeep safari permits',
        '1 Elephant safari permit',
        'Naturalist guide for all safaris',
        'Park entry fees',
        'Still camera fees',
        'Bottled water & refreshments'
    ],

    notIncluded: [
        'Transportation to/from Kaziranga',
        'Video camera fees (₹500 extra)',
        'Personal expenses',
        'Travel insurance',
        'Tips & gratuities'
    ],

    requirements: [
        'Minimum age: 5 years',
        'Comfortable walking shoes',
        'Neutral colored clothing (avoid bright colors)',
        'Binoculars (or rent from lodge)',
        'Camera with zoom lens recommended',
        'Sun protection & insect repellent'
    ],

    bestSeason: 'November - April',
    seasonInfo: {
        peak: ['November', 'December', 'January', 'February'],
        good: ['March', 'April', 'October'],
        closed: ['May', 'June', 'July', 'August', 'September']
    },

    weather: {
        winter: { temp: '8-22°C', description: 'Cool and pleasant, best visibility' },
        spring: { temp: '15-28°C', description: 'Warming up, grass burns reveal animals' },
        monsoon: { temp: '25-32°C', description: 'Park closed due to flooding' }
    },

    cancellationPolicy: 'Full refund if cancelled 7+ days before. 50% refund if cancelled 3-7 days before. No refund within 3 days.',

    sustainability: [
        'Carbon neutral operations',
        'Local community employment',
        'Conservation contribution (₹500 per guest)',
        'Zero single-use plastic',
        'Solar-powered lodge'
    ],

    reviewsData: [
        {
            id: '1',
            author: 'Priya Sharma',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            rating: 5,
            date: 'January 2026',
            text: 'Absolutely magical experience! We saw 8 rhinos on our elephant safari, including a mother with a calf. Our guide Bhupen was incredibly knowledgeable.',
            helpful: 24
        },
        {
            id: '2',
            author: 'Amit Patel',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            rating: 5,
            date: 'December 2025',
            text: 'Best wildlife experience in India! The eco-lodge was comfortable, food was delicious, and the safaris were well-organized. Spotted a tiger on our last safari!',
            helpful: 18
        },
        {
            id: '3',
            author: 'Sarah Williams',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
            rating: 4,
            date: 'November 2025',
            text: 'Great experience overall. The elephant safari at dawn was surreal. Only giving 4 stars because the jeep was a bit uncomfortable.',
            helpful: 12
        }
    ],

    similarExperiences: [
        {
            id: '2',
            title: 'Manas Tiger Reserve Safari',
            slug: 'manas-tiger-safari',
            image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&q=80',
            price: 14000,
            rating: 4.7,
            duration: '3 Days'
        },
        {
            id: '3',
            title: 'Pobitora Wildlife Sanctuary',
            slug: 'pobitora-rhino-safari',
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
            price: 3500,
            rating: 4.5,
            duration: '1 Day'
        }
    ],

    coordinates: { lat: 26.5775, lng: 93.1711 }
};

export default function ExperienceDetailPage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [guests, setGuests] = useState(2);
    const [isSaved, setIsSaved] = useState(false);

    const exp = sampleExperience;
    const totalPrice = exp.price * guests;

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-4 sticky top-0 z-50"
                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}
            >
                <div className="container-custom flex items-center justify-between">
                    <Link
                        href="/experiences"
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Experiences
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                        <button
                            onClick={() => setIsSaved(!isSaved)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all`}
                            style={{
                                background: isSaved ? 'var(--mekhela-red)' : 'var(--bg-secondary)',
                                color: isSaved ? 'white' : 'inherit'
                            }}
                        >
                            <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                            Save
                        </button>
                    </div>
                </div>
            </header>

            {/* Image Gallery */}
            <section className="relative h-96 md:h-[500px] overflow-hidden">
                <Image
                    src={exp.images[currentImageIndex]}
                    alt={exp.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 50%)' }}
                />

                {/* Image Navigation */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {exp.images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Arrow Navigation */}
                <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? exp.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.9)' }}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setCurrentImageIndex(prev => prev === exp.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.9)' }}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Thumbnail Strip */}
                <div className="absolute bottom-6 right-6 hidden md:flex gap-2">
                    {exp.images.slice(0, 4).map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-white scale-110' : 'border-transparent opacity-70'
                                }`}
                        >
                            <Image src={img} alt="" fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Title & Meta */}
                            <div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="badge badge-tea">{exp.category}</span>
                                    <span className="badge badge-river">{exp.district}</span>
                                </div>

                                <h1
                                    className="text-3xl md:text-4xl font-bold mb-4"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {exp.title}
                                </h1>

                                <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
                                    {exp.tagline}
                                </p>

                                <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5" style={{ color: 'var(--brahma-blue)' }} />
                                        {exp.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" style={{ color: 'var(--tea-garden)' }} />
                                        {exp.duration}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5" style={{ color: 'var(--muga-gold)' }} />
                                        {exp.groupSize}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                        <span className="font-semibold">{exp.rating}</span>
                                        <span>({exp.reviewCount} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Host Card */}
                            <div className="heritage-card p-6">
                                <div className="flex items-start gap-4">
                                    <Image
                                        src={exp.host.image}
                                        alt={exp.host.name}
                                        width={80}
                                        height={80}
                                        className="rounded-xl"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-lg">{exp.host.name}</h3>
                                            {exp.host.verified && (
                                                <span className="badge badge-verified">
                                                    <Shield className="w-3 h-3" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                                            Hosting for {exp.host.yearsHosting} years • {exp.host.totalExperiences} experiences
                                        </p>
                                        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                                            {exp.host.bio}
                                        </p>
                                        <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                                            <span className="flex items-center gap-1">
                                                <Languages className="w-4 h-4" />
                                                {exp.host.languages.join(', ')}
                                            </span>
                                            <span>Response rate: {exp.host.responseRate}</span>
                                            <span>Responds {exp.host.responseTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    About This Experience
                                </h2>
                                <div className="prose" style={{ color: 'var(--text-secondary)' }}>
                                    {exp.description.split('\n\n').map((para, idx) => (
                                        <p key={idx} className="mb-4">{para}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Highlights */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Experience Highlights
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {exp.highlights.map((highlight, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-4 rounded-xl"
                                            style={{ background: 'var(--bg-secondary)' }}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{ background: 'var(--gradient-tea)' }}
                                            >
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-sm font-medium">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Itinerary
                                </h2>
                                <div className="space-y-6">
                                    {exp.itinerary.map((day) => (
                                        <div key={day.day} className="heritage-card p-6">
                                            <div
                                                className="flex items-center gap-3 mb-4 pb-4"
                                                style={{ borderBottom: '1px solid var(--border-light)' }}
                                            >
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
                                                    style={{ background: 'var(--gradient-muga)' }}
                                                >
                                                    {day.day}
                                                </div>
                                                <h3 className="font-semibold">{day.title}</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {day.activities.map((activity, idx) => (
                                                    <div key={idx} className="flex gap-4 items-start">
                                                        <span
                                                            className="text-sm font-medium w-14 flex-shrink-0"
                                                            style={{ color: 'var(--brahma-blue)' }}
                                                        >
                                                            {activity.time}
                                                        </span>
                                                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                            {activity.activity}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* What's Included */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        What's Included
                                    </h2>
                                    <ul className="space-y-2">
                                        {exp.included.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--success)' }} />
                                                <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Not Included
                                    </h2>
                                    <ul className="space-y-2">
                                        {exp.notIncluded.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                                                <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Best Season */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Best Time to Visit
                                </h2>
                                <div className="heritage-card p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Sun className="w-6 h-6" style={{ color: 'var(--muga-gold)' }} />
                                        <span className="font-semibold">Peak Season: {exp.bestSeason}</span>
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-xl" style={{ background: 'rgba(46, 125, 50, 0.1)' }}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Thermometer className="w-4 h-4" style={{ color: 'var(--success)' }} />
                                                <span className="font-medium text-sm">Winter</span>
                                            </div>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                {exp.weather.winter.temp} - {exp.weather.winter.description}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Thermometer className="w-4 h-4" style={{ color: 'var(--muga-gold)' }} />
                                                <span className="font-medium text-sm">Spring</span>
                                            </div>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                {exp.weather.spring.temp} - {exp.weather.spring.description}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl" style={{ background: 'rgba(198, 40, 40, 0.1)' }}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Cloud className="w-4 h-4" style={{ color: 'var(--error)' }} />
                                                <span className="font-medium text-sm">Monsoon</span>
                                            </div>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                {exp.weather.monsoon.temp} - {exp.weather.monsoon.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sustainability */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Our Sustainability Commitment
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {exp.sustainability.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                                            style={{ background: 'rgba(27, 77, 46, 0.1)', color: 'var(--tea-deep)' }}
                                        >
                                            <Leaf className="w-4 h-4" />
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Reviews ({exp.reviewCount})
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-6 h-6" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                        <span className="text-2xl font-bold">{exp.rating}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {exp.reviewsData.map((review) => (
                                        <div
                                            key={review.id}
                                            className="p-6 rounded-xl"
                                            style={{ background: 'var(--bg-secondary)' }}
                                        >
                                            <div className="flex items-start gap-4 mb-4">
                                                <Image
                                                    src={review.avatar}
                                                    alt={review.author}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-full"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-semibold">{review.author}</h4>
                                                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                            {review.date}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className="w-4 h-4"
                                                                style={{
                                                                    color: i < review.rating ? 'var(--muga-gold)' : 'var(--border-light)',
                                                                    fill: i < review.rating ? 'var(--muga-gold)' : 'none'
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                                                {review.text}
                                            </p>
                                            <button
                                                className="text-sm"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                Helpful ({review.helpful})
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className="lg:col-span-1">
                            <div
                                className="sticky top-24 heritage-card p-6 space-y-6"
                                style={{ boxShadow: 'var(--shadow-lg)' }}
                            >
                                <div>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-3xl font-bold" style={{ color: 'var(--tea-deep)' }}>
                                            ₹{exp.price.toLocaleString()}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)' }}>/ {exp.priceType}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <Star className="w-4 h-4" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                        <span className="font-semibold">{exp.rating}</span>
                                        <span style={{ color: 'var(--text-muted)' }}>({exp.reviewCount} reviews)</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Select Date</label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="input-field"
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Number of Guests</label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setGuests(Math.max(exp.minGroupSize, guests - 1))}
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                                                style={{ background: 'var(--bg-secondary)' }}
                                                disabled={guests <= exp.minGroupSize}
                                            >
                                                -
                                            </button>
                                            <span className="text-xl font-semibold">{guests}</span>
                                            <button
                                                onClick={() => setGuests(Math.min(exp.maxGroupSize, guests + 1))}
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                                                style={{ background: 'var(--bg-secondary)' }}
                                                disabled={guests >= exp.maxGroupSize}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                                            {exp.minGroupSize}-{exp.maxGroupSize} guests allowed
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="pt-4 space-y-2"
                                    style={{ borderTop: '1px solid var(--border-light)' }}
                                >
                                    <div className="flex justify-between text-sm">
                                        <span>₹{exp.price.toLocaleString()} × {guests} guests</span>
                                        <span>₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Service fee</span>
                                        <span>₹{Math.round(totalPrice * 0.1).toLocaleString()}</span>
                                    </div>
                                    <div
                                        className="flex justify-between font-semibold pt-2"
                                        style={{ borderTop: '1px solid var(--border-light)' }}
                                    >
                                        <span>Total</span>
                                        <span>₹{Math.round(totalPrice * 1.1).toLocaleString()}</span>
                                    </div>
                                </div>

                                <button className="btn-primary w-full py-4 text-lg">
                                    Reserve Now
                                </button>

                                <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                                    You won't be charged yet
                                </p>

                                <div
                                    className="p-4 rounded-xl text-sm"
                                    style={{ background: 'rgba(201, 162, 39, 0.1)' }}
                                >
                                    <div className="flex items-start gap-3">
                                        <Camera className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--muga-gold)' }} />
                                        <div>
                                            <span className="font-medium">Free photos included</span>
                                            <p style={{ color: 'var(--text-muted)' }}>
                                                Your host will share photos from your experience
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Experiences */}
            <section className="section-padding-sm" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container-custom">
                    <h2
                        className="text-2xl font-bold mb-6"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Similar Experiences
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {exp.similarExperiences.map((similar) => (
                            <Link
                                key={similar.id}
                                href={`/experiences/${similar.slug}`}
                                className="experience-card group"
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <Image
                                        src={similar.image}
                                        alt={similar.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">{similar.title}</h3>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                            <span>{similar.rating}</span>
                                        </div>
                                        <span className="font-semibold" style={{ color: 'var(--tea-deep)' }}>
                                            ₹{similar.price.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
