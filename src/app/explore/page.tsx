"use client";

import { useState } from "react";
import Image from "next/image";
import { LeafletMap } from "@/components/map/LeafletMap";
import {
    Search,
    Filter,
    MapPin,
    Clock,
    ChevronRight,
    X,
    Compass,
    Mountain,
    Building2,
    TreePine,
    ShoppingBag,
    Camera,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { cn, POI_CATEGORY_ICONS, POI_CATEGORY_LABELS } from "@/lib/utils";
import type { MapMarker, POI } from "@/types";

// Sample POI data for Assam
const SAMPLE_POIS: MapMarker[] = [
    {
        id: "1",
        name: "Kamakhya Temple",
        latitude: 26.1664,
        longitude: 91.7054,
        type: "poi",
        category: "TEMPLE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kamakhya_Temple%2C_Guwahati.jpg/1280px-Kamakhya_Temple%2C_Guwahati.jpg",
    },
    {
        id: "2",
        name: "Kaziranga National Park",
        latitude: 26.5774,
        longitude: 93.1711,
        type: "poi",
        category: "NATURE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/One_horn_Rhinoceros_at_Kaziranga_national_park.jpg/1280px-One_horn_Rhinoceros_at_Kaziranga_national_park.jpg",
    },
    {
        id: "3",
        name: "Rang Ghar",
        latitude: 26.9846,
        longitude: 94.6329,
        type: "poi",
        category: "MONUMENT",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rang_Ghar%2C_Sivasagar.jpg/1280px-Rang_Ghar%2C_Sivasagar.jpg",
    },
    {
        id: "4",
        name: "Kamalabari Satra",
        latitude: 26.9300,
        longitude: 94.2167,
        type: "poi",
        category: "RELIGIOUS",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kamalabari_Satra%2C_Majuli.jpg/1280px-Kamalabari_Satra%2C_Majuli.jpg",
    },
    {
        id: "5",
        name: "Umananda Temple",
        latitude: 26.1891,
        longitude: 91.7497,
        type: "poi",
        category: "TEMPLE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Umananda_Island.jpg/1280px-Umananda_Island.jpg",
    },
    {
        id: "6",
        name: "Sualkuchi Weaving Village",
        latitude: 26.1667,
        longitude: 91.5667,
        type: "poi",
        category: "MARKET",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muga_silk_weaving_in_Assam.jpg/1280px-Muga_silk_weaving_in_Assam.jpg",
    },
    {
        id: "7",
        name: "Manas National Park",
        latitude: 26.6594,
        longitude: 90.9476,
        type: "poi",
        category: "NATURE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Asian_Elephant_Manas.jpg/1280px-Asian_Elephant_Manas.jpg",
    },
    {
        id: "8",
        name: "Sivasagar Tank (Joysagar)",
        latitude: 26.9844,
        longitude: 94.6406,
        type: "poi",
        category: "MONUMENT",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Sivasagar_Tank.jpg/1280px-Sivasagar_Tank.jpg",
    },
    {
        id: "9",
        name: "Talatal Ghar",
        latitude: 26.9831,
        longitude: 94.6347,
        type: "poi",
        category: "MONUMENT",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Talatal_Ghar.jpg/1280px-Talatal_Ghar.jpg",
    },
    {
        id: "10",
        name: "Haflong Lake",
        latitude: 25.1667,
        longitude: 93.0167,
        type: "poi",
        category: "VIEWPOINT",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Haflong_Lake%2C_Assam.jpg/1280px-Haflong_Lake%2C_Assam.jpg",
    },
    {
        id: "11",
        name: "Majuli Island",
        latitude: 26.9500,
        longitude: 94.1667,
        type: "poi",
        category: "NATURE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Majuli_Island.jpg/1280px-Majuli_Island.jpg",
    },
    {
        id: "12",
        name: "Dibrugarh Tea Gardens",
        latitude: 27.4728,
        longitude: 94.9120,
        type: "poi",
        category: "VIEWPOINT",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tea_garden_in_Assam.jpg/1280px-Tea_garden_in_Assam.jpg",
    },
    {
        id: "13",
        name: "Jorhat Gibbon Sanctuary",
        latitude: 26.7509,
        longitude: 94.2037,
        type: "poi",
        category: "NATURE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Hoolock_Gibbon.jpg/1280px-Hoolock_Gibbon.jpg",
    },
    {
        id: "14",
        name: "Navagraha Temple",
        latitude: 26.1800,
        longitude: 91.7800,
        type: "poi",
        category: "TEMPLE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Navagraha_Temple_Guwahati.jpg/1280px-Navagraha_Temple_Guwahati.jpg",
    },
    {
        id: "15",
        name: "Pobitora Wildlife Sanctuary",
        latitude: 26.2397,
        longitude: 92.0589,
        type: "poi",
        category: "NATURE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rhino_at_Pobitora.jpg/1280px-Rhino_at_Pobitora.jpg",
    },
    {
        id: "16",
        name: "Tezpur (Agnigarh Hill)",
        latitude: 26.6338,
        longitude: 92.7926,
        type: "poi",
        category: "VIEWPOINT",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Agnigarh_Hill_Tezpur.jpg/1280px-Agnigarh_Hill_Tezpur.jpg",
    },
    {
        id: "17",
        name: "Nameri National Park",
        latitude: 26.9167,
        longitude: 92.7833,
        type: "poi",
        category: "NATURE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nameri_National_Park.jpg/1280px-Nameri_National_Park.jpg",
    },
    {
        id: "18",
        name: "Basistha Ashram Temple",
        latitude: 26.1000,
        longitude: 91.8000,
        type: "poi",
        category: "TEMPLE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Basistha_Temple_Guwahati.jpg/1280px-Basistha_Temple_Guwahati.jpg",
    },
];

const CATEGORIES = [
    { id: "ALL", label: "All Places", icon: MapPin },
    { id: "TEMPLE", label: "Temples", icon: Building2 },
    { id: "RELIGIOUS", label: "Heritage Sites", icon: Building2 },
    { id: "MONUMENT", label: "Monuments", icon: Mountain },
    { id: "VIEWPOINT", label: "Viewpoints", icon: Camera },
    { id: "MARKET", label: "Artisan Villages", icon: ShoppingBag },
    { id: "NATURE", label: "Wildlife", icon: TreePine },
];

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedPOI, setSelectedPOI] = useState<MapMarker | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredPOIs = SAMPLE_POIS.filter((poi) => {
        const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "ALL" || poi.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleMarkerClick = (marker: MapMarker) => {
        setSelectedPOI(marker);
        setIsSidebarOpen(true);
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden -mt-[var(--header-height)] pt-[var(--header-height)]">
            <main className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={cn(
                        "w-[var(--sidebar-width)] bg-[var(--bg-card)] border-r border-[var(--border-light)]",
                        "flex flex-col transition-all duration-300 z-20",
                        "md:relative h-full",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0 md:opacity-0"
                    )}
                >
                    {/* Sidebar Header with Branding */}
                    <div className="py-3 px-4 border-b border-[var(--border-light)] bg-gradient-to-r from-[var(--tea-deep)]/5 to-transparent">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shadow-sm border border-[var(--border-light)] bg-white flex items-center justify-center flex-shrink-0">
                                <Image
                                    src="/explore.png"
                                    alt="Explore"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <div>
                                <h1 className="text-base font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Explore
                                </h1>
                                <p className="text-[11px] text-[var(--text-muted)] leading-tight">
                                    Discover Assam's treasures
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="py-3 px-4 border-b border-[var(--border-light)]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                placeholder="Search places..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-[var(--bg-secondary)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--heritage-gold)]"
                            />
                        </div>
                    </div>

                    {/* Dynamic Category Filter */}
                    <div className="py-3 px-4 border-b border-[var(--border-light)]">
                        {/* Filter Toggle Button */}
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border-light)] transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-[var(--tea-deep)]" />
                                <span className="text-sm font-medium">Filter by Category</span>
                            </div>
                            {isFilterOpen ? (
                                <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                            )}
                        </button>

                        {/* Selected Filter Chip (shown when filter is closed and a filter is active) */}
                        {!isFilterOpen && selectedCategory !== "ALL" && (
                            <div className="mt-3 flex items-center gap-2 animate-slide-up">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--tea-deep)] text-white shadow-md">
                                    {(() => {
                                        const cat = CATEGORIES.find(c => c.id === selectedCategory);
                                        const Icon = cat?.icon || MapPin;
                                        return <Icon className="w-3 h-3" />;
                                    })()}
                                    <span>{CATEGORIES.find(c => c.id === selectedCategory)?.label}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCategory("ALL");
                                        }}
                                        className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Expandable Filter Options */}
                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                isFilterOpen ? "max-h-48 opacity-100 mt-3" : "max-h-0 opacity-0"
                            )}
                        >
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => {
                                                setSelectedCategory(cat.id);
                                                setIsFilterOpen(false);
                                            }}
                                            className={cn(
                                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                                                selectedCategory === cat.id
                                                    ? "bg-[var(--tea-deep)] text-white shadow-md scale-105"
                                                    : "bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--tea-deep)]/30"
                                            )}
                                        >
                                            <Icon className="w-3 h-3" />
                                            {cat.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* POI List */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium">{filteredPOIs.length} Places Found</span>
                                <Compass className="w-4 h-4 text-[var(--heritage-gold)]" />
                            </div>
                            <div className="space-y-3">
                                {filteredPOIs.map((poi) => (
                                    <button
                                        key={poi.id}
                                        onClick={() => handleMarkerClick(poi)}
                                        className={cn(
                                            "w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300",
                                            "border border-transparent",
                                            selectedPOI?.id === poi.id
                                                ? "bg-[var(--bg-card)] shadow-xl border-[var(--muga-gold)] ring-1 ring-[var(--muga-gold)]/20 translate-x-1"
                                                : "bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] hover:shadow-lg hover:border-[var(--border-medium)]"
                                        )}
                                    >
                                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-[var(--border-light)]">
                                            {poi.image ? (
                                                <img src={poi.image} alt={poi.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-[var(--border-light)] flex items-center justify-center text-2xl">
                                                    {POI_CATEGORY_ICONS[poi.category || "OTHER"]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate">{poi.name}</h4>
                                            <p className="text-xs text-[var(--text-muted)] mt-0.5">
                                                {POI_CATEGORY_ICONS[poi.category || "OTHER"]} {POI_CATEGORY_LABELS[poi.category || "OTHER"]}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2 text-xs text-[var(--text-secondary)]">
                                                <Clock className="w-3 h-3" />
                                                <span>45-60 min</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-1" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Map Container */}
                <div
                    className="flex-1 relative h-full"
                    style={{ height: 'calc(100vh - var(--header-height))' }}
                >
                    <LeafletMap
                        className="absolute inset-0 w-full h-full"
                        pois={filteredPOIs.map(poi => ({
                            id: poi.id,
                            name: poi.name,
                            latitude: poi.latitude,
                            longitude: poi.longitude,
                            category: poi.category || 'OTHER',
                            image: poi.image,
                            description: `Explore this ${poi.category?.toLowerCase() || 'location'} in Assam`
                        }))}
                        onPOIClick={(poi) => {
                            const found = SAMPLE_POIS.find(p => p.id === poi.id);
                            if (found) handleMarkerClick(found);
                        }}
                        selectedPOI={selectedPOI?.id}
                    />

                    {/* Mobile Sidebar Toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden absolute top-4 left-4 z-30 p-3 bg-[var(--bg-card)] rounded-xl shadow-lg"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                    </button>

                    {/* Selected POI Card */}
                    {selectedPOI && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-20 w-[calc(100%-48px)] md:w-80 animate-slide-up">
                            <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl overflow-hidden">
                                <div className="relative h-32">
                                    {selectedPOI.image && (
                                        <img
                                            src={selectedPOI.image}
                                            alt={selectedPOI.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <button
                                        onClick={() => setSelectedPOI(null)}
                                        className="absolute top-2 right-2 p-1.5 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <span className="absolute bottom-2 left-3 text-white text-xs font-medium px-2 py-1 bg-black/30 rounded-full">
                                        {POI_CATEGORY_ICONS[selectedPOI.category || "OTHER"]} {POI_CATEGORY_LABELS[selectedPOI.category || "OTHER"]}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-heading font-semibold text-lg">{selectedPOI.name}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                                        A magnificent heritage site showcasing ancient Vijayanagara architecture.
                                    </p>
                                    <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> 45-60 min
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> Hampi
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <a
                                            href={`/pois/${selectedPOI.id}`}
                                            className="flex-1 btn-primary py-2 text-sm justify-center"
                                        >
                                            View Details
                                        </a>
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPOI.latitude},${selectedPOI.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary py-2 px-3 text-sm"
                                        >
                                            <MapPin className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
