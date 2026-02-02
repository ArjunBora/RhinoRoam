'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowRight, ChevronLeft, Bird, Leaf, Waves, Tent, Sparkles,
    Compass, Mountain, Camera, Heart
} from 'lucide-react';

/* ============================================
   CURATED COLLECTIONS
   Experience-Based Discovery
   ============================================ */

interface Collection {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    icon: React.ReactNode;
    color: string;
    gradient: string;
    image: string;
    experienceCount: number;
    featured: {
        title: string;
        slug: string;
        image: string;
        location: string;
    }[];
}

const collections: Collection[] = [
    {
        id: 'wildlife',
        title: 'Wildlife Safaris',
        subtitle: 'Into the Wild',
        description: 'Track the one-horned rhino, spot Bengal tigers, and discover rare bird species',
        longDescription: 'Assam is home to some of India\'s most spectacular wildlife. From the UNESCO World Heritage Site of Kaziranga, housing two-thirds of the world\'s one-horned rhinoceros, to the tiger-rich forests of Manas, experience the thrill of safari in the Brahmaputra valley\'s unique ecosystem.',
        icon: <Bird className="w-8 h-8" />,
        color: 'var(--forest-kaziranga)',
        gradient: 'linear-gradient(135deg, #1B4D3E 0%, #2E7D32 100%)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/One_horn_Rhinoceros_at_Kaziranga_national_park.jpg/1280px-One_horn_Rhinoceros_at_Kaziranga_national_park.jpg',
        experienceCount: 12,
        featured: [
            { title: 'Kaziranga Rhino Safari', slug: 'kaziranga-rhino-safari', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/One_horn_Rhinoceros_at_Kaziranga_national_park.jpg/400px-One_horn_Rhinoceros_at_Kaziranga_national_park.jpg', location: 'Golaghat' },
            { title: 'Manas Tiger Reserve', slug: 'manas-tiger-safari', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Manas_national_park.jpg/400px-Manas_national_park.jpg', location: 'Baksa' },
            { title: 'Dibru-Saikhowa Wild Horses', slug: 'dibru-wild-horses', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kamakhya_Temple%2C_Guwahati.jpg/400px-Kamakhya_Temple%2C_Guwahati.jpg', location: 'Tinsukia' },
        ]
    },
    {
        id: 'tea',
        title: 'Tea Trails',
        subtitle: 'Heritage Gardens',
        description: 'Stay in colonial bungalows, pluck tea leaves, and taste the finest Assam brews',
        longDescription: 'Assam produces over 50% of India\'s tea. Walk through century-old gardens, stay in heritage bungalows that once housed British planters, learn the art of tea plucking, and experience high tea overlooking endless green carpets of tea bushes.',
        icon: <Leaf className="w-8 h-8" />,
        color: 'var(--tea-garden)',
        gradient: 'linear-gradient(135deg, #2D5016 0%, #558B2F 100%)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muga_silk_weaving_in_Assam.jpg/1280px-Muga_silk_weaving_in_Assam.jpg',
        experienceCount: 18,
        featured: [
            { title: 'Mancotta Heritage Stay', slug: 'mancotta-heritage', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muga_silk_weaving_in_Assam.jpg/400px-Muga_silk_weaving_in_Assam.jpg', location: 'Dibrugarh' },
            { title: 'Tea Plucking Experience', slug: 'tea-plucking', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muga_silk_weaving_in_Assam.jpg/400px-Muga_silk_weaving_in_Assam.jpg', location: 'Jorhat' },
            { title: 'Tocklai Tea Research Tour', slug: 'tocklai-tour', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muga_silk_weaving_in_Assam.jpg/400px-Muga_silk_weaving_in_Assam.jpg', location: 'Jorhat' },
        ]
    },
    {
        id: 'river',
        title: 'River Journeys',
        subtitle: 'Brahmaputra Adventures',
        description: 'Cruise the mighty Brahmaputra, explore river islands, and spot Gangetic dolphins',
        longDescription: 'The Brahmaputra, one of the world\'s mightiest rivers, offers unique experiences from luxury cruises to traditional country boat expeditions. Visit river islands like Majuli, spot the endangered Gangetic river dolphin, and witness spectacular sunsets over the water.',
        icon: <Waves className="w-8 h-8" />,
        color: 'var(--brahma-blue)',
        gradient: 'linear-gradient(135deg, #0D3B4C 0%, #1E5F74 100%)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Umananda_Island.jpg/1280px-Umananda_Island.jpg',
        experienceCount: 8,
        featured: [
            { title: 'Brahmaputra Luxury Cruise', slug: 'brahmaputra-cruise', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Umananda_Island.jpg/400px-Umananda_Island.jpg', location: 'Guwahati - Majuli' },
            { title: 'Majuli Island Hopping', slug: 'majuli-island-hop', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kamalabari_Satra%2C_Majuli.jpg/400px-Kamalabari_Satra%2C_Majuli.jpg', location: 'Majuli' },
            { title: 'Dolphin Watching Safari', slug: 'dolphin-safari', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Umananda_Island.jpg/400px-Umananda_Island.jpg', location: 'Jorhat' },
        ]
    },
    {
        id: 'tribal',
        title: 'Tribal Immersions',
        subtitle: 'Living Cultures',
        description: 'Stay with Mising, Bodo, Karbi communities and experience their ancient traditions',
        longDescription: 'Assam is home to numerous indigenous tribes, each with distinct languages, customs, and traditions. Stay in traditional stilted houses, participate in community festivals, learn folk dances, and taste authentic tribal cuisine cooked with locally foraged ingredients.',
        icon: <Tent className="w-8 h-8" />,
        color: 'var(--mekhela-red)',
        gradient: 'linear-gradient(135deg, #B71C1C 0%, #C62828 100%)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bodo_woman.jpg/1280px-Bodo_woman.jpg',
        experienceCount: 24,
        featured: [
            { title: 'Mising Village Homestay', slug: 'mising-homestay', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bodo_woman.jpg/400px-Bodo_woman.jpg', location: 'Dhemaji' },
            { title: 'Bodo Cultural Immersion', slug: 'bodo-immersion', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bodo_woman.jpg/400px-Bodo_woman.jpg', location: 'Kokrajhar' },
            { title: 'Karbi Hill Village Trek', slug: 'karbi-trek', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Karbi_Anglong_Assam.jpg/400px-Karbi_Anglong_Assam.jpg', location: 'Karbi Anglong' },
        ]
    },
    {
        id: 'handloom',
        title: 'Handloom Heritage',
        subtitle: 'Golden Threads',
        description: 'Learn Muga silk weaving, visit Sualkuchi, and discover ancient textile traditions',
        longDescription: 'Assam\'s handloom tradition is legendary. The golden Muga silk, found nowhere else in the world, Eri silk, and Pat silk are woven into exquisite Mekhela Sadors. Visit master weavers, try your hand at the loom, and understand the cultural significance of textiles in Assamese life.',
        icon: <Sparkles className="w-8 h-8" />,
        color: 'var(--muga-gold)',
        gradient: 'linear-gradient(135deg, #C9A227 0%, #D4AF37 100%)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muga_silk_weaving_in_Assam.jpg/1280px-Muga_silk_weaving_in_Assam.jpg',
        experienceCount: 15,
        featured: [
            { title: 'Muga Silk Workshop', slug: 'muga-workshop', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muga_silk_weaving_in_Assam.jpg/400px-Muga_silk_weaving_in_Assam.jpg', location: 'Sualkuchi' },
            { title: 'Eri Silk Farm Visit', slug: 'eri-farm', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muga_silk_weaving_in_Assam.jpg/400px-Muga_silk_weaving_in_Assam.jpg', location: 'Kamrup' },
            { title: 'Traditional Loom Experience', slug: 'loom-experience', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muga_silk_weaving_in_Assam.jpg/400px-Muga_silk_weaving_in_Assam.jpg', location: 'Nagaon' },
        ]
    },
    {
        id: 'hidden',
        title: 'Hidden Gems',
        subtitle: 'Off the Beaten Path',
        description: 'Discover secret waterfalls, unexplored trails, and lesser-known cultural sites',
        longDescription: 'Beyond the famous destinations lie unexplored treasures. Secret waterfalls in Karbi Anglong, ancient ruins in Madan Kamdev, mysterious Jatinga, and the serene Haflong lake. These hidden gems offer authentic experiences away from tourist crowds.',
        icon: <Compass className="w-8 h-8" />,
        color: 'var(--earth-assam)',
        gradient: 'linear-gradient(135deg, #5D4037 0%, #795548 100%)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Haflong_Lake.jpg/1280px-Haflong_Lake.jpg',
        experienceCount: 32,
        featured: [
            { title: 'Haflong Lake & Hills', slug: 'haflong-experience', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Haflong_Lake.jpg/400px-Haflong_Lake.jpg', location: 'Dima Hasao' },
            { title: 'Madan Kamdev Ruins', slug: 'madan-kamdev', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rang_Ghar%2C_Sivasagar.jpg/400px-Rang_Ghar%2C_Sivasagar.jpg', location: 'Kamrup' },
            { title: 'Jatinga Mystery Tour', slug: 'jatinga-tour', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Haflong_Lake.jpg/400px-Haflong_Lake.jpg', location: 'Dima Hasao' },
        ]
    },
    {
        id: 'adventure',
        title: 'Adventure & Trekking',
        subtitle: 'Adrenaline Rush',
        description: 'Trek rainforests, raft river rapids, and explore cave systems',
        longDescription: 'For thrill-seekers, Assam offers diverse adventures. Trek through the Dehing Patkai rainforest, raft the rapids of Jia Bhoroli, explore limestone caves in Dima Hasao, or go mountain biking through tea gardens. Adventure awaits in every corner.',
        icon: <Mountain className="w-8 h-8" />,
        color: 'var(--brahma-deep)',
        gradient: 'linear-gradient(135deg, #0D3B4C 0%, #37474F 100%)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Karbi_Anglong_Assam.jpg/1280px-Karbi_Anglong_Assam.jpg',
        experienceCount: 14,
        featured: [
            { title: 'Dehing Patkai Trek', slug: 'dehing-trek', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Karbi_Anglong_Assam.jpg/400px-Karbi_Anglong_Assam.jpg', location: 'Tinsukia' },
            { title: 'River Rafting Adventure', slug: 'river-rafting', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Umananda_Island.jpg/400px-Umananda_Island.jpg', location: 'Sonitpur' },
            { title: 'Cave Exploration', slug: 'cave-exploration', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', location: 'Dima Hasao' },
        ]
    },
    {
        id: 'heritage',
        title: 'Heritage Walks',
        subtitle: '600 Years of History',
        description: 'Explore Ahom monuments, ancient temples, and historical sites',
        longDescription: 'Walk through 600 years of Ahom dynasty history at Sivasagar, explore the ancient temples of Tezpur, visit the UNESCO-nominated Maidams of Charaideo, and discover the multi-faith sites of Hajo. Each site tells a story of Assam\'s rich past.',
        icon: <Camera className="w-8 h-8" />,
        color: 'var(--tea-deep)',
        gradient: 'linear-gradient(135deg, #1B4D2E 0%, #2E7D32 100%)',
        image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=1200&q=80',
        experienceCount: 16,
        featured: [
            { title: 'Sivasagar Heritage Trail', slug: 'sivasagar-heritage', image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=400&q=80', location: 'Sivasagar' },
            { title: 'Charaideo Maidams Visit', slug: 'charaideo-maidams', image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=400&q=80', location: 'Charaideo' },
            { title: 'Hajo Pilgrimage Walk', slug: 'hajo-pilgrimage', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80', location: 'Kamrup' },
        ]
    }
];

export default function CollectionsPage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-20 relative overflow-hidden"
                style={{ background: 'var(--gradient-muga)' }}
            >
                <div className="absolute inset-0 tea-pattern-bg opacity-10" />
                <div className="container-custom relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <h1
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Curated <span className="text-tea-deep">Collections</span>
                    </h1>
                    <p className="text-lg text-white/90 max-w-2xl">
                        Discover Assam through thematic journeys crafted by local experts.
                        Each collection brings together the best experiences around a single theme.
                    </p>
                </div>
            </header>

            {/* Collections Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="space-y-16">
                        {collections.map((collection, index) => (
                            <div
                                key={collection.id}
                                className={`flex flex-col lg:flex-row gap-8 items-stretch ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Image Side */}
                                <div className="lg:w-1/2">
                                    <div className="relative h-80 lg:h-full min-h-[400px] rounded-3xl overflow-hidden group">
                                        <Image
                                            src={collection.image}
                                            alt={collection.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: `${collection.gradient}90` }}
                                        />
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                            <div
                                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                                                style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                                            >
                                                {collection.icon}
                                            </div>
                                            <span className="text-white/80 text-sm font-medium mb-2">{collection.subtitle}</span>
                                            <h2
                                                className="text-3xl md:text-4xl font-bold text-white mb-3"
                                                style={{ fontFamily: 'var(--font-heading)' }}
                                            >
                                                {collection.title}
                                            </h2>
                                            <p className="text-white/80 mb-4">{collection.description}</p>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="px-4 py-2 rounded-full text-sm font-medium"
                                                    style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                                                >
                                                    {collection.experienceCount} experiences
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="lg:w-1/2 flex flex-col">
                                    <div className="heritage-card p-8 flex-1">
                                        <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                                            {collection.longDescription}
                                        </p>

                                        <h3 className="font-semibold mb-4">Featured Experiences</h3>
                                        <div className="space-y-4 mb-8">
                                            {collection.featured.map((exp) => (
                                                <Link
                                                    key={exp.slug}
                                                    href={`/experiences/${exp.slug}`}
                                                    className="flex items-center gap-4 p-3 rounded-xl transition-all hover:shadow-md"
                                                    style={{ background: 'var(--bg-secondary)' }}
                                                >
                                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={exp.image}
                                                            alt={exp.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-sm truncate">{exp.title}</h4>
                                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{exp.location}</p>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                                                </Link>
                                            ))}
                                        </div>

                                        <Link
                                            href={`/experiences?collection=${collection.id}`}
                                            className="btn-primary inline-flex"
                                            style={{ background: collection.color }}
                                        >
                                            View All {collection.experienceCount} Experiences
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore More CTA */}
            <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container-custom text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--mekhela-red)' }} />
                    <h2
                        className="text-2xl md:text-3xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Can't decide? Let us help!
                    </h2>
                    <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Tell us your interests and travel dates, and we'll create a personalized
                        itinerary combining the best of Assam.
                    </p>
                    <Link href="/ai-trip-planner" className="btn-primary">
                        Plan My Trip
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
