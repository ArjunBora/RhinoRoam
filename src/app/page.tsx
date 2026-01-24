'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, MapPin, Calendar, Users, Compass, Mountain,
  TreePine, Waves, Tent, Camera, Star, ArrowRight,
  ChevronDown, Heart, Play, Sparkles, Leaf, Bird
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
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
    count: 12,
    color: 'var(--forest-kaziranga)',
    icon: <Bird className="w-6 h-6" />
  },
  {
    id: 'tea',
    title: 'Tea Trails',
    description: 'Heritage gardens & plantation stays',
    image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=600&q=80',
    count: 18,
    color: 'var(--tea-garden)',
    icon: <Leaf className="w-6 h-6" />
  },
  {
    id: 'river',
    title: 'River Journeys',
    description: 'Brahmaputra expeditions & island hopping',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    count: 8,
    color: 'var(--brahma-blue)',
    icon: <Waves className="w-6 h-6" />
  },
  {
    id: 'tribal',
    title: 'Tribal Immersions',
    description: 'Stay with Mising, Bodo, Karbi communities',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
    count: 24,
    color: 'var(--mekhela-red)',
    icon: <Tent className="w-6 h-6" />
  },
  {
    id: 'handloom',
    title: 'Handloom Heritage',
    description: 'Muga silk, Eri weaving workshops',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
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
  { id: '1', name: 'Kamrup Metro', slug: 'kamrup-metro', region: 'Central', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80', experienceCount: 45 },
  { id: '2', name: 'Golaghat', slug: 'golaghat', region: 'Central', image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=400&q=80', experienceCount: 23 },
  { id: '3', name: 'Majuli', slug: 'majuli', region: 'Central', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80', experienceCount: 18 },
  { id: '4', name: 'Sivasagar', slug: 'sivasagar', region: 'Upper', image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=400&q=80', experienceCount: 32 },
  { id: '5', name: 'Dibrugarh', slug: 'dibrugarh', region: 'Upper', image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=400&q=80', experienceCount: 28 }
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Navigation */}
      <nav
        className={`nav-header transition-all duration-300 ${isScrolled ? 'shadow-md' : 'bg-transparent border-transparent'
          }`}
        style={{
          background: isScrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none'
        }}
      >
        <div className="container-custom h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--gradient-tea)' }}
            >
              <span className="text-white font-bold text-lg">অ</span>
            </div>
            <span
              className="text-xl font-semibold"
              style={{ fontFamily: 'var(--font-heading)', color: isScrolled ? 'var(--text-primary)' : 'white' }}
            >
              RhinoRoam
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {['Explore', 'Experiences', 'Communities', 'Festivals', 'Plan Trip'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="nav-link"
                style={{ color: isScrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.9)' }}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-ghost" style={{ color: isScrolled ? 'var(--text-secondary)' : 'white' }}>
              For Hosts
            </button>
            <button className="btn-primary">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=80"
            alt="Assam Landscape"
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
            Connect with communities, explore hidden trails, and immerse yourself
            in the rich heritage of the Brahmaputra valley
          </p>

          {/* Search Box */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="search-hero mx-auto">
              <Search className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search experiences, places, festivals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button>
                <span className="hidden sm:inline">Explore</span>
                <ArrowRight className="w-5 h-5 sm:hidden" />
              </button>
            </div>
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
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Curated <span className="text-gradient-tea">Collections</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Handpicked experiences crafted by local communities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className={`experience-card group p-5 text-center stagger-${index + 1} animate-slide-up`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${collection.color}15`, color: collection.color }}
                >
                  {collection.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{collection.title}</h3>
                <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                  {collection.description}
                </p>
                <span
                  className="text-xs font-medium"
                  style={{ color: collection.color }}
                >
                  {collection.count} experiences
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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
                Experience Assam's vibrant cultural calendar — from state festivities to intimate tribal ceremonies
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
                className={`experience-card group overflow-hidden stagger-${index + 1} animate-scale-in`}
              >
                <div className="relative h-40">
                  <Image
                    src={district.image}
                    alt={district.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 50%)'
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-white mb-1">{district.name}</h3>
                    <p className="text-xs text-white/70">
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
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--gradient-muga)' }}
                >
                  <span className="text-white font-bold text-lg">অ</span>
                </div>
                <span
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  RhinoRoam
                </span>
              </Link>
              <p className="text-sm" style={{ color: 'var(--brahma-mist)' }}>
                Connecting travelers with Assam's communities,
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
                © 2026 RhinoRoam. Made with ❤️ in Assam
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
