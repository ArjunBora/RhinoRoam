'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Calendar, Users, Compass, Mountain,
  TreePine, Waves, Tent, Camera, Star, ArrowRight,
  ChevronDown, Heart, Play, Sparkles, Leaf, Bird, User
} from 'lucide-react';

/* ============================================
   AXOM CONNECT - HOMEPAGE
   Assam-First Tourism Experience
   ============================================ */

// Type definitions
interface Experience {
  id: string;
  title: string;
  slug: string;
  location: string;
  district: string;
  category: string;
  duration: string;
  image: string;
  rating: number;
  reviews: number;
  price?: number;
  isFeatured?: boolean;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

interface Festival {
  id: string;
  name: string;
  date: string;
  month: string;
  location: string;
  district: string;
  community?: string;
  description: string;
  type: 'state' | 'regional' | 'tribal' | 'religious';
}

interface District {
  id: string;
  name: string;
  slug: string;
  region: string;
  image: string;
  experienceCount: number;
}

// Sample data - Assam experiences
const featuredExperiences: Experience[] = [
  {
    id: '1',
    title: 'Majuli Island Heritage Walk',
    slug: 'majuli-heritage-walk',
    location: 'Majuli',
    district: 'Majuli',
    category: 'Cultural Heritage',
    duration: '2 days',
    image: '/images/majuli-island-heritage-walk.webp',
    rating: 4.9,
    reviews: 324,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Kaziranga Safari & Conservation',
    slug: 'kaziranga-safari',
    location: 'Kaziranga National Park',
    district: 'Golaghat',
    category: 'Wildlife',
    duration: '3 days',
    image: '/images/kaziranga-safari-conservation.webp',
    rating: 4.8,
    reviews: 567,
    price: 12000,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Muga Silk Weaving Workshop',
    slug: 'muga-silk-workshop',
    location: 'Sualkuchi',
    district: 'Kamrup',
    category: 'Artisan Craft',
    duration: '1 day',
    image: '/images/muga-silk-weaving-workshop.webp',
    rating: 4.7,
    reviews: 189,
    price: 2500
  },
  {
    id: '4',
    title: 'Tea Garden Stay & Plucking',
    slug: 'tea-garden-experience',
    location: 'Dibrugarh',
    district: 'Dibrugarh',
    category: 'Agri Tourism',
    duration: '2 days',
    image: '/images/tea-garden-stay-plucking.webp',
    rating: 4.9,
    reviews: 412,
    price: 8000,
    isFeatured: true
  },
  {
    id: '5',
    title: 'Mising Tribal Village Stay',
    slug: 'mising-tribal-stay',
    location: 'Dhemaji',
    district: 'Dhemaji',
    category: 'Tribal Immersion',
    duration: '3 days',
    image: '/images/mising-tribal-village-stay.webp',
    rating: 4.8,
    reviews: 156,
    price: 6000
  },
  {
    id: '6',
    title: 'Brahmaputra River Cruise',
    slug: 'brahmaputra-cruise',
    location: 'Guwahati to Jorhat',
    district: 'Kamrup Metro',
    category: 'River Journey',
    duration: '4 days',
    image: '/images/brahmaputra-river-cruise.webp',
    rating: 4.9,
    reviews: 234,
    price: 45000,
    isFeatured: true
  }
];

const collections: Collection[] = [
  {
    id: 'wildlife',
    title: 'Wildlife Safaris',
    description: 'One-horned rhinos, elephants & rare birds',
    image: '/images/kaziranga-safari-conservation.webp',
    count: 12,
    color: 'var(--forest-kaziranga)',
    icon: <Bird className="w-6 h-6" />
  },
  {
    id: 'tea',
    title: 'Tea Trails',
    description: 'Heritage gardens & plantation stays',
    image: '/images/tea-garden-stay-plucking.webp',
    count: 18,
    color: 'var(--tea-garden)',
    icon: <Leaf className="w-6 h-6" />
  },
  {
    id: 'river',
    title: 'River Journeys',
    description: 'Brahmaputra expeditions & island hopping',
    image: '/images/brahmaputra-river-cruise.webp',
    count: 8,
    color: 'var(--brahma-blue)',
    icon: <Waves className="w-6 h-6" />
  },
  {
    id: 'tribal',
    title: 'Tribal Immersions',
    description: 'Stay with Mising, Bodo, Karbi communities',
    image: '/images/mising-tribal-village-stay.webp',
    count: 24,
    color: 'var(--mekhela-red)',
    icon: <Tent className="w-6 h-6" />
  },
  {
    id: 'handloom',
    title: 'Handloom Heritage',
    description: 'Muga silk, Eri weaving workshops',
    image: '/images/muga-silk-weaving-workshop.webp',
    count: 15,
    color: 'var(--muga-gold)',
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 'hidden',
    title: 'Hidden Gems',
    description: 'Off-beat destinations & secret trails',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    count: 32,
    color: 'var(--earth-assam)',
    icon: <Compass className="w-6 h-6" />
  }
];

// Assamese Festivals Calendar
const upcomingFestivals: Festival[] = [
  {
    id: '1',
    name: 'Magh Bihu (Bhogali Bihu)',
    date: '14-15 January',
    month: 'JAN',
    location: 'Statewide',
    district: 'All',
    description: 'Harvest festival with community feasts, Meji burning, and traditional games',
    type: 'state'
  },
  {
    id: '2',
    name: 'Ali Aye Ligang',
    date: '17 February',
    month: 'FEB',
    location: 'Mising Villages, Dhemaji',
    district: 'Dhemaji',
    community: 'Mising',
    description: 'Spring festival celebrating agriculture with traditional dances',
    type: 'tribal'
  },
  {
    id: '3',
    name: 'Bohag Bihu (Rongali Bihu)',
    date: '14-20 April',
    month: 'APR',
    location: 'Statewide',
    district: 'All',
    description: 'Assamese New Year with Bihu dance, music, and community celebrations',
    type: 'state'
  },
  {
    id: '4',
    name: 'Ambubachi Mela',
    date: '22-26 June',
    month: 'JUN',
    location: 'Kamakhya Temple, Guwahati',
    district: 'Kamrup Metro',
    description: 'Annual religious fair at Kamakhya Temple, attracting devotees worldwide',
    type: 'religious'
  },
  {
    id: '5',
    name: 'Bwisagu',
    date: '14-21 April',
    month: 'APR',
    location: 'BTR Districts',
    district: 'Kokrajhar',
    community: 'Bodo',
    description: 'Bodo New Year with traditional Bagurumba dance and rituals',
    type: 'tribal'
  },
  {
    id: '6',
    name: 'Rongker Festival',
    date: '15-17 May',
    month: 'MAY',
    location: 'Karbi Anglong',
    district: 'Karbi Anglong',
    community: 'Karbi',
    description: 'Agricultural festival with community worship and feasting',
    type: 'tribal'
  },
  {
    id: '7',
    name: 'Kati Bihu',
    date: '18 October',
    month: 'OCT',
    location: 'Statewide',
    district: 'All',
    description: 'Festival of lights with Akash Banti (sky lamps) in paddy fields',
    type: 'state'
  },
  {
    id: '8',
    name: 'Me-Dam-Me-Phi',
    date: '31 January',
    month: 'JAN',
    location: 'Upper Assam',
    district: 'Sivasagar',
    community: 'Tai-Ahom',
    description: 'Ahom ancestral worship and remembrance ceremony',
    type: 'tribal'
  }
];

const districts: District[] = [
  { id: '1', name: 'Kamrup Metro', slug: 'kamrup-metro', region: 'Central', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Rangia_city_in_2024.jpg/2560px-Rangia_city_in_2024.jpg', experienceCount: 45 },
  { id: '2', name: 'Golaghat', slug: 'golaghat', region: 'Central', image: '/images/kaziranga-safari-conservation.webp', experienceCount: 23 },
  { id: '3', name: 'Majuli', slug: 'majuli', region: 'Central', image: '/images/majuli-island-heritage-walk.webp', experienceCount: 18 },
  { id: '4', name: 'Sivasagar', slug: 'sivasagar', region: 'Upper', image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=400&q=80', experienceCount: 32 },
  { id: '5', name: 'Dibrugarh', slug: 'dibrugarh', region: 'Upper', image: '/images/tea-garden-stay-plucking.webp', experienceCount: 28 }
];

// Category filter pills
const categories = [
  { id: 'all', label: 'All Experiences', icon: <Compass className="w-4 h-4" /> },
  { id: 'wildlife', label: 'Wildlife', icon: <Bird className="w-4 h-4" /> },
  { id: 'cultural', label: 'Cultural', icon: <Camera className="w-4 h-4" /> },
  { id: 'adventure', label: 'Adventure', icon: <Mountain className="w-4 h-4" /> },
  { id: 'river', label: 'River', icon: <Waves className="w-4 h-4" /> },
  { id: 'tea', label: 'Tea Trails', icon: <Leaf className="w-4 h-4" /> }
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-page.jpg"
            alt="Assam Landscape with Boat"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'var(--gradient-hero)' }}
          />
          {/* Animated pattern overlay */}
          <div
            className="absolute inset-0 tea-pattern-bg opacity-20"
            style={{ mixBlendMode: 'overlay' }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'rgba(201, 162, 39, 0.2)',
                color: 'var(--muga-light)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Sparkles className="w-4 h-4" />
              Experience the Soul of Northeast India
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up"
            style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.2s' }}
          >
            Discover <span className="text-gradient-muga">Assam</span>
            <br />
            <span className="text-4xl md:text-5xl font-normal opacity-90">
              Through Local Eyes
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            From the golden threads of Muga silk to the hidden trails of the Brahmaputra,
            immerse yourself in a land where every artisan has a story and every landscape a soul.
          </p>

          <div className="animate-slide-up mb-4" style={{ animationDelay: '0.35s' }}>
            <span className="text-sm md:text-base text-white/90 font-medium bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-gradient-muga">
              ✨ Not sure where to start? Let our AI craft your perfect Assamese journey in seconds.
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 animate-slide-up mb-12" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/auth/signin"
              className="px-8 py-4 rounded-xl bg-[var(--tea-deep)] text-white font-bold hover:bg-[var(--forest-kaziranga)] transition-all transform hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              Sign In to RhinoRoam
            </Link>
            <Link
              href="/ai-trip-planner"
              data-testid="ai-planner-link"
              className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white border border-[var(--muga-gold)]/30 font-bold hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              AI Trip Planner
            </Link>
          </div>



          {/* Quick Stats */}
          <div
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 animate-slide-up"
            style={{ animationDelay: '0.5s' }}
          >
            {[
              { value: '35', label: 'Districts' },
              { value: '200+', label: 'Experiences' },
              { value: '500+', label: 'Local Hosts' },
              { value: '50+', label: 'Festivals' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* Experience Collections */}
      <section className="section-padding" style={{ background: 'var(--eri-cream)' }}>
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Curated <span className="text-gradient-tea">Collections</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              From the lush jungles of <strong>Kaziranga</strong> to the golden <strong>Tea Trails</strong> of Upper Assam,
              serene <strong>Brahmaputra River Journeys</strong>, authentic <strong>Tribal Immersions</strong> with the Mising
              and Bodo communities, exquisite <strong>Muga Silk Handloom Heritage</strong>, and off-the-beaten-path
              <strong> Hidden Gems</strong> — Assam offers a tapestry of experiences waiting to be discovered.
            </p>
          </div>

          {/* Icon Row - Visual Accents */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="flex flex-col items-center gap-2 opacity-80"
                title={collection.title}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${collection.color}15`, color: collection.color }}
                >
                  {collection.icon}
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  {collection.title}
                </span>
              </div>
            ))}
          </div>

          {/* View All Collections CTA */}
          <div className="text-center">
            <Link href="/collections" className="btn-primary">
              View All Collections
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="section-padding home-featured-experiences" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Unforgettable <span className="text-gradient-muga">Experiences</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Authentic adventures hosted by local communities
              </p>
            </div>
            <Link
              href="/experiences"
              className="btn-secondary mt-4 md:mt-0"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id
                  ? 'text-white shadow-lg'
                  : ''
                  }`}
                style={{
                  background: activeCategory === cat.id ? 'var(--gradient-tea)' : 'var(--bg-card)',
                  color: activeCategory === cat.id ? 'white' : 'var(--text-secondary)',
                  border: activeCategory === cat.id ? 'none' : '1px solid var(--border-light)'
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Experience Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExperiences.map((exp, index) => (
              <Link
                key={exp.id}
                href={`/experiences/${exp.slug}`}
                className={`experience-card group stagger-${(index % 6) + 1} animate-scale-in`}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="badge badge-muga">
                      {exp.category}
                    </span>
                    {exp.isFeatured && (
                      <span className="badge badge-verified">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                  <button
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      color: 'var(--text-muted)'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle save
                    }}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                    <MapPin className="w-4 h-4" />
                    {exp.location}, {exp.district}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-gradient-tea transition-colors">
                    {exp.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" style={{ color: 'var(--muga-gold)', fill: 'var(--muga-gold)' }} />
                      <span className="font-semibold">{exp.rating}</span>
                      <span style={{ color: 'var(--text-muted)' }}>({exp.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{exp.duration}</span>
                    </div>
                  </div>
                  {exp.price && (
                    <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border-light)' }}>
                      <span className="text-lg font-bold" style={{ color: 'var(--tea-deep)' }}>
                        ₹{exp.price.toLocaleString()}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}> / person</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Festivals Calendar Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="badge badge-festival mb-3">
                <Calendar className="w-4 h-4" />
                Live Calendar
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Festivals & <span className="text-gradient-muga">Celebrations</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Experience Assam&apos;s vibrant cultural calendar — from state festivities to intimate tribal ceremonies
              </p>
            </div>
            <Link href="/festivals" className="btn-secondary mt-4 md:mt-0">
              Full Calendar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {upcomingFestivals.slice(0, 8).map((festival, index) => (
              <div
                key={festival.id}
                className={`festival-card stagger-${(index % 4) + 1} animate-slide-up`}
              >
                <div className="flex items-start gap-4">
                  <div className="festival-month">
                    {festival.month}
                  </div>
                  <div className="flex-1">
                    <span
                      className={`badge mb-2 ${festival.type === 'state' ? 'badge-tea' :
                        festival.type === 'tribal' ? 'badge-tribal' :
                          festival.type === 'religious' ? 'badge-muga' :
                            'badge-river'
                        }`}
                    >
                      {festival.type === 'tribal' && festival.community
                        ? festival.community
                        : festival.type.charAt(0).toUpperCase() + festival.type.slice(1)}
                    </span>
                    <h3 className="font-semibold text-base mb-1">
                      {festival.name}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                      {festival.date}
                    </p>
                    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <MapPin className="w-3 h-3" />
                      {festival.location}
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>
                  {festival.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by District */}
      <section
        className="section-padding"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Explore by <span className="text-gradient-tea">District</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              35 districts, each with its own story to tell
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {districts.map((district, index) => (
              <Link
                key={district.id}
                href={`/districts/${district.slug}`}
                className={`experience-card group overflow-hidden stagger-${index + 1} animate-scale-in relative block`}
                style={{ backgroundColor: '#1A3C34' }} // Dark forest green fallback
              >
                <div className="relative h-40 w-full">
                  {/* Background Image - z-index 0 */}
                  <Image
                    src={district.image}
                    alt={district.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 z-0"
                  />

                  {/* Overlay Scrim - z-index 10 */}
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                    }}
                  />

                  {/* Text Content - z-index 20 */}
                  <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex flex-col justify-end items-start text-left">
                    <h3
                      className="font-bold text-lg mb-1"
                      style={{
                        color: 'white',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {district.name}
                    </h3>
                    <p
                      className="text-xs font-medium"
                      style={{
                        color: 'white',
                        opacity: 0.9,
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {district.experienceCount} experiences • {district.region} Assam
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/districts" className="btn-secondary">
              View All 35 Districts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community Hosts CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div
            className="heritage-card overflow-hidden"
            style={{ background: 'var(--gradient-river)' }}
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              <div>
                <span className="badge badge-muga mb-4">
                  <Users className="w-4 h-4" />
                  Become a Host
                </span>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Share Your Home,<br />
                  <span style={{ color: 'var(--muga-light)' }}>Share Your Story</span>
                </h2>
                <p className="text-white/80 mb-6">
                  Join 500+ community hosts across Assam. Turn your heritage,
                  skills, and local knowledge into meaningful experiences for
                  travelers from around the world.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/hosts/register" className="btn-primary" style={{ background: 'white', color: 'var(--tea-deep)' }}>
                    Start Hosting
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button className="btn-ghost" style={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                    <Play className="w-4 h-4" />
                    Watch Stories
                  </button>
                </div>
              </div>
              <div className="relative h-64 md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                  alt="Community Host"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-16"
        style={{ background: 'var(--bg-dark)', color: 'var(--text-inverse)' }}
      >
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo.png"
                  alt="RhinoRoam Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  unoptimized
                />
                <Image
                  src="/name-style.png"
                  alt="RhinoRoam"
                  width={120}
                  height={28}
                  className="object-contain invert"
                />
              </Link>
              <p className="text-sm" style={{ color: 'var(--brahma-mist)' }}>
                Connecting travelers with Assam&apos;s communities,
                heritage, and hidden wonders since 2024.
              </p>
            </div>

            {/* Footer links columns */}
            {[
              {
                title: 'Explore',
                links: ['Experiences', 'Collections', 'Districts', 'Festivals', 'Hidden Gems']
              },
              {
                title: 'Community',
                links: ['Become a Host', 'Local Guides', 'Artisans', 'Homestays', 'Success Stories']
              },
              {
                title: 'Support',
                links: ['Help Center', 'Safety', 'Contact Us', 'Feedback', 'Careers']
              }
            ].map((column) => (
              <div key={column.title}>
                <h4 className="font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={`/${link.toLowerCase().replace(' ', '-')}`}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'var(--brahma-mist)' }}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Gamusa border */}
          <div className="gamusa-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm" style={{ color: 'var(--brahma-mist)' }}>
                © 2026 RhinoRoam
              </p>
              <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--brahma-mist)' }}>
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <select
                    className="bg-transparent border-none text-sm"
                    style={{ color: 'var(--brahma-mist)' }}
                  >
                    <option value="en">English</option>
                    <option value="as">অসমীয়া</option>
                    <option value="hi">हिंदी</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
