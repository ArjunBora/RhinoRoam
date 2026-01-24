'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft, MapPin, Star, Clock, Calendar, Users,
    Navigation, Share2, Heart, Camera, AlertTriangle, Info,
    Check, X, Globe, Phone, IndianRupee, ThermometerSun,
    Shirt, Shield, Leaf, ChevronRight, Play, ExternalLink
} from 'lucide-react';

/* ============================================
   POI DETAIL PAGE
   Heritage site with full information
   ============================================ */

// Sample POI data
const samplePOI = {
    id: '1',
    name: 'Kaziranga National Park',
    nameLocal: 'কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান',
    slug: 'kaziranga-national-park',
    category: 'Wildlife Sanctuary',
    subcategory: 'National Park',

    description: `Kaziranga National Park, a UNESCO World Heritage Site, is home to two-thirds of the world's one-horned rhinoceros population. Spread across 430 sq km of tall elephant grass, marshlands, and dense tropical moist broadleaf forests, it is one of the last areas in eastern India undisturbed by human presence.

The park is recognized as an Important Bird Area by BirdLife International for conservation of avifaunal species. It is also home to the highest density of tigers among protected areas in the world, and was declared a Tiger Reserve in 2006.`,

    culturalSignificance: `Kaziranga has been a protected area since 1905, thanks to the efforts of Mary Victoria Leiter Curzon, wife of the Viceroy of India. The local Karbi and Mising tribes have coexisted with the wildlife for centuries, maintaining a delicate balance between human activity and conservation.

The name 'Kaziranga' comes from the Karbi word 'Kajir-a-rang', meaning 'the land of red goats', referring to the color of the deer that inhabit the area.`,

    images: [
        'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=1200&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    ],

    district: 'Golaghat',
    location: { lat: 26.5775, lng: 93.1711 },

    // Timings
    timings: {
        opening: '7:00 AM',
        closing: '4:00 PM',
        closedOn: 'Mondays (Elephant Safari)',
        seasonOpen: 'November 1',
        seasonClose: 'April 30',
        notes: 'Park closed during monsoon (May-October)',
    },

    // Entry Fees
    entryFees: {
        indian: { adult: 100, child: 50, camera: 100, video: 500 },
        foreigner: { adult: 650, child: 200, camera: 500, video: 1000 },
        vehicle: { jeep: 3500, elephant: 1600 },
    },

    // Ratings
    rating: 4.9,
    reviewCount: 2340,

    // What to See
    highlights: [
        { name: 'One-Horned Rhinoceros', description: 'Over 2,400 rhinos call Kaziranga home' },
        { name: 'Bengal Tigers', description: 'Highest density of tigers in any protected area' },
        { name: 'Asian Elephants', description: 'Large herds roam freely across the park' },
        { name: 'Bird Watching', description: '480+ species including migratory birds' },
    ],

    // Safety Tips
    safetyTips: [
        { type: 'warning', text: 'Maintain minimum 20m distance from all wildlife' },
        { type: 'warning', text: 'Do not get out of the safari vehicle under any circumstances' },
        { type: 'warning', text: 'Do not use flash photography - it startles animals' },
        { type: 'info', text: 'Follow your guide\'s instructions at all times' },
        { type: 'info', text: 'Carry insect repellent for morning safaris' },
        { type: 'health', text: 'Anti-malarial precautions recommended' },
    ],

    // Cultural Norms
    culturalNorms: [
        { rule: 'No loud noises or music', reason: 'Disturbs wildlife' },
        { rule: 'No plastic bottles', reason: 'Environmental protection' },
        { rule: 'Neutral colored clothing', reason: 'Bright colors may startle animals' },
        { rule: 'No feeding animals', reason: 'Strict prohibition' },
    ],

    // Dress Code
    dressCode: {
        recommended: ['Neutral/earthy colors', 'Long sleeves for sun protection', 'Comfortable shoes', 'Hat or cap'],
        avoid: ['Bright colors', 'Perfume/cologne', 'Noisy jewelry'],
        note: 'Mornings are cold (10-15°C) - bring warm layers',
    },

    // Health Advisories
    healthAdvisories: [
        'Malaria precautions recommended',
        'Carry any personal medications',
        'Stay hydrated during safari',
        'Medical facilities available at Kohora',
    ],

    // Environmental Rules
    environmentalRules: [
        'Zero tolerance for littering',
        'Single-use plastic banned inside park',
        'Stay on designated safari paths',
        'No smoking inside the park',
    ],

    // Best Time
    bestTime: {
        months: ['November', 'December', 'January', 'February', 'March'],
        peakSeason: 'January-February',
        weather: 'Cool and dry, 10-25°C',
        note: 'Early morning safaris have best wildlife sightings',
    },

    // How to Reach
    howToReach: {
        nearestAirport: { name: 'Jorhat Airport', distance: '97 km', time: '2 hours' },
        nearestRailway: { name: 'Furkating Junction', distance: '75 km', time: '1.5 hours' },
        nearestTown: { name: 'Kohora', distance: '0 km', time: 'Inside' },
        fromGuwahati: { distance: '217 km', time: '4-5 hours' },
    },

    // Nearby Stays
    nearbyStays: [
        { name: 'Wild Grass Eco Lodge', type: 'Eco Lodge', distance: '2 km', rating: 4.9 },
        { name: 'Infinity Resort', type: 'Resort', distance: '3 km', rating: 4.7 },
        { name: 'Diphlu River Lodge', type: 'Lodge', distance: '5 km', rating: 4.8 },
    ],

    // Nearby POIs
    nearbyPOIs: [
        { name: 'Orchid Park', distance: '5 km', type: 'Nature' },
        { name: 'Tea Gardens', distance: '10 km', type: 'Heritage' },
        { name: 'Karbi Village', distance: '15 km', type: 'Cultural' },
    ],

    // Contact
    contact: {
        phone: '+91 3776 268095',
        email: 'kaziranga@wildlife.org',
        website: 'https://kaziranga.assam.gov.in',
    },

    // Source
    infoSource: 'Official (Assam Forest Department)',
    lastUpdated: '2026-01-15',
};

export default function POIDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'safety' | 'practical'>('overview');

    // In production, fetch POI by slug
    const poi = samplePOI;

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Hero */}
            <div className="relative h-[50vh] md:h-[60vh]">
                <Image
                    src={poi.images[selectedImage]}
                    alt={poi.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)' }}
                />

                {/* Back Button */}
                <Link
                    href="/map"
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-colors z-20"
                    style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Map
                </Link>

                {/* Actions */}
                <div className="absolute top-6 right-6 flex gap-2 z-20">
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

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="container-custom">
                        <span className="badge badge-muga mb-3">{poi.category}</span>
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-2"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            {poi.name}
                        </h1>
                        <p className="text-white/70 text-lg mb-2">{poi.nameLocal}</p>
                        <div className="flex flex-wrap items-center gap-4 text-white/80">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {poi.district}, Assam
                            </span>
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                {poi.rating} ({poi.reviewCount.toLocaleString()} reviews)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Image Thumbnails */}
                <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                    {poi.images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'opacity-100' : 'opacity-60'
                                }`}
                            style={{ borderColor: selectedImage === idx ? 'white' : 'transparent' }}
                        >
                            <Image
                                src={img}
                                alt={`View ${idx + 1}`}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div
                className="sticky top-0 z-40"
                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}
            >
                <div className="container-custom">
                    <div className="flex gap-1 py-2">
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'safety', label: 'Safety & Rules' },
                            { id: 'practical', label: 'Practical Info' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'text-white' : ''
                                    }`}
                                style={{
                                    background: activeTab === tab.id ? 'var(--gradient-tea)' : 'transparent',
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {activeTab === 'overview' && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Description */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        About
                                    </h2>
                                    <div className="prose max-w-none" style={{ color: 'var(--text-secondary)' }}>
                                        {poi.description.split('\n\n').map((para, idx) => (
                                            <p key={idx} className="mb-4">{para}</p>
                                        ))}
                                    </div>
                                </section>

                                {/* Cultural Significance */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Cultural Significance
                                    </h2>
                                    <div className="prose max-w-none" style={{ color: 'var(--text-secondary)' }}>
                                        {poi.culturalSignificance.split('\n\n').map((para, idx) => (
                                            <p key={idx} className="mb-4">{para}</p>
                                        ))}
                                    </div>
                                </section>

                                {/* Highlights */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        What to See
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {poi.highlights.map((highlight, idx) => (
                                            <div
                                                key={idx}
                                                className="p-4 rounded-xl"
                                                style={{ background: 'var(--bg-secondary)' }}
                                            >
                                                <h3 className="font-semibold">{highlight.name}</h3>
                                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                    {highlight.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Best Time */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Best Time to Visit
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <Calendar className="w-5 h-5 mb-2" style={{ color: 'var(--tea-garden)' }} />
                                            <p className="font-semibold">{poi.bestTime.months.join(', ')}</p>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Best months</p>
                                        </div>
                                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <ThermometerSun className="w-5 h-5 mb-2" style={{ color: 'var(--tea-garden)' }} />
                                            <p className="font-semibold">{poi.bestTime.weather}</p>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Weather</p>
                                        </div>
                                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <Clock className="w-5 h-5 mb-2" style={{ color: 'var(--tea-garden)' }} />
                                            <p className="font-semibold">Early Morning</p>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Best for sightings</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'safety' && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Safety Tips */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <Shield className="w-5 h-5" style={{ color: 'var(--tea-garden)' }} />
                                        Safety Tips
                                    </h2>
                                    <div className="space-y-3">
                                        {poi.safetyTips.map((tip, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex items-start gap-3 p-3 rounded-xl ${tip.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/10' :
                                                        tip.type === 'health' ? 'bg-red-50 dark:bg-red-900/10' :
                                                            'bg-blue-50 dark:bg-blue-900/10'
                                                    }`}
                                            >
                                                {tip.type === 'warning' && (
                                                    <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--warning)' }} />
                                                )}
                                                {tip.type === 'info' && (
                                                    <Info className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--info)' }} />
                                                )}
                                                {tip.type === 'health' && (
                                                    <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--error)' }} />
                                                )}
                                                <span className="text-sm">{tip.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Cultural Norms */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Rules & Etiquette
                                    </h2>
                                    <div className="space-y-3">
                                        {poi.culturalNorms.map((norm, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-3 p-3 rounded-xl"
                                                style={{ background: 'var(--bg-secondary)' }}
                                            >
                                                <X className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--error)' }} />
                                                <div>
                                                    <p className="font-medium">{norm.rule}</p>
                                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{norm.reason}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Dress Code */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <Shirt className="w-5 h-5" style={{ color: 'var(--tea-garden)' }} />
                                        Dress Code
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                                <Check className="w-4 h-4" style={{ color: 'var(--success)' }} />
                                                Recommended
                                            </h3>
                                            <ul className="space-y-2">
                                                {poi.dressCode.recommended.map((item, idx) => (
                                                    <li key={idx} className="text-sm flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--success)' }} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                                <X className="w-4 h-4" style={{ color: 'var(--error)' }} />
                                                Avoid
                                            </h3>
                                            <ul className="space-y-2">
                                                {poi.dressCode.avoid.map((item, idx) => (
                                                    <li key={idx} className="text-sm flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--error)' }} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="text-sm mt-4 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                                        💡 {poi.dressCode.note}
                                    </p>
                                </section>

                                {/* Environmental Rules */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <Leaf className="w-5 h-5" style={{ color: 'var(--success)' }} />
                                        Environmental Rules
                                    </h2>
                                    <ul className="space-y-3">
                                        {poi.environmentalRules.map((rule, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm">
                                                <span className="w-2 h-2 rounded-full" style={{ background: 'var(--tea-garden)' }} />
                                                {rule}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>
                        )}

                        {activeTab === 'practical' && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Timings */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <Clock className="w-5 h-5" style={{ color: 'var(--tea-garden)' }} />
                                        Timings
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Opening Hours</p>
                                            <p className="font-semibold">{poi.timings.opening} - {poi.timings.closing}</p>
                                        </div>
                                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Season</p>
                                            <p className="font-semibold">{poi.timings.seasonOpen} - {poi.timings.seasonClose}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm mt-4" style={{ color: 'var(--warning)' }}>
                                        ⚠️ {poi.timings.notes}
                                    </p>
                                </section>

                                {/* Entry Fees */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <IndianRupee className="w-5 h-5" style={{ color: 'var(--tea-garden)' }} />
                                        Entry Fees
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-3">Indian Nationals</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Adult</span>
                                                    <span className="font-medium">₹{poi.entryFees.indian.adult}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Child</span>
                                                    <span className="font-medium">₹{poi.entryFees.indian.child}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Still Camera</span>
                                                    <span className="font-medium">₹{poi.entryFees.indian.camera}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Video Camera</span>
                                                    <span className="font-medium">₹{poi.entryFees.indian.video}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-3">Foreign Nationals</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Adult</span>
                                                    <span className="font-medium">₹{poi.entryFees.foreigner.adult}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Child</span>
                                                    <span className="font-medium">₹{poi.entryFees.foreigner.child}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Still Camera</span>
                                                    <span className="font-medium">₹{poi.entryFees.foreigner.camera}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Video Camera</span>
                                                    <span className="font-medium">₹{poi.entryFees.foreigner.video}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="mt-4 pt-4 grid grid-cols-2 gap-4"
                                        style={{ borderTop: '1px solid var(--border-light)' }}
                                    >
                                        <div className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <p className="font-semibold">₹{poi.entryFees.vehicle.jeep.toLocaleString()}</p>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Jeep Safari</p>
                                        </div>
                                        <div className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <p className="font-semibold">₹{poi.entryFees.vehicle.elephant.toLocaleString()}</p>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Elephant Safari</p>
                                        </div>
                                    </div>
                                </section>

                                {/* How to Reach */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <Navigation className="w-5 h-5" style={{ color: 'var(--tea-garden)' }} />
                                        How to Reach
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg">✈️</span>
                                                <span className="font-medium">{poi.howToReach.nearestAirport.name}</span>
                                            </div>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                {poi.howToReach.nearestAirport.distance} • {poi.howToReach.nearestAirport.time}
                                            </p>
                                        </div>
                                        <div className="p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg">🚂</span>
                                                <span className="font-medium">{poi.howToReach.nearestRailway.name}</span>
                                            </div>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                {poi.howToReach.nearestRailway.distance} • {poi.howToReach.nearestRailway.time}
                                            </p>
                                        </div>
                                        <div className="p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg">🚗</span>
                                                <span className="font-medium">From Guwahati</span>
                                            </div>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                {poi.howToReach.fromGuwahati.distance} • {poi.howToReach.fromGuwahati.time}
                                            </p>
                                        </div>
                                    </div>
                                    <Link href="/how-to-reach" className="btn-ghost mt-4 w-full">
                                        View Full Travel Guide
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </section>

                                {/* Contact */}
                                <section className="heritage-card p-6">
                                    <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Contact
                                    </h2>
                                    <div className="space-y-3">
                                        <a href={`tel:${poi.contact.phone}`} className="flex items-center gap-3 text-sm">
                                            <Phone className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                            {poi.contact.phone}
                                        </a>
                                        <a href={`mailto:${poi.contact.email}`} className="flex items-center gap-3 text-sm">
                                            <Globe className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                            {poi.contact.email}
                                        </a>
                                        <a
                                            href={poi.contact.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-sm"
                                        >
                                            <ExternalLink className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                            Official Website
                                        </a>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20 space-y-6">
                            {/* Quick Actions */}
                            <div className="heritage-card p-6">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${poi.location.lat},${poi.location.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full mb-3"
                                >
                                    <Navigation className="w-4 h-4" />
                                    Get Directions
                                </a>
                                <Link href={`/experiences?location=${poi.slug}`} className="btn-ghost w-full">
                                    View Experiences
                                </Link>
                            </div>

                            {/* Nearby Stays */}
                            <div className="heritage-card p-6">
                                <h3 className="font-semibold mb-4">Where to Stay</h3>
                                <div className="space-y-3">
                                    {poi.nearbyStays.map((stay, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 rounded-xl"
                                            style={{ background: 'var(--bg-secondary)' }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-sm">{stay.name}</p>
                                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                        {stay.type} • {stay.distance}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Star className="w-3 h-3" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                                    {stay.rating}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/stays" className="btn-ghost w-full mt-4 text-sm">
                                    View All Stays
                                </Link>
                            </div>

                            {/* Source Info */}
                            <div
                                className="p-4 rounded-xl text-xs"
                                style={{ background: 'var(--bg-secondary)' }}
                            >
                                <p className="flex items-center gap-2 mb-1">
                                    <Check className="w-3 h-3" style={{ color: 'var(--success)' }} />
                                    <span className="font-medium">{poi.infoSource}</span>
                                </p>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    Last updated: {poi.lastUpdated}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
