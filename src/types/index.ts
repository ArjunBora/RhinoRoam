// Common Types for GUenARK Platform

export interface Destination {
    id: string;
    name: string;
    slug: string;
    description: string;
    latitude: number;
    longitude: number;
    region: string;
    state: string;
    country: string;
    heroImage?: string;
    images: string[];
    howToReach?: HowToReach;
    bestTime?: BestTime;
    highlights: string[];
}

export interface HowToReach {
    airport?: TransportOption;
    railway?: TransportOption;
    bus?: TransportOption;
    selfDrive?: TransportOption;
}

export interface TransportOption {
    name: string;
    distance: string;
    duration: string;
    cost?: string;
    notes?: string;
}

export interface BestTime {
    peak: string[];
    offPeak: string[];
    avoid: string[];
}

export interface POI {
    id: string;
    destinationId: string;
    name: string;
    slug: string;
    category: POICategory;
    description: string;
    culturalSignificance?: string;
    latitude: number;
    longitude: number;
    images: string[];
    audioGuideUrl?: string;
    videoUrl?: string;
    timings?: Record<string, { open: string; close: string }>;
    entryFee?: EntryFee;
    dressCodes: string[];
    restrictions: string[];
    safetyTips: string[];
    culturalNorms: string[];
    healthAdvisories: string[];
    environmentalRules: string[];
    averageVisitTime?: number;
    isVerified: boolean;
}

export type POICategory =
    | "TEMPLE"
    | "FORT"
    | "PALACE"
    | "MUSEUM"
    | "MONUMENT"
    | "NATURE"
    | "MARKET"
    | "CULTURAL_CENTER"
    | "ARCHAEOLOGICAL"
    | "RELIGIOUS"
    | "VIEWPOINT"
    | "WATER_BODY"
    | "GARDEN"
    | "OTHER";

export interface EntryFee {
    indian: number;
    foreigner: number;
    child?: number;
    camera?: number;
}

export interface HeritageTrail {
    id: string;
    destinationId: string;
    name: string;
    slug: string;
    description: string;
    theme: string;
    durationMinutes: number;
    distanceKm: number;
    difficulty: "EASY" | "MODERATE" | "CHALLENGING";
    routeGeoJson?: GeoJSON.LineString;
    images: string[];
    stops: TrailStop[];
}

export interface TrailStop {
    id: string;
    trailId: string;
    poiId: string;
    order: number;
    notes?: string;
    durationMin?: number;
    poi?: POI;
}

export interface Stay {
    id: string;
    destinationId: string;
    name: string;
    slug: string;
    type: StayType;
    description: string;
    latitude: number;
    longitude: number;
    priceMin: number;
    priceMax: number;
    currency: string;
    amenities: string[];
    ecoPractices: string[];
    images: string[];
    bookingUrl?: string;
    contactPhone?: string;
    contactEmail?: string;
    contactWhatsapp?: string;
    rating?: number;
    reviewCount: number;
    isHomestay: boolean;
    isVerified: boolean;
}

export type StayType =
    | "HOTEL"
    | "HOMESTAY"
    | "HOSTEL"
    | "RESORT"
    | "GUESTHOUSE"
    | "DHARAMSHALA"
    | "CAMPING";

export interface Artisan {
    id: string;
    destinationId: string;
    name: string;
    craftType: string;
    story: string;
    latitude: number;
    longitude: number;
    images: string[];
    products: string[];
    workshopAvailable: boolean;
    workshopDetails?: string;
    contactPhone?: string;
    contactWhatsapp?: string;
    contactEmail?: string;
    isVerified: boolean;
}

export interface LocalGuide {
    id: string;
    userId?: string;
    destinationId: string;
    name: string;
    bio: string;
    languages: string[];
    expertise: string[];
    pricePerDay: number;
    currency: string;
    availableDays: string[];
    contactPhone: string;
    contactWhatsapp?: string;
    avatarUrl?: string;
    images: string[];
    rating?: number;
    reviewCount: number;
    isVerified: boolean;
}

export interface CBTVillage {
    id: string;
    destinationId: string;
    name: string;
    slug: string;
    story: string;
    culture: string;
    festivals: Festival[];
    latitude: number;
    longitude: number;
    images: string[];
    homestays: VillageHomestay[];
    foodOptions: FoodOption[];
    workshops: Workshop[];
    tours: VillageTour[];
    contactEmail?: string;
    contactWhatsapp?: string;
    contactPhone?: string;
}

export interface Festival {
    name: string;
    month: string;
    description: string;
}

export interface VillageHomestay {
    name: string;
    capacity: number;
    pricePerNight: number;
    amenities: string[];
    contact: string;
}

export interface FoodOption {
    name: string;
    type: "veg" | "non-veg";
    price: number;
    description: string;
}

export interface Workshop {
    name: string;
    craft: string;
    duration: number;
    price: number;
    description: string;
}

export interface VillageTour {
    name: string;
    description: string;
    duration: number;
    price: number;
}

export interface Seasonality {
    id: string;
    destinationId: string;
    month: number;
    weather: string;
    temperature?: { min: number; max: number; unit: string };
    rainfall?: string;
    crowdLevel: "LOW" | "MODERATE" | "HIGH" | "PEAK";
    priceTrend: "LOW" | "MODERATE" | "HIGH" | "PEAK";
    festivals: string[];
    events: string[];
    recommendations: string;
    whatToPack: string[];
}

export interface Article {
    id: string;
    authorId: string;
    destinationId?: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: string;
    tags: string[];
    travelDate?: Date;
    season?: string;
    budgetLevel?: "BUDGET" | "MID_RANGE" | "PREMIUM" | "LUXURY";
    status: "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "REJECTED" | "ARCHIVED";
    viewCount: number;
    likeCount: number;
    isFeatured: boolean;
    publishedAt?: Date;
    createdAt: Date;
    author?: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    destination?: Destination;
}

export interface Itinerary {
    id: string;
    userId: string;
    destinationId: string;
    title: string;
    description?: string;
    durationDays: number;
    dayPlans: DayPlan[];
    budgetLevel?: "BUDGET" | "MID_RANGE" | "PREMIUM" | "LUXURY";
    estimatedCost?: number;
    isPublic: boolean;
    likeCount: number;
    destination?: Destination;
}

export interface DayPlan {
    day: number;
    activities: Activity[];
    notes?: string;
}

export interface Activity {
    time: string;
    type: "poi" | "transport" | "food" | "rest" | "custom";
    title: string;
    description?: string;
    poiId?: string;
    duration?: number;
    cost?: number;
}

// Map Types
export interface MapBounds {
    north: number;
    south: number;
    east: number;
    west: number;
}

export interface MapMarker {
    id: string;
    latitude: number;
    longitude: number;
    type: "poi" | "stay" | "artisan" | "guide" | "village";
    category?: string;
    name: string;
    image?: string;
}

// Chat Types
export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    actions?: ChatAction[];
}

export interface ChatAction {
    type: "view_poi" | "view_destination" | "view_trail" | "plan_trip";
    label: string;
    data: Record<string, string>;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
