'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    User, MapPin, Calendar, Heart, Bookmark, Settings, LogOut,
    ChevronRight, Star, Clock, Check, AlertCircle, CreditCard,
    Mail, Phone, Edit, Camera
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

/* ============================================
   USER DASHBOARD PAGE
   Profile, bookings, saved items
   ============================================ */

// Tabs
const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
    { id: 'bookings', label: 'My Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'saved', label: 'Saved', icon: <Heart className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
];

// Sample data
const sampleBookings = [
    {
        id: '1',
        experience: {
            title: 'Kaziranga Safari: Track the One-Horned Rhino',
            image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&q=80',
            host: 'Kaziranga Eco Lodge',
        },
        date: '2026-02-15',
        guests: 2,
        totalAmount: 26400,
        status: 'confirmed',
        bookingRef: 'AXC-R7K3M9',
    },
    {
        id: '2',
        experience: {
            title: 'Majuli Island: Living Heritage of the Satras',
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
            host: 'Pranjal Saikia',
        },
        date: '2026-03-08',
        guests: 4,
        totalAmount: 37400,
        status: 'pending',
        bookingRef: 'AXC-H2P5N8',
    },
];

const savedExperiences = [
    {
        id: '1',
        title: 'Tea Garden Stay & Plucking Experience',
        image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=400&q=80',
        price: 15000,
        rating: 4.9,
        location: 'Dibrugarh',
    },
    {
        id: '2',
        title: 'Bodo Cultural Immersion with Bagurumba Dance',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80',
        price: 5500,
        rating: 4.6,
        location: 'Kokrajhar',
    },
];

const savedArticles = [
    {
        id: '1',
        title: '7 Days in Assam: The Ultimate First-Timer\'s Itinerary',
        image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&q=80',
        author: 'Priya Sharma',
        readTime: '12 min',
    },
];

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState('overview');

    // Show loading or redirect to login if not authenticated
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--tea-garden)' }} />
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    // For demo purposes, show dashboard even without session
    const user = session?.user || {
        name: 'Demo User',
        email: 'demo@rhinoroam.com',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'confirmed':
                return { color: 'var(--success)', bg: 'rgba(46, 125, 50, 0.1)', label: 'Confirmed' };
            case 'pending':
                return { color: 'var(--warning)', bg: 'rgba(255, 152, 0, 0.1)', label: 'Pending' };
            case 'cancelled':
                return { color: 'var(--error)', bg: 'rgba(198, 40, 40, 0.1)', label: 'Cancelled' };
            default:
                return { color: 'var(--text-muted)', bg: 'var(--bg-secondary)', label: status };
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-8"
                style={{ background: 'var(--gradient-tea)' }}
            >
                <div className="container-custom">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <Image
                                src={user.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'}
                                alt={user.name || 'User'}
                                width={80}
                                height={80}
                                className="rounded-full object-cover ring-4 ring-white/20"
                            />
                            <button
                                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white"
                                style={{ background: 'var(--tea-deep)' }}
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-white/70">{user.email}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                                <span>Member since Jan 2026</span>
                                <span>•</span>
                                <span>{sampleBookings.length} bookings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div
                className="sticky top-0 z-40"
                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}
            >
                <div className="container-custom">
                    <div className="flex gap-1 py-2 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'text-white' : ''
                                    }`}
                                style={{
                                    background: activeTab === tab.id ? 'var(--gradient-tea)' : 'transparent',
                                }}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
                        {/* Stats */}
                        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="heritage-card p-5 text-center">
                                <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--tea-garden)' }} />
                                <p className="text-2xl font-bold">{sampleBookings.length}</p>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Bookings</p>
                            </div>
                            <div className="heritage-card p-5 text-center">
                                <Heart className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--mekhela-red)' }} />
                                <p className="text-2xl font-bold">{savedExperiences.length}</p>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Saved</p>
                            </div>
                            <div className="heritage-card p-5 text-center">
                                <Star className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--muga-gold)' }} />
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Reviews</p>
                            </div>
                            <div className="heritage-card p-5 text-center">
                                <Bookmark className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--river-deep)' }} />
                                <p className="text-2xl font-bold">{savedArticles.length}</p>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Articles</p>
                            </div>
                        </div>

                        {/* Upcoming Booking */}
                        <div className="md:col-span-2">
                            <h2 className="text-lg font-semibold mb-4">Upcoming Trip</h2>
                            {sampleBookings.filter(b => b.status === 'confirmed')[0] ? (
                                <div className="heritage-card p-5">
                                    <div className="flex gap-4">
                                        <Image
                                            src={sampleBookings[0].experience.image}
                                            alt={sampleBookings[0].experience.title}
                                            width={120}
                                            height={80}
                                            className="rounded-xl object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold line-clamp-1">{sampleBookings[0].experience.title}</h3>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                Hosted by {sampleBookings[0].experience.host}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {formatDate(sampleBookings[0].date)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {sampleBookings[0].guests} guests
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                            Ref: {sampleBookings[0].bookingRef}
                                        </span>
                                        <Link href={`/bookings/${sampleBookings[0].id}`} className="btn-ghost text-sm py-1">
                                            View Details
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="heritage-card p-8 text-center">
                                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p style={{ color: 'var(--text-muted)' }}>No upcoming trips</p>
                                    <Link href="/experiences" className="btn-primary mt-4">
                                        Explore Experiences
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                            <div className="heritage-card divide-y divide-[var(--border-light)]">
                                <Link href="/ai-trip-planner" className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors">
                                    <MapPin className="w-5 h-5" style={{ color: 'var(--tea-garden)' }} />
                                    <span>Plan a Trip</span>
                                    <ChevronRight className="w-4 h-4 ml-auto" />
                                </Link>
                                <Link href="/experiences" className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors">
                                    <Star className="w-5 h-5" style={{ color: 'var(--muga-gold)' }} />
                                    <span>Browse Experiences</span>
                                    <ChevronRight className="w-4 h-4 ml-auto" />
                                </Link>
                                <Link href="/articles" className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors">
                                    <Bookmark className="w-5 h-5" style={{ color: 'var(--river-deep)' }} />
                                    <span>Read Articles</span>
                                    <ChevronRight className="w-4 h-4 ml-auto" />
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center gap-3 p-4 w-full text-left hover:bg-secondary transition-colors"
                                >
                                    <LogOut className="w-5 h-5" style={{ color: 'var(--error)' }} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="animate-fade-in">
                        <h2 className="text-lg font-semibold mb-4">My Bookings</h2>
                        <div className="space-y-4">
                            {sampleBookings.map((booking) => {
                                const status = getStatusBadge(booking.status);
                                return (
                                    <div key={booking.id} className="heritage-card p-5">
                                        <div className="flex gap-4">
                                            <Image
                                                src={booking.experience.image}
                                                alt={booking.experience.title}
                                                width={140}
                                                height={100}
                                                className="rounded-xl object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <span
                                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                                                            style={{ background: status.bg, color: status.color }}
                                                        >
                                                            {booking.status === 'confirmed' && <Check className="w-3 h-3" />}
                                                            {booking.status === 'pending' && <Clock className="w-3 h-3" />}
                                                            {status.label}
                                                        </span>
                                                        <h3 className="font-semibold mt-2">{booking.experience.title}</h3>
                                                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                            Hosted by {booking.experience.host}
                                                        </p>
                                                    </div>
                                                    <p className="font-bold" style={{ color: 'var(--tea-deep)' }}>
                                                        ₹{booking.totalAmount.toLocaleString()}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-4 mt-3 text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(booking.date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        {booking.guests} guests
                                                    </span>
                                                    <span style={{ color: 'var(--text-muted)' }}>
                                                        Ref: {booking.bookingRef}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                                            <button className="btn-ghost text-sm py-1 flex-1">
                                                View Details
                                            </button>
                                            {booking.status === 'pending' && (
                                                <button className="btn-primary text-sm py-1 flex-1">
                                                    Complete Payment
                                                </button>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <button className="btn-ghost text-sm py-1" style={{ color: 'var(--error)' }}>
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Saved Tab */}
                {activeTab === 'saved' && (
                    <div className="animate-fade-in">
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4">Saved Experiences</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {savedExperiences.map((exp) => (
                                    <div key={exp.id} className="heritage-card overflow-hidden">
                                        <div className="relative h-32">
                                            <Image
                                                src={exp.image}
                                                alt={exp.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                                                style={{ background: 'rgba(0,0,0,0.5)' }}
                                            >
                                                <Heart className="w-4 h-4" style={{ color: 'var(--mekhela-red)', fill: 'var(--mekhela-red)' }} />
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-sm line-clamp-2">{exp.title}</h3>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm" style={{ color: 'var(--tea-deep)' }}>
                                                    ₹{exp.price.toLocaleString()}
                                                </span>
                                                <span className="flex items-center gap-1 text-sm">
                                                    <Star className="w-3 h-3" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                                                    {exp.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-4">Saved Articles</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {savedArticles.map((article) => (
                                    <div key={article.id} className="heritage-card overflow-hidden">
                                        <div className="relative h-32">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-sm line-clamp-2">{article.title}</h3>
                                            <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                                <span>{article.author}</span>
                                                <span>•</span>
                                                <span>{article.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="max-w-2xl animate-fade-in">
                        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

                        <div className="heritage-card p-6 mb-6">
                            <h3 className="font-semibold mb-4">Profile Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user.name || ''}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        defaultValue={user.email || ''}
                                        className="input-field"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="Add phone number"
                                        className="input-field"
                                    />
                                </div>
                            </div>
                            <button className="btn-primary mt-6">
                                Save Changes
                            </button>
                        </div>

                        <div className="heritage-card p-6 mb-6">
                            <h3 className="font-semibold mb-4">Preferences</h3>
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="rounded" />
                                    <span className="text-sm">Email me about new experiences</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="rounded" />
                                    <span className="text-sm">Send booking reminders</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-sm">Festival and event alerts</span>
                                </label>
                            </div>
                        </div>

                        <div className="heritage-card p-6" style={{ borderColor: 'var(--error)' }}>
                            <h3 className="font-semibold mb-2" style={{ color: 'var(--error)' }}>Danger Zone</h3>
                            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                                Once you delete your account, there is no going back.
                            </p>
                            <button
                                className="text-sm font-medium px-4 py-2 rounded-lg border"
                                style={{ borderColor: 'var(--error)', color: 'var(--error)' }}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
