'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Calendar, MapPin, Users, Filter, ChevronLeft, ChevronRight,
    ArrowRight, Star, Clock, Sparkles, Search, X
} from 'lucide-react';

/* ============================================
   FESTIVALS & EVENTS CALENDAR
   Comprehensive Assamese Cultural Calendar
   ============================================ */

// Types
interface Festival {
    id: string;
    name: string;
    nameAssamese?: string;
    date: string;
    startDate: string;
    endDate?: string;
    month: string;
    year: number;
    location: string;
    district: string;
    region: 'Upper Assam' | 'Lower Assam' | 'Central Assam' | 'Barak Valley' | 'BTR' | 'Hill Districts' | 'Statewide';
    community?: string;
    type: 'state' | 'regional' | 'tribal' | 'religious' | 'local';
    description: string;
    highlights: string[];
    image?: string;
    isUpcoming?: boolean;
    isMajor?: boolean;
}

// Comprehensive Festivals Data
const allFestivals: Festival[] = [
    // January
    {
        id: '1',
        name: 'Magh Bihu (Bhogali Bihu)',
        nameAssamese: 'মাঘ বিহু',
        date: '14-15 January',
        startDate: '2026-01-14',
        endDate: '2026-01-15',
        month: 'JAN',
        year: 2026,
        location: 'Statewide',
        district: 'All Districts',
        region: 'Statewide',
        type: 'state',
        description: 'The harvest festival of Assam, celebrated with community feasts (Bhoj), Meji (bonfire) burning, and traditional games. Communities gather to celebrate the end of the harvesting season.',
        highlights: ['Meji bonfire at dawn', 'Traditional Bhoj feast', 'Tekeli Bhonga games', 'Pithas preparation'],
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
        isUpcoming: true,
        isMajor: true
    },
    {
        id: '2',
        name: 'Me-Dam-Me-Phi',
        nameAssamese: 'মে-ডাম-মে-ফি',
        date: '31 January',
        startDate: '2026-01-31',
        month: 'JAN',
        year: 2026,
        location: 'Sivasagar, Charaideo',
        district: 'Sivasagar',
        region: 'Upper Assam',
        community: 'Tai-Ahom',
        type: 'tribal',
        description: 'Sacred ancestral worship ceremony of the Tai-Ahom community, remembering and honoring departed souls at the historic Charaideo Maidams.',
        highlights: ['Ancestral worship rituals', 'Traditional Ahom prayers', 'Cultural performances', 'Visit to Charaideo Maidams'],
        image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=800&q=80',
        isUpcoming: true
    },
    // February
    {
        id: '3',
        name: 'Ali Aye Ligang',
        nameAssamese: 'আলি আয়ে লৃগাং',
        date: '17 February',
        startDate: '2026-02-17',
        month: 'FEB',
        year: 2026,
        location: 'Mising Villages across Dhemaji, Lakhimpur, Majuli',
        district: 'Dhemaji',
        region: 'Upper Assam',
        community: 'Mising',
        type: 'tribal',
        description: 'Spring festival of the Mising tribe marking the beginning of the Ahu paddy sowing season. Features the energetic Gumrag dance and traditional rituals.',
        highlights: ['Gumrag dance performances', 'Traditional Mising cuisine', 'Agricultural rituals', 'Community gatherings'],
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
        isUpcoming: true
    },
    {
        id: '4',
        name: 'Phakuwa Utsav',
        date: '1-2 February',
        startDate: '2026-02-01',
        endDate: '2026-02-02',
        month: 'FEB',
        year: 2026,
        location: 'Titabor, Jorhat',
        district: 'Jorhat',
        region: 'Upper Assam',
        type: 'regional',
        description: 'Traditional festival celebrating the legacy of local folk culture with traditional music, dance, and craft exhibitions.',
        highlights: ['Folk performances', 'Craft exhibitions', 'Local delicacies', 'Cultural programs']
    },
    // March
    {
        id: '5',
        name: 'Doul Utsav (Holi)',
        nameAssamese: 'দোল উৎসৱ',
        date: '14-15 March',
        startDate: '2026-03-14',
        endDate: '2026-03-15',
        month: 'MAR',
        year: 2026,
        location: 'Barpeta, Majuli Satras',
        district: 'Barpeta',
        region: 'Lower Assam',
        type: 'religious',
        description: 'Vaishnavite festival of colors celebrated with great fervor at the Satras of Majuli and Barpeta. Features traditional Bhaona performances and devotional songs.',
        highlights: ['Satra celebrations', 'Bhaona performances', 'Borgeet singing', 'Color play rituals'],
        isMajor: true
    },
    {
        id: '6',
        name: 'Bathow Puja',
        date: '13-14 March',
        startDate: '2026-03-13',
        endDate: '2026-03-14',
        month: 'MAR',
        year: 2026,
        location: 'Bodo Villages, BTR',
        district: 'Kokrajhar',
        region: 'BTR',
        community: 'Bodo',
        type: 'tribal',
        description: 'Ancient worship of Bathow (Siju plant) by the Bodo community, seeking blessings for prosperity and protection.',
        highlights: ['Bathow worship', 'Traditional prayers', 'Community feast', 'Bagurumba dance']
    },
    // April
    {
        id: '7',
        name: 'Bohag Bihu (Rongali Bihu)',
        nameAssamese: 'বহাগ বিহু',
        date: '14-20 April',
        startDate: '2026-04-14',
        endDate: '2026-04-20',
        month: 'APR',
        year: 2026,
        location: 'Statewide',
        district: 'All Districts',
        region: 'Statewide',
        type: 'state',
        description: 'The Assamese New Year and the most vibrant festival of Assam. Week-long celebrations with Bihu dance, Husori groups, traditional games, and community feasts.',
        highlights: ['Bihu dance performances', 'Husori group visits', 'Traditional games', 'Gamusa exchange', 'Community feasts'],
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
        isMajor: true
    },
    {
        id: '8',
        name: 'Bwisagu',
        nameAssamese: 'বৈশাগু',
        date: '14-21 April',
        startDate: '2026-04-14',
        endDate: '2026-04-21',
        month: 'APR',
        year: 2026,
        location: 'BTR Districts',
        district: 'Kokrajhar',
        region: 'BTR',
        community: 'Bodo',
        type: 'tribal',
        description: 'Bodo New Year celebration featuring the graceful Bagurumba dance, traditional music, and community gatherings.',
        highlights: ['Bagurumba dance', 'Traditional Bodo music', 'Kherai puja', 'Community feasts'],
        isMajor: true
    },
    {
        id: '9',
        name: 'Baikho Festival',
        date: 'Mid April',
        startDate: '2026-04-15',
        month: 'APR',
        year: 2026,
        location: 'Rabha Villages',
        district: 'Goalpara',
        region: 'Lower Assam',
        community: 'Rabha',
        type: 'tribal',
        description: 'Spring festival of the Rabha community praying for good harvest and rainfall.',
        highlights: ['Traditional Rabha dances', 'Agricultural rituals', 'Community prayers', 'Folk music']
    },
    // May
    {
        id: '10',
        name: 'Rongker Festival',
        date: '15-17 May',
        startDate: '2026-05-15',
        endDate: '2026-05-17',
        month: 'MAY',
        year: 2026,
        location: 'Karbi Villages',
        district: 'Karbi Anglong',
        region: 'Hill Districts',
        community: 'Karbi',
        type: 'tribal',
        description: 'Agricultural festival of the Karbi tribe seeking blessings for protection of crops and village prosperity.',
        highlights: ['Community worship', 'Traditional rituals', 'Karbi folk dances', 'Village feasting']
    },
    {
        id: '11',
        name: 'Buddha Purnima',
        date: '12 May',
        startDate: '2026-05-12',
        month: 'MAY',
        year: 2026,
        location: 'Buddhist communities across Assam',
        district: 'Multiple',
        region: 'Statewide',
        type: 'religious',
        description: 'Celebration of Buddha\'s birthday observed by Buddhist communities with prayers, processions, and community service.',
        highlights: ['Buddhist prayers', 'Temple visits', 'Community service', 'Vegetarian feasts']
    },
    // June
    {
        id: '12',
        name: 'Ambubachi Mela',
        nameAssamese: 'আম্বুবাচী মেলা',
        date: '22-26 June',
        startDate: '2026-06-22',
        endDate: '2026-06-26',
        month: 'JUN',
        year: 2026,
        location: 'Kamakhya Temple, Guwahati',
        district: 'Kamrup Metro',
        region: 'Central Assam',
        type: 'religious',
        description: 'One of the largest religious gatherings in India, celebrating the annual menstruation of Goddess Kamakhya. Attracts Tantric practitioners and devotees from across the world.',
        highlights: ['Temple rituals', 'Tantric practices', 'Massive gathering', 'Prasad distribution'],
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
        isMajor: true
    },
    // July-August
    {
        id: '13',
        name: 'Majuli Raas Leela',
        date: 'Full Moon, November',
        startDate: '2026-11-15',
        month: 'NOV',
        year: 2026,
        location: 'Satras of Majuli',
        district: 'Majuli',
        region: 'Central Assam',
        type: 'religious',
        description: 'Traditional dance-drama depicting the life of Lord Krishna, performed at the ancient Satras of Majuli Island.',
        highlights: ['Bhaona performances', 'Traditional costumes', 'Satra visits', 'Devotional music'],
        isMajor: true
    },
    // October
    {
        id: '14',
        name: 'Kati Bihu',
        nameAssamese: 'কাতি বিহু',
        date: '18 October',
        startDate: '2026-10-18',
        month: 'OCT',
        year: 2026,
        location: 'Statewide',
        district: 'All Districts',
        region: 'Statewide',
        type: 'state',
        description: 'Festival of lights marking the lean season when crops are growing. Families light Akash Banti (sky lamps) in tulsi groves and paddy fields.',
        highlights: ['Akash Banti lighting', 'Tulsi worship', 'Paddy field rituals', 'Community prayers'],
        isMajor: true
    },
    {
        id: '15',
        name: 'Durga Puja',
        date: '1-5 October',
        startDate: '2026-10-01',
        endDate: '2026-10-05',
        month: 'OCT',
        year: 2026,
        location: 'Statewide',
        district: 'All Districts',
        region: 'Statewide',
        type: 'religious',
        description: 'Grand celebration of Goddess Durga with elaborate pandals, cultural programs, and community gatherings across all cities and villages.',
        highlights: ['Pandal hopping', 'Dhak beats', 'Cultural programs', 'Sindoor Khela', 'Visarjan'],
        isMajor: true
    },
    // November
    {
        id: '16',
        name: 'Wangala Festival',
        date: '10-12 November',
        startDate: '2026-11-10',
        endDate: '2026-11-12',
        month: 'NOV',
        year: 2026,
        location: 'Garo Hills areas',
        district: 'West Karbi Anglong',
        region: 'Hill Districts',
        community: 'Garo',
        type: 'tribal',
        description: 'Harvest festival of the Garo tribe celebrated with traditional Wangala dance and thanksgiving to the Sun God.',
        highlights: ['Wangala dance', '100 Drums festival', 'Traditional music', 'Community celebrations']
    },
    {
        id: '17',
        name: 'Baishagu (Tiwa)',
        date: 'Mid April',
        startDate: '2026-04-14',
        month: 'APR',
        year: 2026,
        location: 'Tiwa Villages, Morigaon',
        district: 'Morigaon',
        region: 'Central Assam',
        community: 'Tiwa',
        type: 'tribal',
        description: 'New Year festival of the Tiwa tribe with traditional dances, music, and community celebrations.',
        highlights: ['Traditional Tiwa dance', 'Folk songs', 'Rice beer preparation', 'Community feast']
    },
    // December
    {
        id: '18',
        name: 'Sangken (Tai New Year)',
        date: '14-16 April',
        startDate: '2026-04-14',
        endDate: '2026-04-16',
        month: 'APR',
        year: 2026,
        location: 'Tai Phake, Tai Aiton villages',
        district: 'Dibrugarh',
        region: 'Upper Assam',
        community: 'Tai Phake',
        type: 'tribal',
        description: 'Water festival similar to Thai Songkran, celebrated by Tai communities with Buddha idol bathing and water splashing.',
        highlights: ['Water festivities', 'Buddha idol bathing', 'Traditional dance', 'Thai-style celebrations']
    },
    {
        id: '19',
        name: 'Christmas Celebrations',
        date: '24-25 December',
        startDate: '2026-12-24',
        endDate: '2026-12-25',
        month: 'DEC',
        year: 2026,
        location: 'Tea Gardens, Urban Centers',
        district: 'Multiple',
        region: 'Upper Assam',
        type: 'religious',
        description: 'Celebrated with great fervor in tea garden communities and urban centers with decorations, carols, and community gatherings.',
        highlights: ['Carol singing', 'Church services', 'Community feasts', 'Tea garden celebrations']
    },
    // Local/Regional Festivals
    {
        id: '20',
        name: 'Jonbeel Mela',
        date: 'Third weekend of January',
        startDate: '2026-01-17',
        endDate: '2026-01-18',
        month: 'JAN',
        year: 2026,
        location: 'Jonbeel, Morigaon',
        district: 'Morigaon',
        region: 'Central Assam',
        community: 'Tiwa',
        type: 'regional',
        description: 'Unique barter fair where hill tribes exchange goods with plains people, preserving ancient trading traditions.',
        highlights: ['Barter trading', 'Community fish catching', 'Tribal gatherings', 'Cultural exchange'],
        isMajor: true
    },
    {
        id: '21',
        name: 'Dehing Patkai Festival',
        date: 'Last week of January',
        startDate: '2026-01-24',
        endDate: '2026-01-26',
        month: 'JAN',
        year: 2026,
        location: 'Lekhapani, Margherita',
        district: 'Tinsukia',
        region: 'Upper Assam',
        type: 'regional',
        description: 'Adventure and cultural festival showcasing the rich heritage of Upper Assam with river rafting, trekking, and cultural performances.',
        highlights: ['River rafting', 'Jungle trekking', 'Cultural shows', 'Local cuisine stalls']
    },
    {
        id: '22',
        name: 'Brahmaputra Beach Festival',
        date: 'February',
        startDate: '2026-02-15',
        endDate: '2026-02-17',
        month: 'FEB',
        year: 2026,
        location: 'Guwahati Riverfront',
        district: 'Kamrup Metro',
        region: 'Central Assam',
        type: 'regional',
        description: 'River beach festival with water sports, cultural programs, and local food stalls along the Brahmaputra banks.',
        highlights: ['Beach games', 'Water sports', 'Cultural performances', 'Food festival']
    },
    {
        id: '23',
        name: 'Kaziranga Elephant Festival',
        date: 'February',
        startDate: '2026-02-05',
        endDate: '2026-02-07',
        month: 'FEB',
        year: 2026,
        location: 'Kaziranga National Park',
        district: 'Golaghat',
        region: 'Central Assam',
        type: 'regional',
        description: 'Festival celebrating the majestic Asian elephant with elephant shows, nature walks, and wildlife awareness programs.',
        highlights: ['Elephant processions', 'Wildlife awareness', 'Cultural programs', 'Nature walks']
    }
];

// Available years for the calendar
const years = [2025, 2026, 2027];

// Month names
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Regions for filtering
const regions = ['All Regions', 'Statewide', 'Upper Assam', 'Lower Assam', 'Central Assam', 'Barak Valley', 'BTR', 'Hill Districts'];

// Festival types
const festivalTypes = [
    { id: 'all', label: 'All Types', color: 'var(--text-secondary)' },
    { id: 'state', label: 'State Festivals', color: 'var(--tea-deep)' },
    { id: 'tribal', label: 'Tribal', color: 'var(--mekhela-red)' },
    { id: 'religious', label: 'Religious', color: 'var(--muga-gold)' },
    { id: 'regional', label: 'Regional', color: 'var(--brahma-blue)' },
    { id: 'local', label: 'Local', color: 'var(--earth-assam)' }
];

// Communities
const communities = ['All Communities', 'Mising', 'Bodo', 'Karbi', 'Tai-Ahom', 'Tiwa', 'Rabha', 'Garo', 'Tai Phake'];

export default function FestivalsPage() {
    const [selectedYear, setSelectedYear] = useState(2026);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState('All Regions');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedCommunity, setSelectedCommunity] = useState('All Communities');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter festivals
    const filteredFestivals = allFestivals.filter(festival => {
        const matchesYear = festival.year === selectedYear;
        const matchesMonth = !selectedMonth || festival.month === selectedMonth;
        const matchesRegion = selectedRegion === 'All Regions' || festival.region === selectedRegion || festival.region === 'Statewide';
        const matchesType = selectedType === 'all' || festival.type === selectedType;
        const matchesCommunity = selectedCommunity === 'All Communities' || festival.community === selectedCommunity;
        const matchesSearch = !searchQuery ||
            festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            festival.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (festival.community?.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesYear && matchesMonth && matchesRegion && matchesType && matchesCommunity && matchesSearch;
    });

    // Group by month
    const festivalsByMonth = months.reduce((acc, month) => {
        acc[month] = filteredFestivals.filter(f => f.month === month);
        return acc;
    }, {} as Record<string, Festival[]>);

    // Get type badge color
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'state': return 'badge-tea';
            case 'tribal': return 'badge-tribal';
            case 'religious': return 'badge-muga';
            case 'regional': return 'badge-river';
            default: return 'badge-tea';
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-20 relative overflow-hidden"
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

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="badge badge-muga mb-4">
                                <Calendar className="w-4 h-4" />
                                Cultural Calendar
                            </span>
                            <h1
                                className="text-4xl md:text-5xl font-bold text-white mb-4"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Festivals & <span style={{ color: 'var(--muga-light)' }}>Celebrations</span>
                            </h1>
                            <p className="text-lg text-white/80 max-w-2xl">
                                Discover Assam's vibrant cultural calendar — from grand state celebrations
                                to intimate tribal ceremonies and regional festivities
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSelectedYear(Math.max(2025, selectedYear - 1))}
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(255,255,255,0.1)' }}
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="px-6 py-3 rounded-xl font-semibold text-lg"
                                style={{
                                    background: 'white',
                                    color: 'var(--tea-deep)',
                                    border: 'none'
                                }}
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => setSelectedYear(Math.min(2027, selectedYear + 1))}
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(255,255,255,0.1)' }}
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filters Section */}
            <section className="py-6 sticky top-0 z-40" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}>
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search festivals, communities, locations..."
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

                        {/* Filter Pills */}
                        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar w-full lg:w-auto">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${showFilters ? 'text-white' : ''}`}
                                style={{
                                    background: showFilters ? 'var(--gradient-tea)' : 'var(--bg-card)',
                                    border: '1px solid var(--border-light)'
                                }}
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>

                            {/* Type Pills */}
                            {festivalTypes.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedType === type.id ? 'text-white shadow-lg' : ''
                                        }`}
                                    style={{
                                        background: selectedType === type.id ? type.color : 'var(--bg-card)',
                                        border: '1px solid var(--border-light)',
                                        color: selectedType === type.id ? 'white' : type.color
                                    }}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 flex flex-wrap gap-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                            <div className="flex-1 min-w-48">
                                <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>Region</label>
                                <select
                                    value={selectedRegion}
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                    className="input-field py-2"
                                >
                                    {regions.map(region => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 min-w-48">
                                <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>Community</label>
                                <select
                                    value={selectedCommunity}
                                    onChange={(e) => setSelectedCommunity(e.target.value)}
                                    className="input-field py-2"
                                >
                                    {communities.map(comm => (
                                        <option key={comm} value={comm}>{comm}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setSelectedRegion('All Regions');
                                        setSelectedCommunity('All Communities');
                                        setSelectedType('all');
                                        setSearchQuery('');
                                        setSelectedMonth(null);
                                    }}
                                    className="btn-ghost text-sm"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Month Navigation */}
            <section className="py-4" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container-custom">
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
                        <button
                            onClick={() => setSelectedMonth(null)}
                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${!selectedMonth ? 'text-white shadow-lg' : ''
                                }`}
                            style={{
                                background: !selectedMonth ? 'var(--gradient-muga)' : 'var(--bg-card)',
                                border: '1px solid var(--border-light)'
                            }}
                        >
                            All Year
                        </button>
                        {months.map((month, index) => {
                            const hasEvents = festivalsByMonth[month]?.length > 0;
                            return (
                                <button
                                    key={month}
                                    onClick={() => setSelectedMonth(month === selectedMonth ? null : month)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedMonth === month ? 'text-white shadow-lg' : ''
                                        }`}
                                    style={{
                                        background: selectedMonth === month ? 'var(--gradient-tea)' : 'var(--bg-card)',
                                        border: '1px solid var(--border-light)',
                                        opacity: hasEvents ? 1 : 0.5
                                    }}
                                >
                                    {monthNames[index]}
                                    {hasEvents && (
                                        <span
                                            className="ml-2 px-2 py-0.5 rounded-full text-xs"
                                            style={{
                                                background: selectedMonth === month ? 'rgba(255,255,255,0.2)' : 'var(--muga-gold)',
                                                color: selectedMonth === month ? 'white' : 'white'
                                            }}
                                        >
                                            {festivalsByMonth[month].length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Festivals Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    {filteredFestivals.length === 0 ? (
                        <div className="text-center py-20">
                            <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                            <h3 className="text-xl font-semibold mb-2">No festivals found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <>
                            {/* Results count */}
                            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                                Showing <strong>{filteredFestivals.length}</strong> festivals
                                {selectedMonth && ` in ${monthNames[months.indexOf(selectedMonth)]}`}
                                {selectedRegion !== 'All Regions' && ` • ${selectedRegion}`}
                                {selectedCommunity !== 'All Communities' && ` • ${selectedCommunity} community`}
                            </p>

                            {/* Group by month if "All Year" selected */}
                            {!selectedMonth ? (
                                <div className="space-y-12">
                                    {months.map((month, monthIndex) => {
                                        const monthFestivals = festivalsByMonth[month];
                                        if (!monthFestivals || monthFestivals.length === 0) return null;

                                        return (
                                            <div key={month}>
                                                <h2
                                                    className="text-2xl font-bold mb-6 flex items-center gap-3"
                                                    style={{ fontFamily: 'var(--font-heading)' }}
                                                >
                                                    <span
                                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                                                        style={{ background: 'var(--gradient-tea)' }}
                                                    >
                                                        {month}
                                                    </span>
                                                    {monthNames[monthIndex]} {selectedYear}
                                                </h2>
                                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {monthFestivals.map((festival) => (
                                                        <FestivalCard key={festival.id} festival={festival} getTypeColor={getTypeColor} />
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredFestivals.map((festival) => (
                                        <FestivalCard key={festival.id} festival={festival} getTypeColor={getTypeColor} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Download Calendar CTA */}
            <section className="section-padding-sm" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container-custom">
                    <div className="heritage-card p-8 md:p-12 text-center">
                        <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muga-gold)' }} />
                        <h3
                            className="text-2xl font-bold mb-3"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Never Miss a Festival
                        </h3>
                        <p className="mb-6 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Download the complete festival calendar for {selectedYear} or sync with your Google Calendar
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="btn-primary">
                                Download PDF Calendar
                            </button>
                            <button className="btn-secondary">
                                Sync to Google Calendar
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Festival Card Component
function FestivalCard({ festival, getTypeColor }: { festival: Festival; getTypeColor: (type: string) => string }) {
    return (
        <div className="festival-card group hover:shadow-xl transition-all">
            {festival.image && (
                <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <Image
                        src={festival.image}
                        alt={festival.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 50%)' }}
                    />
                    {festival.isMajor && (
                        <span
                            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                            style={{ background: 'var(--gradient-muga)' }}
                        >
                            <Star className="w-3 h-3 inline mr-1" />
                            Major Festival
                        </span>
                    )}
                </div>
            )}

            <div className="flex items-start gap-4">
                <div
                    className="festival-month flex-shrink-0"
                    style={{ background: festival.isMajor ? 'var(--gradient-muga)' : 'var(--gradient-tea)' }}
                >
                    {festival.month}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`badge ${getTypeColor(festival.type)}`}>
                            {festival.type === 'tribal' && festival.community
                                ? festival.community
                                : festival.type.charAt(0).toUpperCase() + festival.type.slice(1)}
                        </span>
                        {festival.region !== 'Statewide' && (
                            <span className="badge badge-river">
                                {festival.region}
                            </span>
                        )}
                    </div>
                    <h3 className="font-semibold text-lg mb-1 truncate">
                        {festival.name}
                    </h3>
                    {festival.nameAssamese && (
                        <p className="text-sm mb-1" style={{ color: 'var(--muga-gold)' }}>
                            {festival.nameAssamese}
                        </p>
                    )}
                    <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                        <Clock className="w-4 h-4" />
                        {festival.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <MapPin className="w-4 h-4" />
                        {festival.location}
                    </div>
                </div>
            </div>

            <p className="text-sm mt-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {festival.description}
            </p>

            {festival.highlights && festival.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {festival.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 rounded-full text-xs"
                            style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                        >
                            {highlight}
                        </span>
                    ))}
                    {festival.highlights.length > 3 && (
                        <span
                            className="px-2 py-1 rounded-full text-xs"
                            style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                        >
                            +{festival.highlights.length - 3} more
                        </span>
                    )}
                </div>
            )}

            <Link
                href={`/festivals/${festival.id}`}
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium transition-colors"
                style={{ color: 'var(--brahma-blue)' }}
            >
                Learn More
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
