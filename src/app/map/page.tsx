'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
    ChevronLeft, MapPin, Filter, Search, Layers, Compass,
    X, Star, Clock, Users, Camera, Tent, Mountain, Bird,
    Leaf, Waves, Heart, Navigation, ZoomIn, ZoomOut, LocateFixed
} from 'lucide-react';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let L: any = null;

// Fix for default marker icons in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

// Custom Icon Function
const createCustomIcon = (category: string) => {
    return new L.Icon({
        iconUrl: iconUrl,
        iconRetinaUrl: iconRetinaUrl,
        shadowUrl: shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

/* ============================================
   INTERACTIVE MAP PAGE
   Heritage Mapping & Discovery
   ============================================ */

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);

const ZoomControl = dynamic(
    () => import('react-leaflet').then((mod) => mod.ZoomControl),
    { ssr: false }
);

// POI Categories
const categories = [
    { id: 'all', label: 'All Places', icon: <MapPin className="w-4 h-4" /> },
    { id: 'wildlife', label: 'Wildlife', icon: <Bird className="w-4 h-4" /> },
    { id: 'heritage', label: 'Heritage Sites', icon: <Camera className="w-4 h-4" /> },
    { id: 'nature', label: 'Nature', icon: <Leaf className="w-4 h-4" /> },
    { id: 'temple', label: 'Temples', icon: <Heart className="w-4 h-4" /> },
    { id: 'river', label: 'Rivers & Islands', icon: <Waves className="w-4 h-4" /> },
    { id: 'tribal', label: 'Tribal Villages', icon: <Tent className="w-4 h-4" /> },
    { id: 'tea', label: 'Tea Gardens', icon: <Leaf className="w-4 h-4" /> },
    { id: 'adventure', label: 'Adventure', icon: <Mountain className="w-4 h-4" /> },
];

// Sample POI data for Assam
const samplePOIs = [
    {
        id: '1',
        name: 'Kaziranga National Park',
        slug: 'kaziranga-national-park',
        category: 'wildlife',
        description: 'UNESCO World Heritage Site home to two-thirds of the world\'s one-horned rhinoceroses.',
        lat: 26.5775,
        lng: 93.1711,
        district: 'Golaghat',
        rating: 4.9,
        reviewCount: 2340,
        timings: '6:00 AM - 5:00 PM (Nov-Apr)',
        entryFee: { indian: 100, foreigner: 650 },
        image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&q=80',
        highlights: ['One-horned Rhino', 'Elephant Safari', 'Jeep Safari', 'Bird Watching'],
        safetyTips: ['Maintain safe distance from animals', 'Follow guide instructions'],
        culturalNorms: ['Photography permitted', 'No flash photography'],
    },
    {
        id: '2',
        name: 'Kamakhya Temple',
        slug: 'kamakhya-temple',
        category: 'temple',
        description: 'One of the oldest Shakti Peethas, dedicated to goddess Kamakhya atop Nilachal Hill.',
        lat: 26.1663,
        lng: 91.7052,
        district: 'Kamrup Metro',
        rating: 4.7,
        reviewCount: 5670,
        timings: '8:00 AM - 5:00 PM',
        entryFee: { indian: 0, foreigner: 0 },
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80',
        highlights: ['Shakti Peetha', 'Ambubachi Mela', 'Panoramic City Views'],
        safetyTips: ['Be prepared for long queues', 'Carry water'],
        culturalNorms: ['Remove footwear', 'Modest dress required', 'No leather items'],
    },
    {
        id: '3',
        name: 'Majuli Island',
        slug: 'majuli-island',
        category: 'river',
        description: 'The world\'s largest river island and center of Vaishnavite culture with ancient Satras.',
        lat: 26.9500,
        lng: 94.1667,
        district: 'Majuli',
        rating: 4.8,
        reviewCount: 1890,
        timings: 'Open 24 hours',
        entryFee: { indian: 0, foreigner: 0 },
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
        highlights: ['Satras', 'Mask Making', 'Mising Villages', 'Sunrise Views'],
        safetyTips: ['Ferry timings vary by season', 'Book accommodation in advance'],
        culturalNorms: ['Respect Satra traditions', 'Ask before photographing monks'],
    },
    {
        id: '4',
        name: 'Rang Ghar',
        slug: 'rang-ghar',
        category: 'heritage',
        description: 'Asia\'s oldest surviving amphitheatre, built by the Ahom kings in the 18th century.',
        lat: 26.9850,
        lng: 94.6367,
        district: 'Sivasagar',
        rating: 4.6,
        reviewCount: 890,
        timings: '9:00 AM - 5:00 PM',
        entryFee: { indian: 25, foreigner: 300 },
        image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=400&q=80',
        highlights: ['Ahom Architecture', 'Royal Amphitheatre', 'Historical Significance'],
        safetyTips: ['Watch your step on stairs', 'No climbing on structures'],
        culturalNorms: ['No littering', 'Respect the heritage site'],
    },
    {
        id: '5',
        name: 'Manas National Park',
        slug: 'manas-national-park',
        category: 'wildlife',
        description: 'UNESCO World Heritage Site known for rare wildlife including pygmy hog and golden langur.',
        lat: 26.6594,
        lng: 90.9496,
        district: 'Baksa',
        rating: 4.7,
        reviewCount: 1120,
        timings: '6:00 AM - 5:00 PM (Nov-Apr)',
        entryFee: { indian: 100, foreigner: 500 },
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
        highlights: ['Golden Langur', 'Pygmy Hog', 'River Rafting', 'Community Lodges'],
        safetyTips: ['Follow park guidelines', 'Stay with your guide'],
        culturalNorms: ['Support local Bodo communities'],
    },
    {
        id: '6',
        name: 'Jorhat Tea Bungalows',
        slug: 'jorhat-tea-bungalows',
        category: 'tea',
        description: 'Heritage tea estate bungalows offering authentic colonial tea planter experience.',
        lat: 26.7509,
        lng: 94.2037,
        district: 'Jorhat',
        rating: 4.8,
        reviewCount: 670,
        timings: 'By appointment',
        entryFee: { indian: 500, foreigner: 500 },
        image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=400&q=80',
        highlights: ['Tea Plucking', 'Factory Tour', 'High Tea', 'Colonial Architecture'],
        safetyTips: ['Wear comfortable shoes', 'Carry sunscreen'],
        culturalNorms: ['Respect worker privacy'],
    },
    {
        id: '7',
        name: 'Haflong',
        slug: 'haflong',
        category: 'nature',
        description: 'Assam\'s only hill station offering cool weather, lakes, and stunning mountain views.',
        lat: 25.1642,
        lng: 93.0167,
        district: 'Dima Hasao',
        rating: 4.5,
        reviewCount: 780,
        timings: 'Open 24 hours',
        entryFee: { indian: 0, foreigner: 0 },
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
        highlights: ['Haflong Lake', 'Jatinga', 'Blue Mountains', 'Dimasa Culture'],
        safetyTips: ['Roads can be challenging', 'Weather changes quickly'],
        culturalNorms: ['Respect local Dimasa traditions'],
    },
    {
        id: '8',
        name: 'Mising Tribal Village',
        slug: 'mising-tribal-village',
        category: 'tribal',
        description: 'Experience the riverine tribe\'s unique stilt houses, cuisine, and traditions.',
        lat: 26.8833,
        lng: 94.2167,
        district: 'Lakhimpur',
        rating: 4.6,
        reviewCount: 340,
        timings: 'By arrangement',
        entryFee: { indian: 0, foreigner: 0 },
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
        highlights: ['Stilt Houses', 'Apong Rice Beer', 'Traditional Weaving', 'Ali Aye Ligang'],
        safetyTips: ['Book through authorized guides', 'Respect village rules'],
        culturalNorms: ['Ask permission for photos', 'Participate respectfully'],
    },
];

// Heritage Trails
const heritageTrails = [
    {
        id: '1',
        name: 'Ahom Heritage Trail',
        description: 'Explore 600 years of Ahom Kingdom history',
        pois: ['rang-ghar', 'talatal-ghar', 'sivasagar-tank'],
        duration: '1 Day',
        distance: '15 km',
        difficulty: 'Easy',
    },
    {
        id: '2',
        name: 'Spiritual Guwahati',
        description: 'Visit ancient temples and spiritual sites',
        pois: ['kamakhya-temple', 'umananda', 'navagraha'],
        duration: 'Half Day',
        distance: '8 km',
        difficulty: 'Easy',
    },
    {
        id: '3',
        name: 'Wildlife Safari Circuit',
        description: 'Best of Assam\'s national parks',
        pois: ['kaziranga-national-park', 'manas-national-park', 'pobitora'],
        duration: '4-5 Days',
        distance: '350 km',
        difficulty: 'Moderate',
    },
];

export default function MapPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPOI, setSelectedPOI] = useState<typeof samplePOIs[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showTrails, setShowTrails] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

    // Assam center coordinates
    const assamCenter: [number, number] = [26.2006, 92.9376];
    const defaultZoom = 7;

    // Filter POIs
    const filteredPOIs = samplePOIs.filter(poi => {
        const matchesCategory = selectedCategory === 'all' || poi.category === selectedCategory;
        const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            poi.district.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        // Load Leaflet component dynamically on client side
        import('leaflet').then(mod => {
            L = mod.default || mod;

            // Fix for default marker icons (now safe to execute)
            // We need to re-apply this fix here because L is now loaded
            const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
            const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
            const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconUrl,
                iconRetinaUrl,
                shadowUrl,
            });

            setMapLoaded(true);
        });
    }, []);

    return (
        <div className="h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="flex-shrink-0 py-4 px-4 md:px-6 z-50"
                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-medium"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </Link>
                        <h1
                            className="text-xl font-bold hidden md:block"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Explore Assam Map
                        </h1>
                    </div>

                    {/* Search */}
                    <div className="flex-1 max-w-md mx-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search places, districts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-10 py-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`btn-ghost ${showFilters ? 'bg-secondary' : ''}`}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="hidden md:inline">Filters</span>
                        </button>
                        <button
                            onClick={() => setShowTrails(!showTrails)}
                            className={`btn-ghost ${showTrails ? 'bg-secondary' : ''}`}
                        >
                            <Compass className="w-4 h-4" />
                            <span className="hidden md:inline">Trails</span>
                        </button>
                    </div>
                </div>

                {/* Category Filters */}
                {showFilters && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'text-white' : ''
                                    }`}
                                style={{
                                    background: selectedCategory === cat.id ? 'var(--gradient-tea)' : 'var(--bg-card)',
                                    border: '1px solid var(--border-light)'
                                }}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            {/* Map Container */}
            <div className="flex-1 relative z-0">
                {mapLoaded && typeof window !== 'undefined' && (
                    <div className="absolute inset-0">
                        <MapContainer
                            center={assamCenter}
                            zoom={defaultZoom}
                            className="w-full h-full"
                            zoomControl={false}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <ZoomControl position="bottomleft" />

                            {filteredPOIs.map((poi) => (
                                <Marker
                                    key={poi.id}
                                    position={[poi.lat, poi.lng] as [number, number]}
                                    icon={createCustomIcon(poi.category)}
                                    eventHandlers={{
                                        click: () => setSelectedPOI(poi),
                                    }}
                                >
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                )}

                {/* Heritage Trails Panel */}
                {showTrails && (
                    <div
                        className="absolute top-4 left-4 w-80 max-h-[calc(100%-2rem)] overflow-y-auto rounded-2xl shadow-xl z-40"
                        style={{ background: 'var(--bg-card)' }}
                    >
                        <div className="p-4 sticky top-0" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)' }}>
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">Heritage Trails</h3>
                                <button onClick={() => setShowTrails(false)}>
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            {heritageTrails.map((trail) => (
                                <div
                                    key={trail.id}
                                    className="p-4 rounded-xl cursor-pointer transition-all hover:shadow-md"
                                    style={{ background: 'var(--bg-secondary)' }}
                                >
                                    <h4 className="font-semibold mb-1">{trail.name}</h4>
                                    <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                                        {trail.description}
                                    </p>
                                    <div className="flex gap-3 text-xs">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {trail.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Navigation className="w-3 h-3" /> {trail.distance}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* POI List (right side) */}
                <div
                    className="absolute top-4 right-4 w-80 max-h-[calc(100%-2rem)] overflow-y-auto rounded-2xl shadow-xl z-40"
                    style={{ background: 'var(--bg-card)' }}
                >
                    <div className="p-4 sticky top-0 z-10" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)' }}>
                        <h3 className="font-semibold">
                            {filteredPOIs.length} Places Found
                        </h3>
                    </div>
                    <div className="p-2 space-y-2">
                        {filteredPOIs.map((poi) => (
                            <button
                                key={poi.id}
                                onClick={() => setSelectedPOI(poi)}
                                className={`w-full p-3 rounded-xl text-left transition-all ${selectedPOI?.id === poi.id ? 'ring-2 ring-[var(--tea-garden)]' : ''
                                    }`}
                                style={{
                                    background: selectedPOI?.id === poi.id ? 'rgba(27, 77, 46, 0.08)' : 'var(--bg-secondary)',
                                }}
                            >
                                <div className="flex gap-3">
                                    <div
                                        className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                                        style={{ backgroundImage: `url(${poi.image})` }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm line-clamp-1">{poi.name}</h4>
                                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                            {poi.district}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="flex items-center gap-1 text-xs">
                                                <Star className="w-3 h-3" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                                {poi.rating}
                                            </span>
                                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                ({poi.reviewCount} reviews)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* POI Detail Panel */}
                {selectedPOI && (
                    <div
                        className="absolute bottom-4 left-4 right-4 md:left-auto md:right-[22rem] md:w-96 rounded-2xl shadow-xl z-50 overflow-hidden"
                        style={{ background: 'var(--bg-card)' }}
                    >
                        <div className="relative h-40">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${selectedPOI.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <button
                                onClick={() => setSelectedPOI(null)}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(0,0,0,0.5)' }}
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                            <div className="absolute bottom-3 left-3 right-3">
                                <span className="badge badge-tea text-xs capitalize">{selectedPOI.category}</span>
                                <h3 className="text-white font-bold text-lg mt-1">{selectedPOI.name}</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                                {selectedPOI.description}
                            </p>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                    <span>{selectedPOI.timings}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                    <span>{selectedPOI.district}</span>
                                </div>
                            </div>

                            {/* Entry Fee */}
                            <div
                                className="p-3 rounded-xl mb-4"
                                style={{ background: 'var(--bg-secondary)' }}
                            >
                                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Entry Fee</p>
                                <div className="flex gap-4 text-sm">
                                    <span>Indians: ₹{selectedPOI.entryFee.indian}</span>
                                    <span>Foreigners: ₹{selectedPOI.entryFee.foreigner}</span>
                                </div>
                            </div>

                            {/* Safety & Cultural Norms */}
                            <div className="space-y-2 mb-4">
                                {selectedPOI.safetyTips.map((tip, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-xs">
                                        <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: 'var(--warning)' }} />
                                        <span style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                                    </div>
                                ))}
                                {selectedPOI.culturalNorms.map((norm, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-xs">
                                        <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: 'var(--info)' }} />
                                        <span style={{ color: 'var(--text-secondary)' }}>{norm}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Link href={`/pois/${selectedPOI.slug}`} className="btn-primary flex-1">
                                    View Details
                                </Link>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPOI.lat},${selectedPOI.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-ghost"
                                >
                                    <Navigation className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Map Controls */}
                <div
                    className="absolute bottom-4 left-4 flex flex-col gap-2 z-30"
                    style={{ display: selectedPOI ? 'none' : 'flex' }}
                >
                    {/* Note: In Leaflet, standard zoom controls are usually enough, these custom ones need to hook into the map instance */}
                    {/* For simplicity we use standard ZoomControl and hide these or just keep them for show if functionality is added later. */}
                    {/* Since we added ZoomControl 'bottomleft', we can remove these or repurpose them. Let's keep Layers/Locate. */}

                    <button
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ background: 'var(--bg-card)' }}
                    >
                        <LocateFixed className="w-5 h-5" />
                    </button>
                    <button
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ background: 'var(--bg-card)' }}
                    >
                        <Layers className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
