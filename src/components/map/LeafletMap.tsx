'use client';

import dynamic from 'next/dynamic';

// Types for our map
interface POI {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    category: string;
    description?: string;
    image?: string;
}

interface LeafletMapProps {
    className?: string;
    pois?: POI[];
    onPOIClick?: (poi: POI) => void;
    selectedPOI?: string | null;
}

// Dynamic import to avoid SSR issues with Leaflet
const LeafletMapContent = dynamic<LeafletMapProps>(
    () => import('@/components/map/LeafletMapContent').then((mod) => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1B4D3E]/10 to-[#0D3B4C]/10">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--tea-garden)] flex items-center justify-center animate-pulse">
                        <span className="text-3xl">🗺️</span>
                    </div>
                    <p className="text-[var(--text-secondary)]">Loading Assam Map...</p>
                </div>
            </div>
        )
    }
);

export function LeafletMap(props: LeafletMapProps) {
    return <LeafletMapContent {...props} />;
}

export default LeafletMap;
