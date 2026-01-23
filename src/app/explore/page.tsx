"use client";

import { useState } from "react";
import { Header } from "@/components/ui/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { InteractiveMap } from "@/components/map/InteractiveMap";
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
    Camera
} from "lucide-react";
import { cn, POI_CATEGORY_ICONS, POI_CATEGORY_LABELS } from "@/lib/utils";
import type { MapMarker, POI } from "@/types";

// Sample POI data for Hampi
const SAMPLE_POIS: MapMarker[] = [
    {
        id: "1",
        name: "Virupaksha Temple",
        latitude: 15.335,
        longitude: 76.46,
        type: "poi",
        category: "TEMPLE",
        image: "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=400&q=80",
    },
    {
        id: "2",
        name: "Vittala Temple Complex",
        latitude: 15.3267,
        longitude: 76.4702,
        type: "poi",
        category: "TEMPLE",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80",
    },
    {
        id: "3",
        name: "Elephant Stables",
        latitude: 15.3181,
        longitude: 76.4642,
        type: "poi",
        category: "MONUMENT",
        image: "https://images.unsplash.com/photo-1564294636501-be9877b18f68?w=400&q=80",
    },
    {
        id: "4",
        name: "Lotus Mahal",
        latitude: 15.3186,
        longitude: 76.4621,
        type: "poi",
        category: "PALACE",
        image: "https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=400&q=80",
    },
    {
        id: "5",
        name: "Matanga Hill",
        latitude: 15.3361,
        longitude: 76.4616,
        type: "poi",
        category: "VIEWPOINT",
        image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=400&q=80",
    },
    {
        id: "6",
        name: "Hampi Bazaar",
        latitude: 15.3348,
        longitude: 76.4608,
        type: "poi",
        category: "MARKET",
        image: "https://images.unsplash.com/photo-1545043059-438f9b8f9aa8?w=400&q=80",
    },
];

const CATEGORIES = [
    { id: "ALL", label: "All Places", icon: MapPin },
    { id: "TEMPLE", label: "Temples", icon: Building2 },
    { id: "PALACE", label: "Palaces", icon: Building2 },
    { id: "MONUMENT", label: "Monuments", icon: Mountain },
    { id: "VIEWPOINT", label: "Viewpoints", icon: Camera },
    { id: "MARKET", label: "Markets", icon: ShoppingBag },
    { id: "NATURE", label: "Nature", icon: TreePine },
];

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedPOI, setSelectedPOI] = useState<MapMarker | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[var(--header-height)] flex">
                {/* Sidebar */}
                <aside
                    className={cn(
                        "w-[var(--sidebar-width)] bg-[var(--bg-card)] border-r border-[var(--border-light)]",
                        "flex flex-col transition-all duration-300 z-20",
                        "fixed md:relative h-[calc(100vh-var(--header-height))]",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0 md:opacity-0"
                    )}
                >
                    {/* Search */}
                    <div className="p-4 border-b border-[var(--border-light)]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                placeholder="Search places..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[var(--bg-secondary)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--heritage-gold)]"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="p-4 border-b border-[var(--border-light)]">
                        <div className="flex items-center gap-2 mb-3">
                            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
                            <span className="text-sm font-medium">Filter by Category</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={cn(
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                                            selectedCategory === cat.id
                                                ? "bg-gradient-heritage text-white"
                                                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-light)]"
                                        )}
                                    >
                                        <Icon className="w-3 h-3" />
                                        {cat.label}
                                    </button>
                                );
                            })}
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
                                            "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors",
                                            selectedPOI?.id === poi.id
                                                ? "bg-[var(--heritage-gold)]/10 ring-2 ring-[var(--heritage-gold)]"
                                                : "bg-[var(--bg-secondary)] hover:bg-[var(--border-light)]"
                                        )}
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
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
                <div className="flex-1 relative">
                    <InteractiveMap
                        className="absolute inset-0"
                        initialCenter={[76.46, 15.335]}
                        initialZoom={13}
                        markers={filteredPOIs}
                        onMarkerClick={handleMarkerClick}
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

            <ChatWidget />
        </div>
    );
}
