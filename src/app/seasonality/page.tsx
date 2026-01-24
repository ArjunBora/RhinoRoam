'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ChevronLeft, Calendar, Sun, Cloud, CloudRain, Snowflake,
    Users, TrendingUp, TrendingDown, Minus, Star, MapPin,
    Thermometer, Droplets, Wind, AlertTriangle, Check, X
} from 'lucide-react';

/* ============================================
   SEASONALITY & BEST TIME CALENDAR
   Month-wise weather, crowd, pricing info
   ============================================ */

// Months data
const months = [
    { id: 1, name: 'January', short: 'Jan' },
    { id: 2, name: 'February', short: 'Feb' },
    { id: 3, name: 'March', short: 'Mar' },
    { id: 4, name: 'April', short: 'Apr' },
    { id: 5, name: 'May', short: 'May' },
    { id: 6, name: 'June', short: 'Jun' },
    { id: 7, name: 'July', short: 'Jul' },
    { id: 8, name: 'August', short: 'Aug' },
    { id: 9, name: 'September', short: 'Sep' },
    { id: 10, name: 'October', short: 'Oct' },
    { id: 11, name: 'November', short: 'Nov' },
    { id: 12, name: 'December', short: 'Dec' },
];

// Seasonality data for Assam
const seasonalityData = [
    {
        month: 1,
        weather: 'Cool & Pleasant',
        weatherIcon: 'sun',
        temperature: { min: 10, max: 22, unit: 'C' },
        rainfall: 'Low (15mm)',
        humidity: '75%',
        crowdLevel: 'moderate',
        priceTrend: 'moderate',
        festivals: ['Bhogali Bihu', 'Me-Dam-Me-Phi', 'Jonbeel Mela'],
        highlights: ['Best for wildlife safari', 'Tea garden visits', 'Clear skies for photography'],
        recommendations: 'Peak season for Kaziranga. Book safaris in advance. Perfect weather for outdoor activities.',
        whatToPack: ['Light woolens', 'Jacket for mornings', 'Comfortable walking shoes', 'Binoculars'],
        bestFor: ['Wildlife Safari', 'Tea Tourism', 'Heritage Tours'],
        avoid: [],
    },
    {
        month: 2,
        weather: 'Pleasant & Warm',
        weatherIcon: 'sun',
        temperature: { min: 12, max: 26, unit: 'C' },
        rainfall: 'Low (25mm)',
        humidity: '70%',
        crowdLevel: 'moderate',
        priceTrend: 'moderate',
        festivals: ['Ali Aye Ligang'],
        highlights: ['Comfortable temperatures', 'Good for trekking', 'Mising festival celebrations'],
        recommendations: 'Great time to visit Majuli and experience Mising culture. Wildlife parks still open.',
        whatToPack: ['Light cotton clothes', 'Sunscreen', 'Hat', 'Light jacket'],
        bestFor: ['Tribal Immersion', 'Cultural Tours', 'Wildlife Safari'],
        avoid: [],
    },
    {
        month: 3,
        weather: 'Warm & Dry',
        weatherIcon: 'sun',
        temperature: { min: 16, max: 30, unit: 'C' },
        rainfall: 'Moderate (50mm)',
        humidity: '65%',
        crowdLevel: 'moderate',
        priceTrend: 'moderate',
        festivals: ['Holi', 'Dol Jatra'],
        highlights: ['Pre-monsoon greenery', 'Tea plucking season begins', 'Pleasant evenings'],
        recommendations: 'Good time for tea garden visits. Wildlife parks open till mid-April.',
        whatToPack: ['Summer clothes', 'Umbrella', 'Sunglasses', 'Sunscreen'],
        bestFor: ['Tea Tourism', 'River Cruises', 'Heritage Tours'],
        avoid: [],
    },
    {
        month: 4,
        weather: 'Hot & Humid',
        weatherIcon: 'cloud',
        temperature: { min: 20, max: 32, unit: 'C' },
        rainfall: 'Moderate (130mm)',
        humidity: '75%',
        crowdLevel: 'high',
        priceTrend: 'high',
        festivals: ['Rongali Bihu', 'Bwisagu', 'Rongker'],
        highlights: ['Bihu celebrations everywhere', 'Most vibrant time', 'Cultural performances'],
        recommendations: 'BEST TIME for cultural tourism! Experience Rongali Bihu. Book early for Bihu week.',
        whatToPack: ['Light cotton clothes', 'Rain jacket', 'Traditional dress for Bihu'],
        bestFor: ['Cultural Experience', 'Festivals', 'Tribal Tourism'],
        avoid: ['Kaziranga closes mid-April'],
    },
    {
        month: 5,
        weather: 'Hot & Pre-Monsoon',
        weatherIcon: 'cloud',
        temperature: { min: 23, max: 33, unit: 'C' },
        rainfall: 'High (250mm)',
        humidity: '80%',
        crowdLevel: 'low',
        priceTrend: 'low',
        festivals: [],
        highlights: ['Off-season prices', 'Lush greenery', 'Fewer tourists'],
        recommendations: 'Wildlife parks closed. Good for budget travelers. Pre-monsoon showers begin.',
        whatToPack: ['Rain gear', 'Waterproof bags', 'Light clothes', 'Insect repellent'],
        bestFor: ['Budget Travel', 'Village Tourism'],
        avoid: ['Wildlife Safaris', 'Outdoor Trekking'],
    },
    {
        month: 6,
        weather: 'Monsoon Begins',
        weatherIcon: 'rain',
        temperature: { min: 25, max: 32, unit: 'C' },
        rainfall: 'Heavy (350mm)',
        humidity: '88%',
        crowdLevel: 'low',
        priceTrend: 'low',
        festivals: ['Ambubachi Mela'],
        highlights: ['Ambubachi at Kamakhya', 'Dramatic landscapes', 'Waterfalls active'],
        recommendations: 'Visit only for Ambubachi Mela. Expect heavy rain and flooding in some areas.',
        whatToPack: ['Waterproof everything', 'Extra clothes', 'Medicines', 'Torch'],
        bestFor: ['Religious Tourism', 'Photography'],
        avoid: ['Wildlife Safaris', 'River Islands', 'Remote Areas'],
    },
    {
        month: 7,
        weather: 'Heavy Monsoon',
        weatherIcon: 'rain',
        temperature: { min: 26, max: 32, unit: 'C' },
        rainfall: 'Very Heavy (420mm)',
        humidity: '90%',
        crowdLevel: 'low',
        priceTrend: 'low',
        festivals: [],
        highlights: ['Dramatic cloud formations', 'Lush landscapes', 'Brahmaputra at full flow'],
        recommendations: 'NOT RECOMMENDED for tourism. Floods common. Most wildlife areas inaccessible.',
        whatToPack: ['N/A - Not recommended'],
        bestFor: [],
        avoid: ['All outdoor activities', 'River travel', 'Wildlife parks'],
    },
    {
        month: 8,
        weather: 'Monsoon Peak',
        weatherIcon: 'rain',
        temperature: { min: 26, max: 32, unit: 'C' },
        rainfall: 'Very Heavy (380mm)',
        humidity: '88%',
        crowdLevel: 'low',
        priceTrend: 'low',
        festivals: ['Janmashtami'],
        highlights: ['Greenest landscapes', 'Low prices', 'Authentic local life'],
        recommendations: 'NOT RECOMMENDED. Peak flood season. Many areas cut off.',
        whatToPack: ['N/A - Not recommended'],
        bestFor: [],
        avoid: ['All outdoor activities', 'River travel', 'Wildlife parks'],
    },
    {
        month: 9,
        weather: 'Monsoon Retreating',
        weatherIcon: 'cloud',
        temperature: { min: 25, max: 31, unit: 'C' },
        rainfall: 'High (250mm)',
        humidity: '85%',
        crowdLevel: 'low',
        priceTrend: 'low',
        festivals: [],
        highlights: ['Post-monsoon freshness', 'Green everywhere', 'Good prices'],
        recommendations: 'Monsoon retreating. Some areas accessible. Wildlife parks still closed.',
        whatToPack: ['Rain jacket', 'Waterproof shoes', 'Light clothes'],
        bestFor: ['Budget Travel', 'Tea Gardens'],
        avoid: ['Wildlife Safaris'],
    },
    {
        month: 10,
        weather: 'Post-Monsoon',
        weatherIcon: 'sun',
        temperature: { min: 20, max: 30, unit: 'C' },
        rainfall: 'Low (100mm)',
        humidity: '80%',
        crowdLevel: 'moderate',
        priceTrend: 'moderate',
        festivals: ['Durga Puja', 'Kati Bihu'],
        highlights: ['Durga Puja celebrations', 'Clear skies return', 'Pleasant weather'],
        recommendations: 'Great for cultural tourism. Durga Puja is spectacular. Wildlife parks reopen late October.',
        whatToPack: ['Light clothes', 'Light jacket for evenings', 'Comfortable shoes'],
        bestFor: ['Cultural Tourism', 'Festivals', 'City Exploration'],
        avoid: [],
    },
    {
        month: 11,
        weather: 'Cool & Pleasant',
        weatherIcon: 'sun',
        temperature: { min: 14, max: 27, unit: 'C' },
        rainfall: 'Very Low (15mm)',
        humidity: '75%',
        crowdLevel: 'high',
        priceTrend: 'high',
        festivals: ['Diwali', 'Raas Mahotsav'],
        highlights: ['PEAK SEASON begins', 'Perfect weather', 'All parks open'],
        recommendations: 'HIGHLY RECOMMENDED! Best month overall. Book everything in advance.',
        whatToPack: ['Light woolens', 'Warm jacket', 'Binoculars', 'Camera gear'],
        bestFor: ['Wildlife Safari', 'All Activities', 'Photography'],
        avoid: [],
    },
    {
        month: 12,
        weather: 'Cool & Dry',
        weatherIcon: 'sun',
        temperature: { min: 10, max: 24, unit: 'C' },
        rainfall: 'Very Low (10mm)',
        humidity: '70%',
        crowdLevel: 'high',
        priceTrend: 'peak',
        festivals: ['Christmas', 'New Year'],
        highlights: ['Best visibility', 'Migratory birds', 'Festive atmosphere'],
        recommendations: 'PEAK SEASON! Best for wildlife. Book 2-3 months in advance. Premium pricing.',
        whatToPack: ['Warm clothes', 'Woolens', 'Jacket', 'Binoculars', 'Thermals for early safaris'],
        bestFor: ['Wildlife Safari', 'Bird Watching', 'Tea Tourism'],
        avoid: [],
    },
];

// Helper functions
const getWeatherIcon = (icon: string) => {
    switch (icon) {
        case 'sun': return <Sun className="w-6 h-6" style={{ color: '#FFA726' }} />;
        case 'cloud': return <Cloud className="w-6 h-6" style={{ color: '#78909C' }} />;
        case 'rain': return <CloudRain className="w-6 h-6" style={{ color: '#42A5F5' }} />;
        default: return <Sun className="w-6 h-6" />;
    }
};

const getCrowdIcon = (level: string) => {
    switch (level) {
        case 'low': return { icon: <Users className="w-4 h-4" />, color: 'var(--success)', label: 'Low' };
        case 'moderate': return { icon: <Users className="w-4 h-4" />, color: 'var(--warning)', label: 'Moderate' };
        case 'high': return { icon: <Users className="w-4 h-4" />, color: 'var(--error)', label: 'High' };
        default: return { icon: <Users className="w-4 h-4" />, color: 'var(--text-muted)', label: 'Unknown' };
    }
};

const getPriceIcon = (trend: string) => {
    switch (trend) {
        case 'low': return { icon: <TrendingDown className="w-4 h-4" />, color: 'var(--success)', label: '₹ Budget' };
        case 'moderate': return { icon: <Minus className="w-4 h-4" />, color: 'var(--warning)', label: '₹₹ Mid' };
        case 'high': return { icon: <TrendingUp className="w-4 h-4" />, color: 'var(--error)', label: '₹₹₹ High' };
        case 'peak': return { icon: <TrendingUp className="w-4 h-4" />, color: '#B71C1C', label: '₹₹₹₹ Peak' };
        default: return { icon: <Minus className="w-4 h-4" />, color: 'var(--text-muted)', label: 'Unknown' };
    }
};

const getSeasonRating = (month: number): { rating: number; label: string; color: string } => {
    const best = [11, 12, 1, 2];
    const good = [3, 4, 10];
    const okay = [5, 9];
    const avoid = [6, 7, 8];

    if (best.includes(month)) return { rating: 5, label: 'Excellent', color: 'var(--success)' };
    if (good.includes(month)) return { rating: 4, label: 'Good', color: 'var(--tea-garden)' };
    if (okay.includes(month)) return { rating: 2, label: 'Fair', color: 'var(--warning)' };
    if (avoid.includes(month)) return { rating: 1, label: 'Avoid', color: 'var(--error)' };
    return { rating: 3, label: 'Average', color: 'var(--text-muted)' };
};

export default function SeasonalityPage() {
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

    const currentData = seasonalityData.find(d => d.month === selectedMonth);
    const seasonRating = getSeasonRating(selectedMonth);

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
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Best Time to Visit <span style={{ color: 'var(--muga-light)' }}>Assam</span>
                        </h1>
                        <p className="text-lg text-white/80">
                            Month-by-month guide: weather, crowd levels, festivals, and what to expect
                        </p>
                    </div>
                </div>
            </header>

            {/* Month Selector / Heatmap */}
            <section className="py-8" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)' }}>
                <div className="container-custom">
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                        {months.map((month) => {
                            const rating = getSeasonRating(month.id);
                            const isSelected = selectedMonth === month.id;
                            return (
                                <button
                                    key={month.id}
                                    onClick={() => setSelectedMonth(month.id)}
                                    className={`p-3 rounded-xl text-center transition-all ${isSelected ? 'ring-2 ring-[var(--tea-garden)]' : ''
                                        }`}
                                    style={{
                                        background: isSelected
                                            ? 'var(--tea-garden)'
                                            : `${rating.color}20`,
                                        color: isSelected ? 'white' : 'var(--text-primary)',
                                    }}
                                >
                                    <span className="text-xs font-medium">{month.short}</span>
                                    <div className="flex justify-center mt-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className="w-1.5 h-1.5 rounded-full mx-0.5"
                                                style={{
                                                    background: i < rating.rating ? rating.color : 'var(--border-light)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs">
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full" style={{ background: 'var(--success)' }} />
                            Excellent
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full" style={{ background: 'var(--tea-garden)' }} />
                            Good
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full" style={{ background: 'var(--warning)' }} />
                            Fair
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full" style={{ background: 'var(--error)' }} />
                            Avoid
                        </span>
                    </div>
                </div>
            </section>

            {/* Selected Month Details */}
            {currentData && (
                <section className="section-padding">
                    <div className="container-custom max-w-5xl">
                        {/* Month Header */}
                        <div className="text-center mb-10">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                {getWeatherIcon(currentData.weatherIcon)}
                                <h2
                                    className="text-3xl font-bold"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {months.find(m => m.id === selectedMonth)?.name}
                                </h2>
                            </div>
                            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                                {currentData.weather}
                            </p>
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mt-4"
                                style={{ background: `${seasonRating.color}20`, color: seasonRating.color }}
                            >
                                <Star className="w-4 h-4" style={{ fill: seasonRating.color }} />
                                {seasonRating.label} for visiting
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <div
                                className="p-4 rounded-xl text-center"
                                style={{ background: 'var(--bg-card)' }}
                            >
                                <Thermometer className="w-6 h-6 mx-auto mb-2" style={{ color: '#FF7043' }} />
                                <p className="text-2xl font-bold">{currentData.temperature.min}° - {currentData.temperature.max}°</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Temperature</p>
                            </div>
                            <div
                                className="p-4 rounded-xl text-center"
                                style={{ background: 'var(--bg-card)' }}
                            >
                                <Droplets className="w-6 h-6 mx-auto mb-2" style={{ color: '#42A5F5' }} />
                                <p className="text-2xl font-bold">{currentData.rainfall}</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Rainfall</p>
                            </div>
                            <div
                                className="p-4 rounded-xl text-center"
                                style={{ background: 'var(--bg-card)' }}
                            >
                                <div className="flex justify-center mb-2" style={{ color: getCrowdIcon(currentData.crowdLevel).color }}>
                                    {getCrowdIcon(currentData.crowdLevel).icon}
                                </div>
                                <p className="text-2xl font-bold">{getCrowdIcon(currentData.crowdLevel).label}</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Crowds</p>
                            </div>
                            <div
                                className="p-4 rounded-xl text-center"
                                style={{ background: 'var(--bg-card)' }}
                            >
                                <div className="flex justify-center mb-2" style={{ color: getPriceIcon(currentData.priceTrend).color }}>
                                    {getPriceIcon(currentData.priceTrend).icon}
                                </div>
                                <p className="text-2xl font-bold">{getPriceIcon(currentData.priceTrend).label}</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Prices</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Recommendations */}
                            <div className="heritage-card p-6">
                                <h3 className="font-semibold mb-4">💡 Recommendations</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    {currentData.recommendations}
                                </p>
                            </div>

                            {/* Festivals */}
                            <div className="heritage-card p-6">
                                <h3 className="font-semibold mb-4">🎉 Festivals & Events</h3>
                                {currentData.festivals.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {currentData.festivals.map((festival, idx) => (
                                            <Link
                                                key={idx}
                                                href="/festivals"
                                                className="px-3 py-1.5 rounded-full text-sm"
                                                style={{ background: 'var(--bg-secondary)' }}
                                            >
                                                {festival}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: 'var(--text-muted)' }}>No major festivals this month</p>
                                )}
                            </div>

                            {/* Best For */}
                            <div className="heritage-card p-6">
                                <h3 className="font-semibold mb-4">✅ Best For</h3>
                                {currentData.bestFor.length > 0 ? (
                                    <div className="space-y-2">
                                        {currentData.bestFor.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm">
                                                <Check className="w-4 h-4" style={{ color: 'var(--success)' }} />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: 'var(--text-muted)' }}>Limited activities recommended</p>
                                )}
                            </div>

                            {/* Avoid */}
                            <div className="heritage-card p-6">
                                <h3 className="font-semibold mb-4">❌ Avoid</h3>
                                {currentData.avoid.length > 0 ? (
                                    <div className="space-y-2">
                                        {currentData.avoid.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm">
                                                <X className="w-4 h-4" style={{ color: 'var(--error)' }} />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: 'var(--success)' }}>All activities recommended!</p>
                                )}
                            </div>

                            {/* Highlights */}
                            <div className="heritage-card p-6">
                                <h3 className="font-semibold mb-4">🌟 Highlights</h3>
                                <ul className="space-y-2">
                                    {currentData.highlights.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <Star className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--muga-gold)' }} />
                                            <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* What to Pack */}
                            <div className="heritage-card p-6">
                                <h3 className="font-semibold mb-4">🎒 What to Pack</h3>
                                {currentData.whatToPack.length > 0 && currentData.whatToPack[0] !== 'N/A - Not recommended' ? (
                                    <div className="flex flex-wrap gap-2">
                                        {currentData.whatToPack.map((item, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 rounded-full text-sm"
                                                style={{ background: 'var(--bg-secondary)' }}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: 'var(--error)' }}>Travel not recommended this month</p>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div
                            className="mt-10 p-8 rounded-2xl text-center"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            <h3 className="text-xl font-semibold mb-4">
                                Ready to plan your {months.find(m => m.id === selectedMonth)?.name} trip?
                            </h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/plan" className="btn-primary">
                                    Plan My Trip
                                </Link>
                                <Link href="/experiences" className="btn-ghost">
                                    Browse Experiences
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
