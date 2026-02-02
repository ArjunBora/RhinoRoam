'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    MapPin, Calendar, Users, ArrowRight, ArrowLeft, Check,
    ChevronLeft, Sparkles, Clock, Sun, Leaf, Bird, Waves,
    Tent, Mountain, Camera, Heart, Send, Loader2, Coffee,
    Zap, Battery, Compass, Globe, Utensils, Shield, Star,
    Home, Moon, Sunrise, ChevronUp, ChevronDown, Target
} from 'lucide-react';

/* ============================================
   PSYCHOLOGICAL TRIP PLANNER
   "How do you want to FEEL?" - Not just "Where?"
   ============================================ */

// ==========================================
// TYPES: Enhanced Psychological Dimensions
// ==========================================
interface TripPreferences {
    // Core Logistics
    duration: number;
    travelers: number;
    travelMonth: string;

    // Psychological Dimensions (The 11 Parameters)
    vibe: 'relaxing' | 'adventurous' | 'balanced' | null;
    pace: 'slow' | 'moderate' | 'fast' | null;
    planning: 'spontaneous' | 'lightly-planned' | 'structured' | null;
    environment: 'nature' | 'culture' | 'mixed' | null;

    energy: 'early-bird' | 'late-riser' | null;
    mobility: 'walking' | 'convenience' | null;
    travelDays: 'long-ok' | 'fewer-moves' | null;
    downtime: 'go-nonstop' | 'need-breaks' | null;

    social: 'solo-time' | 'group-activities' | 'mix' | null;
    localInteraction: 'meet-locals' | 'stay-private' | null;
    atmosphere: 'lively' | 'calm' | null;

    budgetStyle: 'smart-saving' | 'treat-yourself' | null;
    splurgeOn: 'experiences' | 'accommodation' | 'food' | null;

    foodImportance: 'highlight' | 'just-fuel' | null;
    foodStyle: 'street-food' | 'sit-down' | 'mix' | null;

    mustHaves: string[];
    niceToHaves: string[];

    experienceLevel: 'first-time' | 'experienced' | null;
    comfortWithUnfamiliar: 'comfortable' | 'prefer-guided' | null;

    flexibility: 'flexible' | 'fixed' | null;
    riskTolerance: 'surprises-ok' | 'need-backups' | null;

    tripOutcome: 'rested' | 'inspired' | 'stories' | 'escape' | null;

    specialRequests: string;
}

// ==========================================
// CHOICE PAIR DATA: Visual "This or That"
// ==========================================
interface ChoicePair {
    id: string;
    question: string;
    softPhrase: string;
    optionA: {
        value: string;
        label: string;
        description: string;
        image: string;
        icon: React.ReactNode;
    };
    optionB: {
        value: string;
        label: string;
        description: string;
        image: string;
        icon: React.ReactNode;
    };
    field: keyof TripPreferences;
}

const vibeChoices: ChoicePair[] = [
    {
        id: 'vibe',
        question: "What's your ideal trip vibe?",
        softPhrase: "How do you want to feel on this journey?",
        optionA: {
            value: 'relaxing',
            label: 'Slow & Soulful',
            description: 'Tea mornings, quiet sunsets, gentle rhythms',
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600',
            icon: <Coffee className="w-6 h-6" />
        },
        optionB: {
            value: 'adventurous',
            label: 'Wild & Free',
            description: 'Dawn safaris, hidden trails, heart-pounding moments',
            image: 'https://images.unsplash.com/photo-1682687220742-aba19b51f36c?w=600',
            icon: <Zap className="w-6 h-6" />
        },
        field: 'vibe'
    },
    {
        id: 'pace',
        question: "How do you like to move?",
        softPhrase: "On trips, do you like to go all out or keep space to breathe?",
        optionA: {
            value: 'slow',
            label: 'Breathe Easy',
            description: 'Fewer places, deeper connections',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
            icon: <Moon className="w-6 h-6" />
        },
        optionB: {
            value: 'fast',
            label: 'See It All',
            description: 'Pack in the highlights, maximize every day',
            image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=600',
            icon: <Zap className="w-6 h-6" />
        },
        field: 'pace'
    },
    {
        id: 'environment',
        question: "Nature or Culture?",
        softPhrase: "What landscapes call to you?",
        optionA: {
            value: 'nature',
            label: 'Into the Wild',
            description: 'Forests, rivers, wildlife encounters',
            image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600',
            icon: <Bird className="w-6 h-6" />
        },
        optionB: {
            value: 'culture',
            label: 'Living Heritage',
            description: 'Temples, festivals, local traditions',
            image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=600',
            icon: <Camera className="w-6 h-6" />
        },
        field: 'environment'
    }
];

const energyChoices: ChoicePair[] = [
    {
        id: 'energy',
        question: "Morning person or night owl?",
        softPhrase: "When does your adventure energy peak?",
        optionA: {
            value: 'early-bird',
            label: 'Dawn Explorer',
            description: 'Catch the sunrise, morning safaris, early starts',
            image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600',
            icon: <Sunrise className="w-6 h-6" />
        },
        optionB: {
            value: 'late-riser',
            label: 'Slow Mornings',
            description: 'Leisurely breakfast, late starts, evening magic',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
            icon: <Coffee className="w-6 h-6" />
        },
        field: 'energy'
    },
    {
        id: 'downtime',
        question: "Nonstop or with breaks?",
        softPhrase: "Do you need downtime to recharge, or can you go all day?",
        optionA: {
            value: 'go-nonstop',
            label: 'Keep Going!',
            description: "I'll rest when I get home",
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600',
            icon: <Battery className="w-6 h-6" />
        },
        optionB: {
            value: 'need-breaks',
            label: 'Built-in Breathers',
            description: 'A hammock hour keeps the journey sweet',
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
            icon: <Home className="w-6 h-6" />
        },
        field: 'downtime'
    }
];

const socialChoices: ChoicePair[] = [
    {
        id: 'social',
        question: "Social or Solo?",
        softPhrase: "Do you recharge with people or in solitude?",
        optionA: {
            value: 'solo-time',
            label: 'My Own Space',
            description: 'Private stays, personal moments',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600',
            icon: <Home className="w-6 h-6" />
        },
        optionB: {
            value: 'group-activities',
            label: 'Meet & Mingle',
            description: 'Group tours, community stays, shared tables',
            image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
            icon: <Users className="w-6 h-6" />
        },
        field: 'social'
    },
    {
        id: 'localInteraction',
        question: "Connect with Locals?",
        softPhrase: "Are local interactions a highlight or optional?",
        optionA: {
            value: 'meet-locals',
            label: 'Immerse Deeply',
            description: 'Homestays, village visits, local guides',
            image: 'https://images.unsplash.com/photo-1523464862212-d6631d073194?w=600',
            icon: <Globe className="w-6 h-6" />
        },
        optionB: {
            value: 'stay-private',
            label: 'Observe Quietly',
            description: 'Appreciate from a comfortable distance',
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
            icon: <Camera className="w-6 h-6" />
        },
        field: 'localInteraction'
    }
];

const budgetChoices: ChoicePair[] = [
    {
        id: 'budgetStyle',
        question: "Smart Saver or Treat Yourself?",
        softPhrase: "Do you prefer smart-saving trips or 'this is vacation, let's enjoy' trips?",
        optionA: {
            value: 'smart-saving',
            label: 'Smart Traveler',
            description: 'Best value, authentic local experiences',
            image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600',
            icon: <Target className="w-6 h-6" />
        },
        optionB: {
            value: 'treat-yourself',
            label: 'This is Vacation!',
            description: 'Premium comfort, splurge-worthy moments',
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',
            icon: <Star className="w-6 h-6" />
        },
        field: 'budgetStyle'
    }
];

const foodChoices: ChoicePair[] = [
    {
        id: 'foodImportance',
        question: "Is Food a Destination?",
        softPhrase: "Is discovering local flavors a trip highlight?",
        optionA: {
            value: 'highlight',
            label: 'Absolutely Yes!',
            description: 'Plan around meals, cooking classes, food tours',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
            icon: <Utensils className="w-6 h-6" />
        },
        optionB: {
            value: 'just-fuel',
            label: 'Just Keep Me Fed',
            description: 'Good food is nice, but not the focus',
            image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600',
            icon: <Coffee className="w-6 h-6" />
        },
        field: 'foodImportance'
    }
];

const outcomeChoices: ChoicePair[] = [
    {
        id: 'tripOutcome',
        question: "What do you want to come back with?",
        softPhrase: "The emotional anchor — what feeling should this trip leave you with?",
        optionA: {
            value: 'rested',
            label: 'Deeply Rested',
            description: 'Return recharged and renewed',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
            icon: <Moon className="w-6 h-6" />
        },
        optionB: {
            value: 'inspired',
            label: 'Wildly Inspired',
            description: 'Return with new perspectives and energy',
            image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
            icon: <Sparkles className="w-6 h-6" />
        },
        field: 'tripOutcome'
    }
];

// Assam-specific must-haves
const mustHaveOptions = [
    { id: 'rhino-safari', label: 'Rhino Safari', icon: <Bird className="w-5 h-5" /> },
    { id: 'tea-garden', label: 'Tea Garden Stay', icon: <Leaf className="w-5 h-5" /> },
    { id: 'majuli', label: 'Majuli Island', icon: <Waves className="w-5 h-5" /> },
    { id: 'brahmaputra', label: 'Brahmaputra Cruise', icon: <Waves className="w-5 h-5" /> },
    { id: 'tribal-village', label: 'Tribal Village Visit', icon: <Tent className="w-5 h-5" /> },
    { id: 'bihu-festival', label: 'Bihu Festival', icon: <Star className="w-5 h-5" /> },
    { id: 'silk-weaving', label: 'Muga Silk Experience', icon: <Heart className="w-5 h-5" /> },
    { id: 'ahom-heritage', label: 'Ahom Heritage Sites', icon: <Camera className="w-5 h-5" /> },
];

// Duration options
const durationOptions = [
    { days: 3, label: '3 Days', description: 'Weekend escape', emoji: '⚡' },
    { days: 5, label: '5 Days', description: 'Short break', emoji: '🌿' },
    { days: 7, label: '1 Week', description: 'Recommended', emoji: '✨' },
    { days: 10, label: '10 Days', description: 'Deep exploration', emoji: '🦏' },
    { days: 14, label: '2 Weeks', description: 'Ultimate journey', emoji: '🏔️' },
];

// Months with seasonal context
const months = [
    { name: 'January', season: 'peak', note: 'Perfect weather' },
    { name: 'February', season: 'peak', note: 'Ideal for safaris' },
    { name: 'March', season: 'good', note: 'Warm & clear' },
    { name: 'April', season: 'good', note: 'Bihu festival!' },
    { name: 'May', season: 'monsoon', note: 'Pre-monsoon heat' },
    { name: 'June', season: 'monsoon', note: 'Monsoon begins' },
    { name: 'July', season: 'monsoon', note: 'Heavy rains' },
    { name: 'August', season: 'monsoon', note: 'Flooding possible' },
    { name: 'September', season: 'monsoon', note: 'Rains recede' },
    { name: 'October', season: 'good', note: 'Nature refreshed' },
    { name: 'November', season: 'peak', note: 'Best time!' },
    { name: 'December', season: 'peak', note: 'Cool & festive' },
];

// Sample generated itinerary (enhanced with vibe matching)
const sampleItinerary = {
    title: 'Your Soul Journey Through Assam',
    duration: '7 Days / 6 Nights',
    vibeMatch: 92,
    highlights: ['Dawn Safari at Kaziranga', 'Tea Garden Sunrise', 'Majuli Satra Experience', 'Brahmaputra Sunset'],
    energyCurve: [40, 70, 85, 60, 45, 55, 30], // Daily energy levels
    days: [
        {
            day: 1,
            title: 'Arrival & River Magic',
            location: 'Guwahati',
            vibe: 'settling-in',
            energyLevel: 40,
            activities: [
                'Arrive at LGBI Airport — welcome with Assamese Gamusa',
                'Check-in at riverside boutique hotel',
                'Evening sunset cruise on Brahmaputra',
                'Welcome dinner: authentic Assamese thali'
            ],
            accommodation: 'Riverside Boutique Hotel',
            meals: 'Dinner'
        },
        {
            day: 2,
            title: 'Into the Wild',
            location: 'Kaziranga',
            vibe: 'adventure',
            energyLevel: 70,
            activities: [
                'Scenic drive to Kaziranga (5 hours)',
                'Check-in at eco-lodge in forest edge',
                'Afternoon Jeep Safari — Central Range',
                'Evening: lantern-lit dinner with wildlife sounds'
            ],
            accommodation: 'Kaziranga Eco Lodge',
            meals: 'Breakfast, Lunch, Dinner'
        },
        {
            day: 3,
            title: 'Dawn with the Rhinos',
            location: 'Kaziranga',
            vibe: 'peak-adventure',
            energyLevel: 85,
            activities: [
                '5:30 AM Elephant Safari — closest to wildlife',
                'Post-safari breakfast with forest views',
                'Bird watching session',
                'Jeep Safari — Western Range',
                'Visit local Mising village'
            ],
            accommodation: 'Kaziranga Eco Lodge',
            meals: 'Breakfast, Lunch, Dinner'
        },
        {
            day: 4,
            title: 'Island of Spirituality',
            location: 'Majuli',
            vibe: 'cultural-immersion',
            energyLevel: 60,
            activities: [
                'Drive to Jorhat ferry point',
                'Ferry ride to Majuli — world\'s largest river island',
                'Visit Kamalabari & Auniati Satras',
                'Traditional mask-making workshop',
                'Evening prayers with monks'
            ],
            accommodation: 'Satra Guesthouse',
            meals: 'Breakfast, Lunch, Dinner'
        },
        {
            day: 5,
            title: 'Slow Island Life',
            location: 'Majuli / Dibrugarh',
            vibe: 'peaceful',
            energyLevel: 45,
            activities: [
                'Sunrise cycling through village paths',
                'Visit Mising tribal village — learn weaving',
                'Leisurely ferry back',
                'Drive to heritage tea bungalow',
                'Heritage high tea experience'
            ],
            accommodation: 'Heritage Tea Bungalow',
            meals: 'Breakfast, Lunch, High Tea, Dinner'
        },
        {
            day: 6,
            title: 'The Golden Leaf',
            location: 'Dibrugarh',
            vibe: 'luxurious-pace',
            energyLevel: 55,
            activities: [
                'Morning tea plucking experience',
                'Factory tour: from leaf to cup',
                'Professional tea tasting session',
                'Afternoon at leisure — spa or gardens',
                'Gala dinner at the bungalow'
            ],
            accommodation: 'Heritage Tea Bungalow',
            meals: 'Breakfast, Lunch, Dinner'
        },
        {
            day: 7,
            title: 'Farewell to Assam',
            location: 'Dibrugarh / Departure',
            vibe: 'reflection',
            energyLevel: 30,
            activities: [
                'Leisurely morning — pack memories',
                'Transfer to Dibrugarh airport',
                'Carry home: Muga silk, Assam tea, and stories'
            ],
            accommodation: '-',
            meals: 'Breakfast'
        }
    ],
    budgetBreakdown: {
        accommodation: 35,
        experiences: 30,
        food: 20,
        transport: 15
    },
    estimatedCost: {
        budget: 35000,
        midRange: 55000,
        luxury: 95000
    }
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function TripPlannerPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showItinerary, setShowItinerary] = useState(false);
    const [animationClass, setAnimationClass] = useState('animate-slide-up');

    const [preferences, setPreferences] = useState<TripPreferences>({
        duration: 7,
        travelers: 2,
        travelMonth: 'November',
        vibe: null,
        pace: null,
        planning: null,
        environment: null,
        energy: null,
        mobility: null,
        travelDays: null,
        downtime: null,
        social: null,
        localInteraction: null,
        atmosphere: null,
        budgetStyle: null,
        splurgeOn: null,
        foodImportance: null,
        foodStyle: null,
        mustHaves: [],
        niceToHaves: [],
        experienceLevel: null,
        comfortWithUnfamiliar: null,
        flexibility: null,
        riskTolerance: null,
        tripOutcome: null,
        specialRequests: ''
    });

    // All steps configuration
    const allSteps = [
        { id: 'intro', type: 'intro', title: 'Welcome' },
        { id: 'vibe', type: 'choice-pair', title: 'Your Vibe', choices: vibeChoices[0] },
        { id: 'pace', type: 'choice-pair', title: 'Your Pace', choices: vibeChoices[1] },
        { id: 'environment', type: 'choice-pair', title: 'Your Scene', choices: vibeChoices[2] },
        { id: 'energy', type: 'choice-pair', title: 'Your Energy', choices: energyChoices[0] },
        { id: 'downtime', type: 'choice-pair', title: 'Your Rhythm', choices: energyChoices[1] },
        { id: 'social', type: 'choice-pair', title: 'Your Style', choices: socialChoices[0] },
        { id: 'locals', type: 'choice-pair', title: 'Connections', choices: socialChoices[1] },
        { id: 'budget', type: 'choice-pair', title: 'Your Approach', choices: budgetChoices[0] },
        { id: 'food', type: 'choice-pair', title: 'Culinary', choices: foodChoices[0] },
        { id: 'outcome', type: 'choice-pair', title: 'The Feeling', choices: outcomeChoices[0] },
        { id: 'must-haves', type: 'must-haves', title: 'Non-Negotiables' },
        { id: 'logistics', type: 'logistics', title: 'The Details' },
    ];

    const goToStep = (direction: 'next' | 'prev') => {
        setAnimationClass('opacity-0');
        setTimeout(() => {
            if (direction === 'next') {
                setCurrentStep(prev => Math.min(allSteps.length - 1, prev + 1));
            } else {
                setCurrentStep(prev => Math.max(0, prev - 1));
            }
            setAnimationClass('animate-slide-up');
        }, 150);
    };

    const handleChoicePairSelect = (field: keyof TripPreferences, value: string) => {
        setPreferences(prev => ({ ...prev, [field]: value }));
        // Auto-advance after selection
        setTimeout(() => goToStep('next'), 400);
    };

    const toggleMustHave = (id: string) => {
        setPreferences(prev => ({
            ...prev,
            mustHaves: prev.mustHaves.includes(id)
                ? prev.mustHaves.filter(m => m !== id)
                : [...prev.mustHaves, id]
        }));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsGenerating(false);
        setShowItinerary(true);
    };

    // Calculate progress
    const progressPercent = Math.round((currentStep / (allSteps.length - 1)) * 100);

    // ==========================================
    // RENDER: Choice Pair Card
    // ==========================================
    const renderChoicePair = (choice: ChoicePair) => {
        const selectedValue = preferences[choice.field as keyof TripPreferences];

        return (
            <div className={`${animationClass} transition-all duration-300`}>
                <div className="text-center mb-8">
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--muga-gold)' }}>
                        {choice.softPhrase}
                    </p>
                    <h2
                        className="text-2xl md:text-3xl font-bold"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {choice.question}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {[choice.optionA, choice.optionB].map((option, idx) => {
                        const isSelected = selectedValue === option.value;
                        return (
                            <button
                                key={option.value}
                                onClick={() => handleChoicePairSelect(choice.field, option.value)}
                                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer ${isSelected ? 'ring-4 ring-[var(--muga-gold)] shadow-2xl scale-[1.02]' : 'hover:shadow-xl'
                                    }`}
                                style={{ aspectRatio: '4/3' }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={option.image}
                                        alt={option.label}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Enhanced gradient overlay for better text visibility */}
                                    <div
                                        className={`absolute inset-0 transition-all duration-500 ${isSelected
                                            ? 'bg-gradient-to-t from-[var(--tea-deep)] via-[var(--tea-deep)]/60 to-[var(--tea-deep)]/10'
                                            : 'bg-gradient-to-t from-black/95 via-black/60 to-black/20 group-hover:from-black/90'
                                            }`}
                                    />
                                </div>

                                {/* Content with enhanced visibility */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                    {/* Subtle backdrop for text area */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)'
                                        }}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div
                                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isSelected ? 'bg-[var(--muga-gold)]' : 'bg-white/30 backdrop-blur-md group-hover:bg-white/40'
                                                    }`}
                                            >
                                                {option.icon}
                                            </div>
                                            {isSelected && (
                                                <div className="w-8 h-8 rounded-full bg-[var(--muga-gold)] flex items-center justify-center animate-scale-in shadow-lg">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                        <h3
                                            className="text-2xl font-bold mb-1"
                                            style={{
                                                color: '#FFFFFF',
                                                textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)'
                                            }}
                                        >
                                            {option.label}
                                        </h3>
                                        <p
                                            className="text-white text-sm font-medium"
                                            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
                                        >
                                            {option.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                    💡 No pressure — you can always change this later
                </p>
            </div>
        );
    };

    // ==========================================
    // RENDER: Intro Step
    // ==========================================
    const renderIntro = () => (
        <div className={`${animationClass} relative`}>
            {/* Vibrant Background with Animated Orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Main gradient background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(27, 77, 46, 0.08) 0%, rgba(74, 155, 179, 0.12) 50%, rgba(201, 162, 39, 0.1) 100%)'
                    }}
                />
                {/* Animated floating orbs */}
                <div
                    className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl animate-pulse"
                    style={{ background: 'radial-gradient(circle, rgba(201, 162, 39, 0.3) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse"
                    style={{ background: 'radial-gradient(circle, rgba(74, 155, 179, 0.25) 0%, transparent 70%)', animationDelay: '1s' }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse"
                    style={{ background: 'radial-gradient(circle, rgba(27, 77, 46, 0.2) 0%, transparent 70%)', animationDelay: '2s' }}
                />
            </div>

            {/* Content Layout: Logo on Left, Text on Right */}
            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-5 gap-8 items-center mb-12">
                    {/* Floating Logo - Open, No Box */}
                    <div className="md:col-span-2 flex justify-center md:justify-end">
                        <div className="relative">
                            {/* Glow effect behind logo */}
                            <div
                                className="absolute inset-0 blur-2xl opacity-50 scale-110"
                                style={{ background: 'radial-gradient(circle, rgba(74, 155, 179, 0.5) 0%, transparent 70%)' }}
                            />
                            <Image
                                src="/plan.png"
                                alt="RhinoRoam Trip Planner"
                                width={200}
                                height={200}
                                className="relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Hero Text */}
                    <div className="md:col-span-3 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(201, 162, 39, 0.15)' }}>
                            <Sparkles className="w-4 h-4" style={{ color: 'var(--muga-gold)' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--muga-gold)' }}>AI-Powered Trip Design</span>
                        </div>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Let's Design Your{' '}
                            <span
                                className="relative inline-block"
                                style={{
                                    background: 'linear-gradient(135deg, var(--tea-deep) 0%, var(--brahma-blue) 50%, var(--muga-gold) 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                Dream Journey
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl mb-6" style={{ color: 'var(--text-secondary)' }}>
                            Forget the usual forms. We'll ask you how you want to <strong style={{ color: 'var(--tea-deep)' }}>feel</strong> — and craft the perfect Assam experience around that.
                        </p>
                    </div>
                </div>

                {/* Feature Cards with Colorful Accents */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {/* Card 1: Feel First */}
                    <div
                        className="relative p-6 rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: 'var(--gradient-tea)' }}
                        />
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                            style={{ background: 'var(--gradient-tea)' }}
                        >
                            <Heart className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2">Feel First</h4>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            We ask about vibes, energy, and emotions — not just destinations
                        </p>
                    </div>

                    {/* Card 2: AI Magic */}
                    <div
                        className="relative p-6 rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: 'var(--gradient-muga)' }}
                        />
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                            style={{ background: 'var(--gradient-muga)' }}
                        >
                            <Sparkles className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2">AI Magic</h4>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            We match your energy to perfect Assam spots you'd never find alone
                        </p>
                    </div>

                    {/* Card 3: No Burnout */}
                    <div
                        className="relative p-6 rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: 'var(--gradient-river)' }}
                        />
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                            style={{ background: 'var(--gradient-river)' }}
                        >
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2">No Burnout</h4>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            We balance adventure with rest so you come back refreshed
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <button
                        onClick={() => goToStep('next')}
                        className="group relative inline-flex items-center gap-3 text-lg px-12 py-5 rounded-2xl font-semibold text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, var(--tea-deep) 0%, var(--tea-garden) 100%)'
                        }}
                    >
                        <span>Let's Begin</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        {/* Sparkle effect */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping" style={{ background: 'var(--muga-gold)' }} />
                    </button>

                    <p className="mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                        ⏱️ Takes about 3 minutes • 💯 100% flexible • 🦏 Designed for Assam
                    </p>
                </div>
            </div>
        </div>
    );

    // ==========================================
    // RENDER: Must-Haves Step
    // ==========================================
    const renderMustHaves = () => (
        <div className={`${animationClass} max-w-3xl mx-auto`}>
            <div className="text-center mb-8">
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--muga-gold)' }}>
                    "If you came back and didn't do this, would you regret it?"
                </p>
                <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    Your Non-Negotiables
                </h2>
                <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
                    Pick 1-3 things that MUST happen on this trip
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mustHaveOptions.map((option) => {
                    const isSelected = preferences.mustHaves.includes(option.id);
                    return (
                        <button
                            key={option.id}
                            onClick={() => toggleMustHave(option.id)}
                            className={`p-4 rounded-2xl text-center transition-all ${isSelected ? 'ring-2 ring-[var(--muga-gold)] shadow-lg' : ''
                                }`}
                            style={{
                                background: isSelected ? 'rgba(201, 162, 39, 0.1)' : 'var(--bg-card)',
                                border: '1px solid var(--border-light)'
                            }}
                        >
                            <div
                                className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 transition-all ${isSelected ? 'text-white' : ''
                                    }`}
                                style={{
                                    background: isSelected ? 'var(--gradient-muga)' : 'var(--bg-secondary)',
                                    color: isSelected ? 'white' : 'var(--tea-garden)'
                                }}
                            >
                                {option.icon}
                            </div>
                            <span className="text-sm font-medium">{option.label}</span>
                            {isSelected && (
                                <div className="mt-2">
                                    <Check className="w-4 h-4 mx-auto" style={{ color: 'var(--muga-gold)' }} />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                {preferences.mustHaves.length === 0 ? 'Select at least one' : `${preferences.mustHaves.length} selected — perfect!`}
            </p>
        </div>
    );

    // ==========================================
    // RENDER: Logistics Step
    // ==========================================
    const renderLogistics = () => (
        <div className={`${animationClass} max-w-3xl mx-auto`}>
            <div className="text-center mb-8">
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--muga-gold)' }}>
                    The practical bits (we'll be quick!)
                </p>
                <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    Time & Travel Party
                </h2>
            </div>

            <div className="space-y-8">
                {/* Duration */}
                <div>
                    <label className="block font-medium mb-4">How many days can you escape?</label>
                    <div className="flex flex-wrap gap-3">
                        {durationOptions.map((option) => (
                            <button
                                key={option.days}
                                onClick={() => setPreferences(prev => ({ ...prev, duration: option.days }))}
                                className={`px-5 py-3 rounded-xl text-center transition-all ${preferences.duration === option.days ? 'text-white shadow-lg' : ''
                                    }`}
                                style={{
                                    background: preferences.duration === option.days
                                        ? 'var(--gradient-tea)'
                                        : 'var(--bg-card)',
                                    border: '1px solid var(--border-light)'
                                }}
                            >
                                <div className="font-semibold">{option.emoji} {option.label}</div>
                                <div className="text-xs opacity-80">{option.description}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Travelers */}
                <div>
                    <label className="block font-medium mb-4">How many explorers?</label>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setPreferences(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold transition-all hover:scale-105"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            −
                        </button>
                        <div className="text-center px-6">
                            <span className="text-4xl font-bold">{preferences.travelers}</span>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                {preferences.travelers === 1 ? 'Solo adventure' : preferences.travelers === 2 ? 'Duo journey' : 'Group expedition'}
                            </p>
                        </div>
                        <button
                            onClick={() => setPreferences(prev => ({ ...prev, travelers: Math.min(12, prev.travelers + 1) }))}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold transition-all hover:scale-105"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Month */}
                <div>
                    <label className="block font-medium mb-4">When are you thinking?</label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {months.map((month) => (
                            <button
                                key={month.name}
                                onClick={() => setPreferences(prev => ({ ...prev, travelMonth: month.name }))}
                                className={`px-3 py-3 rounded-xl text-center transition-all ${preferences.travelMonth === month.name ? 'text-white shadow-lg' : ''
                                    }`}
                                style={{
                                    background: preferences.travelMonth === month.name
                                        ? 'var(--gradient-muga)'
                                        : 'var(--bg-card)',
                                    border: `1px solid ${month.season === 'monsoon' ? 'var(--brahma-light)' : 'var(--border-light)'}`
                                }}
                            >
                                <div className="font-medium text-sm">{month.name.slice(0, 3)}</div>
                                <div className="text-xs opacity-70">{month.note}</div>
                            </button>
                        ))}
                    </div>
                    {['May', 'June', 'July', 'August', 'September'].includes(preferences.travelMonth) && (
                        <p className="mt-3 text-sm p-3 rounded-xl flex items-center gap-2" style={{ background: 'rgba(74, 155, 179, 0.1)', color: 'var(--brahma-blue)' }}>
                            <Waves className="w-4 h-4" />
                            Monsoon magic! Some experiences change — we'll adapt your itinerary.
                        </p>
                    )}
                </div>

                {/* Special Requests */}
                <div>
                    <label className="block font-medium mb-4">Anything else we should know?</label>
                    <textarea
                        value={preferences.specialRequests}
                        onChange={(e) => setPreferences(prev => ({ ...prev, specialRequests: e.target.value }))}
                        placeholder="Dietary needs, accessibility, special occasions, specific interests..."
                        className="input-field min-h-[100px]"
                        rows={3}
                    />
                </div>
            </div>
        </div>
    );

    // ==========================================
    // RENDER: Current Step
    // ==========================================
    const renderCurrentStep = () => {
        const step = allSteps[currentStep];

        switch (step.type) {
            case 'intro':
                return renderIntro();
            case 'choice-pair':
                return renderChoicePair(step.choices as ChoicePair);
            case 'must-haves':
                return renderMustHaves();
            case 'logistics':
                return renderLogistics();
            default:
                return null;
        }
    };

    // ==========================================
    // RENDER: Result/Itinerary View
    // ==========================================
    if (showItinerary) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
                {/* Header */}
                <header
                    className="py-6 sticky top-0 z-50"
                    style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}
                >
                    <div className="container-custom flex items-center justify-between">
                        <button
                            onClick={() => setShowItinerary(false)}
                            className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Modify Plan
                        </button>
                        <div className="flex gap-3">
                            <button className="btn-ghost">
                                <Heart className="w-4 h-4" />
                                Save
                            </button>
                            <button className="btn-primary">
                                <Send className="w-4 h-4" />
                                Book This Trip
                            </button>
                        </div>
                    </div>
                </header>

                {/* Hero with Vibe Match */}
                <section className="py-12" style={{ background: 'var(--gradient-river)' }}>
                    <div className="container-custom max-w-4xl text-center text-white">
                        <span className="badge badge-muga mb-4">
                            <Sparkles className="w-4 h-4" />
                            Your Personalized Journey
                        </span>
                        <h1
                            className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            {sampleItinerary.title}
                        </h1>
                        <p className="text-white/80 mb-6">
                            {sampleItinerary.duration} • {preferences.travelers} travelers • {preferences.travelMonth}
                        </p>

                        {/* Vibe Match Score */}
                        <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
                            <div className="text-left">
                                <p className="text-sm text-white/70">Vibe Match</p>
                                <p className="text-3xl font-bold">{sampleItinerary.vibeMatch}%</p>
                            </div>
                            <div className="w-px h-10 bg-white/30" />
                            <div className="text-left">
                                <p className="text-sm text-white/70">Based on</p>
                                <p className="text-sm font-medium">
                                    {preferences.vibe === 'relaxing' ? 'Slow & Soulful' : 'Wild & Free'} + {preferences.tripOutcome === 'rested' ? 'Rest' : 'Inspiration'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Energy Curve */}
                <section className="py-8" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="container-custom max-w-4xl">
                        <h3 className="font-semibold mb-4 text-center">Your Energy Curve</h3>
                        <div className="flex items-end justify-between gap-2 h-24">
                            {sampleItinerary.energyCurve.map((level, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                                    <div
                                        className="w-full rounded-t-lg transition-all"
                                        style={{
                                            height: `${level}%`,
                                            background: level > 70 ? 'var(--gradient-tea)' : level > 50 ? 'var(--muga-gold)' : 'var(--brahma-light)'
                                        }}
                                    />
                                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>D{idx + 1}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-sm mt-4" style={{ color: 'var(--text-muted)' }}>
                            Peak adventure on Day 3, winding down gradually — no burnout! 🧘
                        </p>
                    </div>
                </section>

                {/* Highlights */}
                <section className="py-8">
                    <div className="container-custom max-w-4xl">
                        <div className="flex flex-wrap justify-center gap-3">
                            {sampleItinerary.highlights.map((highlight, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 rounded-full text-sm font-medium"
                                    style={{ background: 'var(--bg-secondary)' }}
                                >
                                    ✨ {highlight}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Day by Day */}
                <section className="py-8">
                    <div className="container-custom max-w-4xl">
                        <h3 className="font-semibold text-xl mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                            Your Day-by-Day Journey
                        </h3>
                        <div className="space-y-4">
                            {sampleItinerary.days.map((day) => (
                                <div key={day.day} className="heritage-card p-6">
                                    <div
                                        className="flex items-center gap-4 mb-4 pb-4"
                                        style={{ borderBottom: '1px solid var(--border-light)' }}
                                    >
                                        <div
                                            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white"
                                            style={{ background: 'var(--gradient-tea)' }}
                                        >
                                            <span className="text-xs opacity-80">DAY</span>
                                            <span className="text-xl font-bold -mt-1">{day.day}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{day.title}</h3>
                                            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {day.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Battery className="w-4 h-4" />
                                                    {day.energyLevel}% energy
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-medium"
                                            style={{ background: 'rgba(201, 162, 39, 0.1)', color: 'var(--muga-gold)' }}
                                        >
                                            {day.vibe}
                                        </span>
                                    </div>

                                    <ul className="space-y-2 mb-4">
                                        {day.activities.map((activity, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--tea-garden)' }} />
                                                <span style={{ color: 'var(--text-secondary)' }}>{activity}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                                        {day.accommodation !== '-' && (
                                            <span className="flex items-center gap-1">
                                                🏨 {day.accommodation}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            🍽️ {day.meals}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Budget Breakdown */}
                <section className="py-8" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="container-custom max-w-4xl">
                        <h3 className="font-semibold text-xl mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                            Budget Anatomy
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-card)' }}>
                                <h4 className="font-medium mb-4">Where Your Money Goes</h4>
                                <div className="space-y-3">
                                    {Object.entries(sampleItinerary.budgetBreakdown).map(([key, value]) => (
                                        <div key={key}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="capitalize">{key}</span>
                                                <span>{value}%</span>
                                            </div>
                                            <div className="h-2 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
                                                <div
                                                    className="h-full rounded-full transition-all"
                                                    style={{
                                                        width: `${value}%`,
                                                        background: key === 'experiences' ? 'var(--gradient-muga)' : 'var(--gradient-tea)'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl text-center" style={{ background: 'var(--bg-card)' }}>
                                <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>Estimated Total</p>
                                <p className="text-4xl font-bold mb-2" style={{ color: 'var(--tea-deep)' }}>
                                    ₹{sampleItinerary.estimatedCost[preferences.budgetStyle === 'treat-yourself' ? 'luxury' : 'midRange'].toLocaleString()}
                                </p>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    per person • {preferences.budgetStyle === 'treat-yourself' ? 'Premium' : 'Comfortable'} style
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-12">
                    <div className="container-custom max-w-xl text-center">
                        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Ready to make it real?
                        </h3>
                        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                            Our local experts will refine this plan and handle all bookings.
                        </p>
                        <button className="btn-primary text-lg px-10 py-4">
                            <Send className="w-5 h-5" />
                            Book This Journey
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    // ==========================================
    // RENDER: Main Wizard View
    // ==========================================
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-4 sticky top-0 z-50"
                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}
            >
                <div className="container-custom flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </Link>

                    {/* Progress Bar */}
                    {currentStep > 0 && (
                        <div className="flex-1 max-w-md mx-4">
                            <div className="h-1.5 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${progressPercent}%`,
                                        background: 'var(--gradient-muga)'
                                    }}
                                />
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                    {allSteps[currentStep].title}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                    {progressPercent}%
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="w-20" /> {/* Spacer for alignment */}
                </div>
            </header>

            {/* Content */}
            <section className="py-12 md:py-16">
                <div className="container-custom">
                    {renderCurrentStep()}
                </div>
            </section>

            {/* Navigation Footer */}
            {currentStep > 0 && (
                <footer
                    className="fixed bottom-0 left-0 right-0 py-4 z-40"
                    style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderTop: '1px solid var(--border-light)' }}
                >
                    <div className="container-custom flex justify-between items-center">
                        <button
                            onClick={() => goToStep('prev')}
                            className="btn-ghost"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>

                        {currentStep < allSteps.length - 1 ? (
                            <button
                                onClick={() => goToStep('next')}
                                className="btn-primary"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleGenerate}
                                className="btn-primary"
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Crafting your journey...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        Generate My Dream Trip
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </footer>
            )}
        </div>
    );
}
