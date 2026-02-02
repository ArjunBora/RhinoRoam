'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import district data
import assamDistricts from '@/data/assam-districts.json';

interface POI {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    category: string;
    description?: string;
    image?: string;
}

interface LeafletMapContentProps {
    className?: string;
    pois?: POI[];
    onPOIClick?: (poi: POI) => void;
    selectedPOI?: string | null;
}

// Category colors for POI markers
const categoryColors: Record<string, string> = {
    'TEMPLE': '#B71C1C',
    'WILDLIFE': '#1B4D3E',
    'MONUMENT': '#C9A227',
    'RELIGIOUS': '#6A1B9A',
    'VIEWPOINT': '#0D3B4C',
    'ARTISAN': '#E65100',
    'NATURE': '#2E7D32',
    default: '#1B4D3E'
};

// Create custom marker icon
function createMarkerIcon(category: string, isSelected: boolean = false) {
    const color = categoryColors[category] || categoryColors.default;
    const size = isSelected ? 42 : 32;

    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-container" style="position: relative; width: ${size}px; height: ${size}px;">
                ${isSelected ? `
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: ${size * 2}px;
                        height: ${size * 2}px;
                        background: ${color};
                        border-radius: 50%;
                        opacity: 0.3;
                        animation: ripple 2s infinite;
                    "></div>
                ` : ''}
                <div style="
                    position: relative;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border: 3px solid white;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                    ${isSelected ? 'border-color: #FFD700; box-shadow: 0 0 20px ' + color + ';' : ''}
                ">
                    <span style="
                        transform: rotate(45deg);
                        font-size: ${isSelected ? '20px' : '16px'};
                        color: white;
                    ">📍</span>
                </div>
            </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size]
    });
}

export default function LeafletMapContent({
    className = '',
    pois = [],
    onPOIClick,
    selectedPOI
}: LeafletMapContentProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Initialize map centered on Assam
        const map = L.map(mapRef.current, {
            center: [26.2, 92.9],
            zoom: 7,
            minZoom: 6,
            maxZoom: 15,
            maxBounds: [
                [24.0, 89.0], // Southwest
                [28.5, 96.5]  // Northeast
            ],
            maxBoundsViscosity: 1.0
        });

        mapInstanceRef.current = map;

        // Add OpenStreetMap tiles (free, no API key needed)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | RhinoRoam',
            maxZoom: 19,
        }).addTo(map);

        // Style for district boundaries
        const districtStyle = {
            color: '#1B4D3E',
            weight: 2,
            opacity: 0.8,
            fillColor: '#1B4D3E',
            fillOpacity: 0.1
        };

        const highlightStyle = {
            color: '#C9A227',
            weight: 3,
            opacity: 1,
            fillColor: '#C9A227',
            fillOpacity: 0.3
        };

        // Add district GeoJSON layer
        const districtsLayer = L.geoJSON(assamDistricts as GeoJSON.FeatureCollection, {
            style: districtStyle,
            onEachFeature: (feature, layer) => {
                const props = feature.properties;

                // Popup content
                layer.bindPopup(`
                    <div style="min-width: 180px; font-family: system-ui;">
                        <h3 style="margin: 0 0 8px 0; color: #1B4D3E; font-size: 16px; font-weight: 600;">
                            ${props?.district || 'Unknown District'}
                        </h3>
                        <p style="margin: 4px 0; color: #666; font-size: 13px;">
                            <strong>HQ:</strong> ${props?.headquarters || 'N/A'}
                        </p>
                        <p style="margin: 4px 0; color: #666; font-size: 13px;">
                            <strong>Population:</strong> ${props?.population?.toLocaleString() || 'N/A'}
                        </p>
                    </div>
                `);

                // Hover effects
                layer.on({
                    mouseover: (e) => {
                        const target = e.target;
                        target.setStyle(highlightStyle);
                        target.bringToFront();
                    },
                    mouseout: (e) => {
                        districtsLayer.resetStyle(e.target);
                    },
                    click: (e) => {
                        map.fitBounds(e.target.getBounds(), { padding: [50, 50] });
                    }
                });
            }
        }).addTo(map);

        // Add Assam state outline for emphasis
        const assamBounds: L.LatLngBoundsLiteral = [[24.0, 89.6], [28.0, 96.0]];
        L.rectangle(assamBounds, {
            color: '#0D3B4C',
            weight: 3,
            fill: false,
            dashArray: '10, 5'
        }).addTo(map);

        // Add title overlay using class extension
        const TitleControl = L.Control.extend({
            options: { position: 'topleft' as L.ControlPosition },
            onAdd: function () {
                const div = L.DomUtil.create('div', 'map-title');
                div.innerHTML = `
                    <div style="
                        background: white;
                        padding: 12px 16px;
                        border-radius: 12px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        font-family: system-ui;
                    ">
                        <h2 style="margin: 0; color: #1B4D3E; font-size: 18px; font-weight: 700;">
                            🦏 Explore Assam
                        </h2>
                        <p style="margin: 4px 0 0 0; color: #666; font-size: 12px;">
                            35 Districts • Click to explore
                        </p>
                    </div>
                `;
                return div;
            }
        });
        new TitleControl().addTo(map);

        // Legend using class extension
        const LegendControl = L.Control.extend({
            options: { position: 'bottomright' as L.ControlPosition },
            onAdd: function () {
                const div = L.DomUtil.create('div', 'map-legend');
                div.innerHTML = `
                    <div style="
                        background: white;
                        padding: 12px;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                        font-family: system-ui;
                        font-size: 11px;
                    ">
                        <div style="font-weight: 600; margin-bottom: 8px; color: #333;">Legend</div>
                        <div style="display: flex; align-items: center; gap: 6px; margin: 4px 0;">
                            <div style="width: 16px; height: 3px; background: #1B4D3E; border-radius: 2px;"></div>
                            <span>District Border</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; margin: 4px 0;">
                            <div style="width: 12px; height: 12px; background: #1B4D3E; border-radius: 50%; opacity: 0.3;"></div>
                            <span>District Area</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; margin: 4px 0;">
                            <div style="width: 12px; height: 12px; background: #B71C1C; border-radius: 50%;"></div>
                            <span>Point of Interest</span>
                        </div>
                    </div>
                `;
                return div;
            }
        });
        new LegendControl().addTo(map);

        // Fix gray tiles by calling invalidateSize after layout settles
        setTimeout(() => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.invalidateSize();
            }
        }, 250);

        // Cleanup
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Handle POI markers
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add POI markers
        pois.forEach(poi => {
            const isSelected = selectedPOI === poi.id;
            const marker = L.marker([poi.latitude, poi.longitude], {
                icon: createMarkerIcon(poi.category, isSelected),
                zIndexOffset: isSelected ? 1000 : 0
            });

            const popupContent = `
                <div class="custom-popup" style="min-width: 240px; font-family: 'Nunito', sans-serif;">
                    ${poi.image ? `
                        <div style="width: calc(100% + 40px); height: 140px; margin: -20px -20px 15px -20px; position: relative; overflow: hidden; border-radius: 12px 12px 0 0;">
                            <img src="${poi.image}" style="width: 100%; h-full; object-fit: cover;" />
                            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);"></div>
                        </div>
                    ` : ''}
                    <div style="padding: 0 5px 10px 5px;">
                        <span style="
                            display: inline-block;
                            background: ${categoryColors[poi.category] || categoryColors.default};
                            color: white;
                            padding: 3px 10px;
                            border-radius: 20px;
                            font-size: 10px;
                            font-weight: 700;
                            text-transform: uppercase;
                            margin-bottom: 8px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        ">${poi.category}</span>
                        <h3 style="margin: 0 0 5px 0; color: #1B4D3E; font-size: 17px; font-weight: 700;">
                            ${poi.name}
                        </h3>
                        ${poi.description ? `<p style="margin: 5px 0 15px 0; color: #555; font-size: 13px; line-height: 1.5;">${poi.description}</p>` : ''}
                        <div style="display: flex; gap: 8px;">
                             <button onclick="window.location.href='/experiences/${poi.id}'" style="
                                flex: 1;
                                background: ${categoryColors[poi.category] || categoryColors.default};
                                color: white;
                                border: none;
                                padding: 8px;
                                border-radius: 8px;
                                font-size: 12px;
                                font-weight: 600;
                                cursor: pointer;
                             ">Explore Now</button>
                        </div>
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'modern-leaflet-popup'
            });

            marker.on('click', () => {
                if (onPOIClick) {
                    onPOIClick(poi);
                }
            });

            marker.addTo(map);
            markersRef.current.push(marker);

            if (isSelected) {
                // Delay slightly to ensure marker is on map
                setTimeout(() => {
                    if (mapInstanceRef.current) {
                        mapInstanceRef.current.invalidateSize();
                        marker.openPopup();
                        mapInstanceRef.current.panTo([poi.latitude, poi.longitude]);
                    }
                }, 100);
            }
        });
    }, [pois, selectedPOI, onPOIClick]);

    return (
        <div className={`relative w-full h-full ${className}`} style={{ height: '100%' }}>
            <div
                ref={mapRef}
                className="w-full h-full"
                style={{ height: '100%' }}
            />
            <style jsx global>{`
                .custom-marker {
                    background: transparent !important;
                    border: none !important;
                }
                @keyframes pulse {
                    0%, 100% { transform: rotate(-45deg) scale(1); }
                    50% { transform: rotate(-45deg) scale(1.1); }
                }
                @keyframes ripple {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }
                .leaflet-popup-tip {
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}
