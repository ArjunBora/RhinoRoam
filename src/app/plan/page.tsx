"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/ui/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    Sparkles,
    ChevronRight,
    ChevronDown,
    Plus,
    Trash2,
    GripVertical,
    Sun,
    Sunset,
    Moon,
    Edit2,
    Share2,
    Download
} from "lucide-react";
import { cn, POI_CATEGORY_ICONS, formatDuration } from "@/lib/utils";

// Sample destination options
const DESTINATIONS = [
    { id: "hampi", name: "Hampi", state: "Karnataka" },
    { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh" },
    { id: "jaipur", name: "Jaipur", state: "Rajasthan" },
    { id: "khajuraho", name: "Khajuraho", state: "Madhya Pradesh" },
];

// Sample POIs for itinerary
const AVAILABLE_POIS = [
    { id: "1", name: "Virupaksha Temple", category: "TEMPLE", duration: 90 },
    { id: "2", name: "Vittala Temple Complex", category: "TEMPLE", duration: 120 },
    { id: "3", name: "Matanga Hill", category: "VIEWPOINT", duration: 60 },
    { id: "4", name: "Lotus Mahal", category: "PALACE", duration: 45 },
    { id: "5", name: "Elephant Stables", category: "MONUMENT", duration: 30 },
    { id: "6", name: "Hampi Bazaar", category: "MARKET", duration: 45 },
    { id: "7", name: "Royal Enclosure", category: "ARCHAEOLOGICAL", duration: 90 },
    { id: "8", name: "Queen's Bath", category: "MONUMENT", duration: 30 },
];

interface Activity {
    id: string;
    type: "poi" | "meal" | "transport" | "rest";
    name: string;
    duration: number;
    time?: string;
    category?: string;
}

interface DayPlan {
    day: number;
    activities: Activity[];
}

export default function PlanPage() {
    const [step, setStep] = useState<"select" | "customize" | "review">("select");
    const [selectedDestination, setSelectedDestination] = useState<string>("");
    const [duration, setDuration] = useState(2);
    const [travelStyle, setTravelStyle] = useState<"relaxed" | "moderate" | "intensive">("moderate");
    const [interests, setInterests] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [dayPlans, setDayPlans] = useState<DayPlan[]>([]);

    const interestOptions = [
        "Temples & Religion",
        "Architecture",
        "History",
        "Photography",
        "Local Food",
        "Nature & Walks",
        "Art & Crafts",
        "Cultural Experiences",
    ];

    const toggleInterest = (interest: string) => {
        setInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        );
    };

    const generateItinerary = async () => {
        setIsGenerating(true);

        // Simulate AI generation
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Create sample itinerary based on duration
        const plans: DayPlan[] = [];
        const pois = [...AVAILABLE_POIS];

        for (let day = 1; day <= duration; day++) {
            const activities: Activity[] = [];

            // Morning activity
            if (pois.length > 0) {
                const poi = pois.shift()!;
                activities.push({
                    id: `${day}-morning`,
                    type: "poi",
                    name: poi.name,
                    duration: poi.duration,
                    time: "06:30",
                    category: poi.category,
                });
            }

            // Breakfast
            activities.push({
                id: `${day}-breakfast`,
                type: "meal",
                name: "Breakfast at local restaurant",
                duration: 45,
                time: "08:30",
            });

            // Mid-morning activity
            if (pois.length > 0) {
                const poi = pois.shift()!;
                activities.push({
                    id: `${day}-midmorning`,
                    type: "poi",
                    name: poi.name,
                    duration: poi.duration,
                    time: "09:30",
                    category: poi.category,
                });
            }

            // Lunch
            activities.push({
                id: `${day}-lunch`,
                type: "meal",
                name: "Lunch break",
                duration: 60,
                time: "12:30",
            });

            // Afternoon activity
            if (pois.length > 0) {
                const poi = pois.shift()!;
                activities.push({
                    id: `${day}-afternoon`,
                    type: "poi",
                    name: poi.name,
                    duration: poi.duration,
                    time: "14:00",
                    category: poi.category,
                });
            }

            // Evening activity
            if (pois.length > 0 && day < duration) {
                const poi = pois.shift()!;
                activities.push({
                    id: `${day}-evening`,
                    type: "poi",
                    name: poi.name,
                    duration: poi.duration,
                    time: "16:30",
                    category: poi.category,
                });
            }

            plans.push({ day, activities });
        }

        setDayPlans(plans);
        setIsGenerating(false);
        setStep("customize");
    };

    const getTimeIcon = (time: string) => {
        const hour = parseInt(time.split(":")[0]);
        if (hour < 12) return Sun;
        if (hour < 17) return Sunset;
        return Moon;
    };

    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg-secondary)]">
            <Header />

            <main className="flex-1 pt-[var(--header-height)]">
                {/* Hero */}
                <section className="py-12 bg-gradient-to-b from-[var(--neutral-900)] to-[var(--neutral-800)]">
                    <div className="container-custom">
                        <div className="max-w-2xl">
                            <span className="badge badge-heritage mb-4">AI-Powered</span>
                            <h1 className="text-4xl font-heading font-bold text-white mb-4">
                                Plan Your Heritage Journey
                            </h1>
                            <p className="text-lg text-white/70">
                                Let our AI create a personalized itinerary based on your interests,
                                time, and travel style. Customize every detail to make it perfect.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Progress Steps */}
                <div className="bg-[var(--bg-card)] border-b border-[var(--border-light)] py-4">
                    <div className="container-custom">
                        <div className="flex items-center justify-center gap-4">
                            {[
                                { id: "select", label: "1. Select Destination" },
                                { id: "customize", label: "2. Customize Itinerary" },
                                { id: "review", label: "3. Review & Save" },
                            ].map((s, index) => (
                                <div key={s.id} className="flex items-center">
                                    <div
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                            step === s.id
                                                ? "bg-gradient-heritage text-white"
                                                : step === "review" || (step === "customize" && index < 1)
                                                    ? "bg-[var(--success)]/20 text-[var(--success)]"
                                                    : "bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                                        )}
                                    >
                                        {s.label}
                                    </div>
                                    {index < 2 && (
                                        <ChevronRight className="w-5 h-5 text-[var(--text-muted)] mx-2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Step 1: Select Destination */}
                {step === "select" && (
                    <section className="section-padding">
                        <div className="container-custom max-w-3xl">
                            <div className="bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)] p-8">
                                {/* Destination Selection */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium mb-3">
                                        Where do you want to explore?
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {DESTINATIONS.map((dest) => (
                                            <button
                                                key={dest.id}
                                                onClick={() => setSelectedDestination(dest.id)}
                                                className={cn(
                                                    "p-4 rounded-xl border-2 text-left transition-all",
                                                    selectedDestination === dest.id
                                                        ? "border-[var(--heritage-gold)] bg-[var(--heritage-gold)]/5"
                                                        : "border-[var(--border-light)] hover:border-[var(--border-medium)]"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-5 h-5 text-[var(--heritage-gold)]" />
                                                    <span className="font-medium">{dest.name}</span>
                                                </div>
                                                <p className="text-sm text-[var(--text-muted)] mt-1">
                                                    {dest.state}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium mb-3">
                                        How many days do you have?
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setDuration(Math.max(1, duration - 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-[var(--border-light)] flex items-center justify-center hover:border-[var(--heritage-gold)] transition-colors"
                                        >
                                            -
                                        </button>
                                        <div className="flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] rounded-xl">
                                            <Calendar className="w-5 h-5 text-[var(--heritage-gold)]" />
                                            <span className="text-2xl font-bold">{duration}</span>
                                            <span className="text-[var(--text-muted)]">
                                                {duration === 1 ? "day" : "days"}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setDuration(Math.min(7, duration + 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-[var(--border-light)] flex items-center justify-center hover:border-[var(--heritage-gold)] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Travel Style */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium mb-3">
                                        Your travel style
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { id: "relaxed", label: "Relaxed", desc: "Few sites, more leisure" },
                                            { id: "moderate", label: "Moderate", desc: "Balanced exploration" },
                                            { id: "intensive", label: "Intensive", desc: "See everything!" },
                                        ].map((style) => (
                                            <button
                                                key={style.id}
                                                onClick={() => setTravelStyle(style.id as any)}
                                                className={cn(
                                                    "p-4 rounded-xl border-2 text-center transition-all",
                                                    travelStyle === style.id
                                                        ? "border-[var(--heritage-gold)] bg-[var(--heritage-gold)]/5"
                                                        : "border-[var(--border-light)] hover:border-[var(--border-medium)]"
                                                )}
                                            >
                                                <span className="font-medium block">{style.label}</span>
                                                <span className="text-xs text-[var(--text-muted)]">{style.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Interests */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium mb-3">
                                        What interests you? (select multiple)
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {interestOptions.map((interest) => (
                                            <button
                                                key={interest}
                                                onClick={() => toggleInterest(interest)}
                                                className={cn(
                                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                                    interests.includes(interest)
                                                        ? "bg-gradient-heritage text-white"
                                                        : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-light)]"
                                                )}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Generate Button */}
                                <button
                                    onClick={generateItinerary}
                                    disabled={!selectedDestination || isGenerating}
                                    className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isGenerating ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Generating Your Itinerary...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Generate AI Itinerary
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Step 2: Customize Itinerary */}
                {step === "customize" && (
                    <section className="section-padding">
                        <div className="container-custom">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-heading font-bold">
                                        Your {duration}-Day {DESTINATIONS.find((d) => d.id === selectedDestination)?.name} Itinerary
                                    </h2>
                                    <p className="text-[var(--text-secondary)]">
                                        Drag and drop to reorder. Click to edit details.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep("select")}
                                        className="btn-ghost"
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        onClick={() => setStep("review")}
                                        className="btn-primary"
                                    >
                                        Review Plan
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Day Plans */}
                                <div className="lg:col-span-2 space-y-6">
                                    {dayPlans.map((dayPlan) => (
                                        <div
                                            key={dayPlan.day}
                                            className="bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)] overflow-hidden"
                                        >
                                            {/* Day Header */}
                                            <div className="bg-gradient-heritage p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-white">
                                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
                                                        {dayPlan.day}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">Day {dayPlan.day}</h3>
                                                        <p className="text-sm text-white/80">
                                                            {dayPlan.activities.filter((a) => a.type === "poi").length} activities
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                                    <ChevronDown className="w-5 h-5 text-white" />
                                                </button>
                                            </div>

                                            {/* Activities */}
                                            <div className="p-4 space-y-3">
                                                {dayPlan.activities.map((activity) => {
                                                    const TimeIcon = activity.time ? getTimeIcon(activity.time) : Sun;
                                                    return (
                                                        <div
                                                            key={activity.id}
                                                            className="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-xl group"
                                                        >
                                                            <GripVertical className="w-4 h-4 text-[var(--text-muted)] cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />

                                                            {/* Time */}
                                                            <div className="w-16 text-center">
                                                                <TimeIcon className="w-4 h-4 text-[var(--heritage-gold)] mx-auto mb-1" />
                                                                <span className="text-xs font-medium">{activity.time}</span>
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    {activity.category && (
                                                                        <span className="text-lg">
                                                                            {POI_CATEGORY_ICONS[activity.category]}
                                                                        </span>
                                                                    )}
                                                                    {activity.type === "meal" && <span className="text-lg">🍽️</span>}
                                                                    <span className="font-medium">{activity.name}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-muted)]">
                                                                    <Clock className="w-3 h-3" />
                                                                    {formatDuration(activity.duration)}
                                                                </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button className="p-1.5 rounded hover:bg-[var(--border-light)]">
                                                                    <Edit2 className="w-4 h-4 text-[var(--text-muted)]" />
                                                                </button>
                                                                <button className="p-1.5 rounded hover:bg-red-50">
                                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                {/* Add Activity Button */}
                                                <button className="w-full p-3 border-2 border-dashed border-[var(--border-light)] rounded-xl text-sm text-[var(--text-muted)] hover:border-[var(--heritage-gold)] hover:text-[var(--heritage-gold)] transition-colors flex items-center justify-center gap-2">
                                                    <Plus className="w-4 h-4" />
                                                    Add Activity
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Available POIs Sidebar */}
                                <div className="lg:col-span-1">
                                    <div className="bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)] p-4 sticky top-[120px]">
                                        <h3 className="font-semibold mb-4">Available Places</h3>
                                        <p className="text-sm text-[var(--text-muted)] mb-4">
                                            Drag these to add to your itinerary
                                        </p>
                                        <div className="space-y-2">
                                            {AVAILABLE_POIS.slice(0, 5).map((poi) => (
                                                <div
                                                    key={poi.id}
                                                    className="p-3 bg-[var(--bg-secondary)] rounded-xl cursor-grab hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">{POI_CATEGORY_ICONS[poi.category]}</span>
                                                        <span className="text-sm font-medium">{poi.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-[var(--text-muted)]">
                                                        <Clock className="w-3 h-3" />
                                                        {formatDuration(poi.duration)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Step 3: Review */}
                {step === "review" && (
                    <section className="section-padding">
                        <div className="container-custom max-w-3xl">
                            <div className="bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)] p-8">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 rounded-full bg-[var(--success)]/20 flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-8 h-8 text-[var(--success)]" />
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold mb-2">
                                        Your Itinerary is Ready!
                                    </h2>
                                    <p className="text-[var(--text-secondary)]">
                                        {duration} days in {DESTINATIONS.find((d) => d.id === selectedDestination)?.name} •
                                        {dayPlans.reduce((acc, d) => acc + d.activities.filter((a) => a.type === "poi").length, 0)} activities planned
                                    </p>
                                </div>

                                {/* Summary */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="p-4 bg-[var(--bg-secondary)] rounded-xl text-center">
                                        <Calendar className="w-6 h-6 text-[var(--heritage-gold)] mx-auto mb-2" />
                                        <p className="font-semibold">{duration} Days</p>
                                        <p className="text-xs text-[var(--text-muted)]">Duration</p>
                                    </div>
                                    <div className="p-4 bg-[var(--bg-secondary)] rounded-xl text-center">
                                        <MapPin className="w-6 h-6 text-[var(--nature-teal)] mx-auto mb-2" />
                                        <p className="font-semibold">
                                            {dayPlans.reduce((acc, d) => acc + d.activities.filter((a) => a.type === "poi").length, 0)}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)]">Places to Visit</p>
                                    </div>
                                    <div className="p-4 bg-[var(--bg-secondary)] rounded-xl text-center">
                                        <Clock className="w-6 h-6 text-[var(--heritage-bronze)] mx-auto mb-2" />
                                        <p className="font-semibold">
                                            {formatDuration(
                                                dayPlans.reduce(
                                                    (acc, d) => acc + d.activities.reduce((a, act) => a + act.duration, 0),
                                                    0
                                                )
                                            )}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)]">Total Time</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => setStep("customize")}
                                        className="btn-secondary flex-1"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit Itinerary
                                    </button>
                                    <button className="btn-secondary flex-1">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>
                                    <button className="btn-primary flex-1">
                                        <Download className="w-4 h-4" />
                                        Save to Account
                                    </button>
                                </div>

                                <p className="text-xs text-center text-[var(--text-muted)] mt-4">
                                    Sign in to save your itinerary and access it from any device
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
