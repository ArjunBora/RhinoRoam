"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { cn, POI_CATEGORY_ICONS } from "@/lib/utils";
import type { MapMarker, POI } from "@/types";

interface InteractiveMapProps {
    className?: string;
    initialCenter?: [number, number];
    initialZoom?: number;
    markers?: MapMarker[];
    onMarkerClick?: (marker: MapMarker) => void;
    showControls?: boolean;
    showGeolocate?: boolean;
    interactive?: boolean;
}

export function InteractiveMap({
    className,
    initialCenter = [91.7, 26.1], // Default to Guwahati, Assam
    initialZoom = 7,
    markers = [],
    onMarkerClick,
    showControls = true,
    showGeolocate = true,
    interactive = true,
}: InteractiveMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token) {
            console.warn("Mapbox token not found. Using placeholder map.");
            return;
        }

        mapboxgl.accessToken = token;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/outdoors-v12",
            center: initialCenter,
            zoom: initialZoom,
            interactive,
            attributionControl: false,
            maxBounds: [[89.5, 24.0], [96.5, 28.5]], // Limit to Assam region
        });

        if (showControls) {
            map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
            map.current.addControl(
                new mapboxgl.AttributionControl({ compact: true }),
                "bottom-right"
            );
        }

        if (showGeolocate) {
            map.current.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: { enableHighAccuracy: true },
                    trackUserLocation: true,
                    showUserHeading: true,
                }),
                "top-right"
            );
        }

        map.current.on("load", () => {
            setIsLoaded(true);
        });

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, [initialCenter, initialZoom, interactive, showControls, showGeolocate]);

    // Add markers
    useEffect(() => {
        if (!map.current || !isLoaded) return;

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        // Add new markers
        markers.forEach((markerData) => {
            const el = document.createElement("div");
            el.className = "map-marker";
            el.innerHTML = POI_CATEGORY_ICONS[markerData.category || "OTHER"] || "📍";

            const marker = new mapboxgl.Marker(el)
                .setLngLat([markerData.longitude, markerData.latitude])
                .addTo(map.current!);

            if (onMarkerClick) {
                el.addEventListener("click", () => onMarkerClick(markerData));
            }

            markersRef.current.push(marker);
        });
    }, [markers, isLoaded, onMarkerClick]);

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!mapboxToken) {
        return (
            <div
                className={cn(
                    "relative bg-[var(--bg-secondary)] rounded-2xl overflow-hidden flex items-center justify-center",
                    className
                )}
            >
                <div className="text-center p-8">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 className="text-xl font-semibold mb-2">Map Preview</h3>
                    <p className="text-[var(--text-secondary)] mb-4">
                        Add your Mapbox token to enable the interactive map
                    </p>
                    <code className="text-sm bg-[var(--neutral-800)] text-[var(--neutral-300)] px-3 py-1 rounded">
                        NEXT_PUBLIC_MAPBOX_TOKEN
                    </code>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("relative rounded-2xl overflow-hidden", className)}>
            <div ref={mapContainer} className="absolute inset-0" />
            {!isLoaded && (
                <div className="absolute inset-0 bg-[var(--bg-secondary)] flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[var(--border-light)]" />
                        <div className="h-4 w-32 rounded bg-[var(--border-light)]" />
                    </div>
                </div>
            )}
        </div>
    );
}

interface MapPreviewProps {
    latitude: number;
    longitude: number;
    name: string;
    className?: string;
}

export function MapPreview({ latitude, longitude, name, className }: MapPreviewProps) {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!mapboxToken) {
        return (
            <div
                className={cn(
                    "bg-[var(--bg-secondary)] rounded-xl flex items-center justify-center",
                    className
                )}
            >
                <span className="text-4xl">🗺️</span>
            </div>
        );
    }

    const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/pin-l+D4A574(${longitude},${latitude})/${longitude},${latitude},14/400x300@2x?access_token=${mapboxToken}`;

    return (
        <div className={cn("relative rounded-xl overflow-hidden group", className)}>
            <img
                src={staticMapUrl}
                alt={`Map showing ${name}`}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-lg font-medium text-sm">
                    View on Map
                </span>
            </div>
        </div>
    );
}

interface POIMapCardProps {
    poi: POI;
    onClose?: () => void;
}

export function POIMapCard({ poi, onClose }: POIMapCardProps) {
    return (
        <div className="w-72 bg-[var(--bg-card)] rounded-xl overflow-hidden shadow-xl animate-scale-in">
            {poi.images[0] && (
                <div className="relative h-32">
                    <img
                        src={poi.images[0]}
                        alt={poi.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-white font-medium text-sm">
                        {POI_CATEGORY_ICONS[poi.category]} {poi.category.replace("_", " ")}
                    </span>
                </div>
            )}
            <div className="p-4">
                <h3 className="font-heading font-semibold text-lg mb-1">{poi.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
                    {poi.description}
                </p>
                <div className="flex items-center justify-between">
                    {poi.averageVisitTime && (
                        <span className="text-xs text-[var(--text-muted)]">
                            ⏱️ {poi.averageVisitTime} min
                        </span>
                    )}
                    <a
                        href={`/pois/${poi.slug}`}
                        className="text-sm font-medium text-[var(--heritage-gold)] hover:underline"
                    >
                        View Details →
                    </a>
                </div>
            </div>
        </div>
    );
}
