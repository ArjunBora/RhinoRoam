'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    MapPin, Users, Mountain, TreePine, Compass, ArrowRight,
    ChevronLeft, Search, Filter, Grid, Map as MapIcon, X
} from 'lucide-react';

/* ============================================
   EXPLORE BY DISTRICT
   All 35 Districts of Assam
   ============================================ */

// Types
interface District {
    id: string;
    name: string;
    nameAssamese: string;
    slug: string;
    region: 'Upper Assam' | 'Central Assam' | 'Lower Assam' | 'Barak Valley' | 'BTR' | 'Hill Districts';
    headquarters: string;
    description: string;
    highlights: string[];
    experienceCount: number;
    hostCount: number;
    image: string;
    specialties: string[];
}

// Complete list of all 35 districts of Assam
const allDistricts: District[] = [
    // Upper Assam
    {
        id: '1',
        name: 'Dibrugarh',
        nameAssamese: 'ডিব্ৰুগড়',
        slug: 'dibrugarh',
        region: 'Upper Assam',
        headquarters: 'Dibrugarh',
        description: 'The tea capital of the world, known for vast tea gardens, vibrant nightlife, and gateway to Arunachal Pradesh.',
        highlights: ['Tea Garden Stays', 'Heritage Bungalows', 'River Islands'],
        experienceCount: 28,
        hostCount: 45,
        image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=600&q=80',
        specialties: ['Tea Tourism', 'Colonial Heritage', 'River Cruises']
    },
    {
        id: '2',
        name: 'Tinsukia',
        nameAssamese: 'তিনিচুকীয়া',
        slug: 'tinsukia',
        region: 'Upper Assam',
        headquarters: 'Tinsukia',
        description: 'Home to Dibru-Saikhowa National Park and the historic Digboi oilfields, Asia\'s oldest refinery.',
        highlights: ['Dibru-Saikhowa', 'Digboi Oil Museum', 'Wild Horses'],
        experienceCount: 18,
        hostCount: 22,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        specialties: ['Wildlife', 'Industrial Heritage', 'Adventure']
    },
    {
        id: '3',
        name: 'Sivasagar',
        nameAssamese: 'শিৱসাগৰ',
        slug: 'sivasagar',
        region: 'Upper Assam',
        headquarters: 'Sivasagar',
        description: 'The historic capital of the 600-year Ahom dynasty, rich with monuments, tanks, and cultural heritage.',
        highlights: ['Rang Ghar', 'Talatal Ghar', 'Sivasagar Tank', 'Charaideo Maidams'],
        experienceCount: 32,
        hostCount: 38,
        image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=600&q=80',
        specialties: ['Ahom Heritage', 'Archaeological Sites', 'History Tours']
    },
    {
        id: '4',
        name: 'Jorhat',
        nameAssamese: 'যোৰহাট',
        slug: 'jorhat',
        region: 'Upper Assam',
        headquarters: 'Jorhat',
        description: 'Cultural capital of Assam, gateway to Majuli island, and home to the oldest tea research station.',
        highlights: ['Gateway to Majuli', 'Tea Research Station', 'Tocklai'],
        experienceCount: 24,
        hostCount: 35,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        specialties: ['Tea Heritage', 'Cultural Shows', 'River Ferries']
    },
    {
        id: '5',
        name: 'Majuli',
        nameAssamese: 'মাজুলী',
        slug: 'majuli',
        region: 'Upper Assam',
        headquarters: 'Garamur',
        description: 'World\'s largest river island, a living museum of Vaishnavite culture with ancient Satras and mask-making traditions.',
        highlights: ['Ancient Satras', 'Mask Making', 'Mising Villages', 'Raas Leela'],
        experienceCount: 42,
        hostCount: 65,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
        specialties: ['Satra Culture', 'Mask Arts', 'Tribal Villages']
    },
    {
        id: '6',
        name: 'Lakhimpur',
        nameAssamese: 'লখিমপুৰ',
        slug: 'lakhimpur',
        region: 'Upper Assam',
        headquarters: 'North Lakhimpur',
        description: 'Known for Mising tribal culture, river islands, and the spectacular Subansiri river.',
        highlights: ['Mising Villages', 'River Islands', 'Subansiri River'],
        experienceCount: 15,
        hostCount: 24,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
        specialties: ['Tribal Culture', 'River Adventures', 'Wetlands']
    },
    {
        id: '7',
        name: 'Dhemaji',
        nameAssamese: 'ধেমাজি',
        slug: 'dhemaji',
        region: 'Upper Assam',
        headquarters: 'Dhemaji',
        description: 'Heart of Mising tribal land, famous for Ali Aye Ligang festival and stilted houses along the Brahmaputra.',
        highlights: ['Ali Aye Ligang', 'Stilted Houses', 'Tribal Cuisine'],
        experienceCount: 12,
        hostCount: 28,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        specialties: ['Mising Culture', 'Festivals', 'Tribal Homestays']
    },
    {
        id: '8',
        name: 'Charaideo',
        nameAssamese: 'চৰাইদেউ',
        slug: 'charaideo',
        region: 'Upper Assam',
        headquarters: 'Sonari',
        description: 'Home to the sacred Maidams (burial mounds) of Ahom kings, often called the Pyramids of Assam.',
        highlights: ['Ahom Maidams', 'Me-Dam-Me-Phi', 'Heritage Sites'],
        experienceCount: 8,
        hostCount: 12,
        image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=600&q=80',
        specialties: ['Ahom Heritage', 'Spiritual Sites', 'History']
    },
    // Central Assam
    {
        id: '9',
        name: 'Kamrup Metropolitan',
        nameAssamese: 'কামৰূপ মহানগৰ',
        slug: 'kamrup-metro',
        region: 'Central Assam',
        headquarters: 'Guwahati',
        description: 'Home to Guwahati, the gateway to Northeast India, with Kamakhya Temple, Brahmaputra riverfront, and modern amenities.',
        highlights: ['Kamakhya Temple', 'Brahmaputra Cruise', 'Assam State Museum'],
        experienceCount: 55,
        hostCount: 120,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
        specialties: ['Religious Tourism', 'River Cruises', 'Urban Heritage']
    },
    {
        id: '10',
        name: 'Kamrup',
        nameAssamese: 'কামৰূপ',
        slug: 'kamrup',
        region: 'Central Assam',
        headquarters: 'Amingaon',
        description: 'The ancient seat of the Kamarupa kingdom, known for Sualkuchi silk weaving and Hajo\'s multi-faith pilgrimage sites.',
        highlights: ['Sualkuchi Weaving', 'Hajo Pilgrimage', 'Madan Kamdev'],
        experienceCount: 35,
        hostCount: 58,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        specialties: ['Silk Weaving', 'Religious Sites', 'Ancient Temples']
    },
    {
        id: '11',
        name: 'Golaghat',
        nameAssamese: 'গোলাঘাট',
        slug: 'golaghat',
        region: 'Central Assam',
        headquarters: 'Golaghat',
        description: 'Gateway to Kaziranga National Park, home of the one-horned rhinoceros and rich biodiversity.',
        highlights: ['Kaziranga Safari', 'One-Horned Rhino', 'Tea Gardens'],
        experienceCount: 38,
        hostCount: 52,
        image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
        specialties: ['Wildlife Safari', 'Conservation', 'Nature Lodges']
    },
    {
        id: '12',
        name: 'Nagaon',
        nameAssamese: 'নগাঁও',
        slug: 'nagaon',
        region: 'Central Assam',
        headquarters: 'Nagaon',
        description: 'Historical heartland with Laokhowa Wildlife Sanctuary and traditional arts.',
        highlights: ['Laokhowa Sanctuary', 'Bordowa Satra', 'Rice Fields'],
        experienceCount: 18,
        hostCount: 25,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        specialties: ['Wildlife', 'Satra Culture', 'Agriculture']
    },
    {
        id: '13',
        name: 'Morigaon',
        nameAssamese: 'মৰিগাঁও',
        slug: 'morigaon',
        region: 'Central Assam',
        headquarters: 'Morigaon',
        description: 'Known for the unique Jonbeel Mela barter fair and Tiwa tribal heritage.',
        highlights: ['Jonbeel Mela', 'Tiwa Villages', 'Pobitora Wildlife'],
        experienceCount: 14,
        hostCount: 18,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        specialties: ['Barter Trade', 'Tribal Culture', 'Wildlife']
    },
    {
        id: '14',
        name: 'Hojai',
        nameAssamese: 'হোজাই',
        slug: 'hojai',
        region: 'Central Assam',
        headquarters: 'Sankardev Nagar',
        description: 'A newer district with diverse communities and traditional culture.',
        highlights: ['Cultural Diversity', 'Local Markets', 'Tea Gardens'],
        experienceCount: 8,
        hostCount: 12,
        image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=600&q=80',
        specialties: ['Tea Tourism', 'Local Crafts', 'Markets']
    },
    // Lower Assam
    {
        id: '15',
        name: 'Barpeta',
        nameAssamese: 'বৰপেটা',
        slug: 'barpeta',
        region: 'Lower Assam',
        headquarters: 'Barpeta',
        description: 'Spiritual heart of Vaishnavism, home to Barpeta Satra and the grand Doul Utsav celebrations.',
        highlights: ['Barpeta Satra', 'Doul Festival', 'Manas Buffer'],
        experienceCount: 22,
        hostCount: 32,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        specialties: ['Vaishnavite Culture', 'Festivals', 'Satras']
    },
    {
        id: '16',
        name: 'Nalbari',
        nameAssamese: 'নলবাৰী',
        slug: 'nalbari',
        region: 'Lower Assam',
        headquarters: 'Nalbari',
        description: 'Known for traditional arts, crafts, and the beautiful Nalbari Town.',
        highlights: ['Local Crafts', 'Cultural Events', 'Wetlands'],
        experienceCount: 10,
        hostCount: 15,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        specialties: ['Handicrafts', 'Local Culture', 'Bird Watching']
    },
    {
        id: '17',
        name: 'Baksa',
        nameAssamese: 'বাক্সা',
        slug: 'baksa',
        region: 'Lower Assam',
        headquarters: 'Mushalpur',
        description: 'Part of Manas Tiger Reserve, with Bodo tribal culture and pristine forests.',
        highlights: ['Manas National Park', 'Bodo Villages', 'Forest Trails'],
        experienceCount: 16,
        hostCount: 24,
        image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
        specialties: ['Wildlife', 'Bodo Culture', 'Eco-tourism']
    },
    {
        id: '18',
        name: 'Bongaigaon',
        nameAssamese: 'বঙাইগাঁও',
        slug: 'bongaigaon',
        region: 'Lower Assam',
        headquarters: 'Bongaigaon',
        description: 'Industrial town with easy access to Manas and traditional culture.',
        highlights: ['Gateway to Manas', 'Local Industries', 'Markets'],
        experienceCount: 8,
        hostCount: 12,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        specialties: ['Transit Hub', 'Local Markets', 'Industry Tours']
    },
    {
        id: '19',
        name: 'Goalpara',
        nameAssamese: 'গোৱালপাৰা',
        slug: 'goalpara',
        region: 'Lower Assam',
        headquarters: 'Goalpara',
        description: 'Historic confluence point with Rabha tribal culture and ancient ruins.',
        highlights: ['Rabha Villages', 'Surya Pahar', 'River Confluence'],
        experienceCount: 12,
        hostCount: 18,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
        specialties: ['Tribal Culture', 'Archaeological Sites', 'River Views']
    },
    {
        id: '20',
        name: 'Dhubri',
        nameAssamese: 'ধুবুৰী',
        slug: 'dhubri',
        region: 'Lower Assam',
        headquarters: 'Dhubri',
        description: 'Westernmost district with the confluence of three rivers and rich multi-cultural heritage.',
        highlights: ['River Confluence', 'Gurdwara', 'Char Areas'],
        experienceCount: 10,
        hostCount: 14,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
        specialties: ['River Tourism', 'Multi-faith Sites', 'Char Culture']
    },
    {
        id: '21',
        name: 'South Salmara-Mankachar',
        nameAssamese: 'দক্ষিণ শালমাৰা মানকাচৰ',
        slug: 'south-salmara-mankachar',
        region: 'Lower Assam',
        headquarters: 'Hatsingimari',
        description: 'Border district with unique riverine culture and local traditions.',
        highlights: ['River Islands', 'Border Culture', 'Local Crafts'],
        experienceCount: 6,
        hostCount: 8,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
        specialties: ['River Life', 'Border Tourism', 'Local Markets']
    },
    // BTR (Bodoland Territorial Region)
    {
        id: '22',
        name: 'Kokrajhar',
        nameAssamese: 'কোকৰাঝাৰ',
        slug: 'kokrajhar',
        region: 'BTR',
        headquarters: 'Kokrajhar',
        description: 'Heart of Bodoland with Bodo tribal culture, Bagurumba dance, and part of Manas ecosystem.',
        highlights: ['Bodo Culture', 'Bagurumba Dance', 'Manas Gateway'],
        experienceCount: 18,
        hostCount: 28,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        specialties: ['Bodo Heritage', 'Tribal Festivals', 'Wildlife']
    },
    {
        id: '23',
        name: 'Chirang',
        nameAssamese: 'চিৰাং',
        slug: 'chirang',
        region: 'BTR',
        headquarters: 'Kajalgaon',
        description: 'Part of Manas Biosphere with diverse wildlife and Bodo villages.',
        highlights: ['Manas Wildlife', 'Bodo Villages', 'Forest Treks'],
        experienceCount: 12,
        hostCount: 16,
        image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
        specialties: ['Wildlife', 'Eco-tourism', 'Tribal Stay']
    },
    {
        id: '24',
        name: 'Udalguri',
        nameAssamese: 'উদালগুৰি',
        slug: 'udalguri',
        region: 'BTR',
        headquarters: 'Udalguri',
        description: 'Picturesque district with tea gardens at the foothills of Bhutan.',
        highlights: ['Tea Gardens', 'Bhutan Border', 'Hill Views'],
        experienceCount: 10,
        hostCount: 14,
        image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=600&q=80',
        specialties: ['Tea Tourism', 'Border Area', 'Nature Walks']
    },
    {
        id: '25',
        name: 'Tamulpur',
        nameAssamese: 'তামুলপুৰ',
        slug: 'tamulpur',
        region: 'BTR',
        headquarters: 'Tamulpur',
        description: 'Newer district carved from Baksa, with diverse tribal communities.',
        highlights: ['Tribal Villages', 'Local Culture', 'Nature'],
        experienceCount: 6,
        hostCount: 10,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
        specialties: ['Tribal Culture', 'Rural Tourism', 'Nature']
    },
    // Hill Districts
    {
        id: '26',
        name: 'Karbi Anglong',
        nameAssamese: 'কাৰ্বি আংলং',
        slug: 'karbi-anglong',
        region: 'Hill Districts',
        headquarters: 'Diphu',
        description: 'Largest district with Karbi tribal culture, hills, waterfalls, and unique traditions.',
        highlights: ['Karbi Culture', 'Rongker Festival', 'Waterfalls', 'Hills'],
        experienceCount: 22,
        hostCount: 35,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        specialties: ['Tribal Heritage', 'Hill Trekking', 'Festivals']
    },
    {
        id: '27',
        name: 'West Karbi Anglong',
        nameAssamese: 'পশ্চিম কাৰ্বি আংলং',
        slug: 'west-karbi-anglong',
        region: 'Hill Districts',
        headquarters: 'Hamren',
        description: 'Scenic hill district with Karbi villages, forests, and the Kopili river.',
        highlights: ['Hill Villages', 'Kopili River', 'Forest Trails'],
        experienceCount: 10,
        hostCount: 15,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        specialties: ['Hill Tourism', 'River Trails', 'Tribal Culture']
    },
    {
        id: '28',
        name: 'Dima Hasao',
        nameAssamese: 'ডিমা হাছাও',
        slug: 'dima-hasao',
        region: 'Hill Districts',
        headquarters: 'Haflong',
        description: 'The Switzerland of the East with Haflong lake, Dimasa culture, and scenic beauty.',
        highlights: ['Haflong Lake', 'Jatinga', 'Blue Mountains', 'Dimasa Culture'],
        experienceCount: 16,
        hostCount: 22,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        specialties: ['Hill Station', 'Lake Tourism', 'Adventure']
    },
    // Barak Valley
    {
        id: '29',
        name: 'Cachar',
        nameAssamese: 'কাছাৰ',
        slug: 'cachar',
        region: 'Barak Valley',
        headquarters: 'Silchar',
        description: 'Heart of Barak Valley with rich Bengali culture, wetlands, and the historic Khaspur ruins.',
        highlights: ['Silchar City', 'Khaspur Ruins', 'Wetlands'],
        experienceCount: 18,
        hostCount: 28,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
        specialties: ['Bengali Culture', 'History', 'Wetlands']
    },
    {
        id: '30',
        name: 'Hailakandi',
        nameAssamese: 'হাইলাকান্দি',
        slug: 'hailakandi',
        region: 'Barak Valley',
        headquarters: 'Hailakandi',
        description: 'Scenic district with tea gardens, wetlands, and diverse communities.',
        highlights: ['Tea Gardens', 'Wetlands', 'Local Culture'],
        experienceCount: 8,
        hostCount: 12,
        image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=600&q=80',
        specialties: ['Tea Tourism', 'Nature', 'Local Heritage']
    },
    {
        id: '31',
        name: 'Karimganj',
        nameAssamese: 'কৰিমগঞ্জ',
        slug: 'karimganj',
        region: 'Barak Valley',
        headquarters: 'Karimganj',
        description: 'Border district with Bangladesh, known for trade and multi-cultural heritage.',
        highlights: ['Bangladesh Border', 'River Trade', 'Local Markets'],
        experienceCount: 10,
        hostCount: 14,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
        specialties: ['Border Tourism', 'Trade Culture', 'Bengali Heritage']
    },
    // Additional Districts
    {
        id: '32',
        name: 'Darrang',
        nameAssamese: 'দৰং',
        slug: 'darrang',
        region: 'Central Assam',
        headquarters: 'Mangaldai',
        description: 'Historic district with Orang National Park, known for rhinos and river dolphins.',
        highlights: ['Orang National Park', 'River Dolphins', 'Tea Gardens'],
        experienceCount: 14,
        hostCount: 20,
        image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
        specialties: ['Wildlife', 'Tea Tourism', 'River Safari']
    },
    {
        id: '33',
        name: 'Sonitpur',
        nameAssamese: 'শোণিতপুৰ',
        slug: 'sonitpur',
        region: 'Central Assam',
        headquarters: 'Tezpur',
        description: 'Cultural hub with ancient temples, Kaziranga entry, and the beautiful city of Tezpur.',
        highlights: ['Tezpur City', 'Kaziranga Entry', 'Ancient Temples', 'Nameri'],
        experienceCount: 28,
        hostCount: 42,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
        specialties: ['Heritage', 'Wildlife', 'Adventure']
    },
    {
        id: '34',
        name: 'Biswanath',
        nameAssamese: 'বিশ্বনাথ',
        slug: 'biswanath',
        region: 'Central Assam',
        headquarters: 'Biswanath Chariali',
        description: 'Scenic district with Kaziranga extension, tea gardens, and river islands.',
        highlights: ['Kaziranga Extension', 'Tea Gardens', 'River Islands'],
        experienceCount: 12,
        hostCount: 18,
        image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
        specialties: ['Wildlife', 'Tea Tourism', 'River Safari']
    },
    {
        id: '35',
        name: 'Bajali',
        nameAssamese: 'বজালী',
        slug: 'bajali',
        region: 'Lower Assam',
        headquarters: 'Pathsala',
        description: 'Newest district of Assam, known for educational institutions and local culture.',
        highlights: ['Educational Hub', 'Local Culture', 'Markets'],
        experienceCount: 6,
        hostCount: 10,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        specialties: ['Education', 'Local Heritage', 'Markets']
    }
];

// Regions for filtering
const regions = ['All Regions', 'Upper Assam', 'Central Assam', 'Lower Assam', 'Barak Valley', 'BTR', 'Hill Districts'];

export default function DistrictsPage() {
    const [selectedRegion, setSelectedRegion] = useState('All Regions');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

    // Filter districts
    const filteredDistricts = allDistricts.filter(district => {
        const matchesRegion = selectedRegion === 'All Regions' || district.region === selectedRegion;
        const matchesSearch = !searchQuery ||
            district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            district.nameAssamese.includes(searchQuery) ||
            district.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
            district.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesRegion && matchesSearch;
    });

    // Group by region
    const districtsByRegion = filteredDistricts.reduce((acc, district) => {
        if (!acc[district.region]) {
            acc[district.region] = [];
        }
        acc[district.region].push(district);
        return acc;
    }, {} as Record<string, District[]>);

    // Get region color
    const getRegionColor = (region: string) => {
        switch (region) {
            case 'Upper Assam': return 'var(--tea-deep)';
            case 'Central Assam': return 'var(--brahma-blue)';
            case 'Lower Assam': return 'var(--forest-kaziranga)';
            case 'Barak Valley': return 'var(--earth-assam)';
            case 'BTR': return 'var(--mekhela-red)';
            case 'Hill Districts': return 'var(--muga-gold)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-20 relative overflow-hidden"
                style={{ background: 'var(--gradient-tea)' }}
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

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="badge badge-muga mb-4">
                                <MapPin className="w-4 h-4" />
                                All 35 Districts
                            </span>
                            <h1
                                className="text-4xl md:text-5xl font-bold text-white mb-4"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Explore <span style={{ color: 'var(--muga-light)' }}>Assam</span>
                            </h1>
                            <p className="text-lg text-white/80 max-w-2xl">
                                From the tea gardens of Upper Assam to the hills of Dima Hasao —
                                discover the unique character of each district
                            </p>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-2 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${viewMode === 'grid' ? 'bg-white text-tea-deep' : 'text-white'
                                    }`}
                                style={{ color: viewMode === 'grid' ? 'var(--tea-deep)' : 'white' }}
                            >
                                <Grid className="w-4 h-4" />
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${viewMode === 'map' ? 'bg-white' : 'text-white'
                                    }`}
                                style={{ color: viewMode === 'map' ? 'var(--tea-deep)' : 'white' }}
                            >
                                <MapIcon className="w-4 h-4" />
                                Map
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filters */}
            <section className="py-6 sticky top-0 z-40" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}>
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search districts, attractions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-12 pr-10"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <X className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                </button>
                            )}
                        </div>

                        {/* Region Pills */}
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto">
                            {regions.map(region => {
                                const count = region === 'All Regions'
                                    ? allDistricts.length
                                    : allDistricts.filter(d => d.region === region).length;
                                return (
                                    <button
                                        key={region}
                                        onClick={() => setSelectedRegion(region)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedRegion === region ? 'text-white shadow-lg' : ''
                                            }`}
                                        style={{
                                            background: selectedRegion === region ? getRegionColor(region) : 'var(--bg-card)',
                                            border: '1px solid var(--border-light)',
                                            color: selectedRegion === region ? 'white' : getRegionColor(region)
                                        }}
                                    >
                                        {region.replace(' Assam', '')} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Districts Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    {filteredDistricts.length === 0 ? (
                        <div className="text-center py-20">
                            <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                            <h3 className="text-xl font-semibold mb-2">No districts found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search</p>
                        </div>
                    ) : selectedRegion === 'All Regions' ? (
                        // Grouped by region view
                        <div className="space-y-16">
                            {Object.entries(districtsByRegion).map(([region, districts]) => (
                                <div key={region}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className="w-4 h-12 rounded-full"
                                            style={{ background: getRegionColor(region) }}
                                        />
                                        <div>
                                            <h2
                                                className="text-2xl font-bold"
                                                style={{ fontFamily: 'var(--font-heading)' }}
                                            >
                                                {region}
                                            </h2>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                {districts.length} districts
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                        {districts.map((district) => (
                                            <DistrictCard key={district.id} district={district} regionColor={getRegionColor(region)} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Flat grid for filtered region
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredDistricts.map((district) => (
                                <DistrictCard key={district.id} district={district} regionColor={getRegionColor(district.region)} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding-sm" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '35', label: 'Districts', icon: <MapPin className="w-6 h-6" /> },
                            { value: '500+', label: 'Experiences', icon: <Compass className="w-6 h-6" /> },
                            { value: '800+', label: 'Local Hosts', icon: <Users className="w-6 h-6" /> },
                            { value: '6', label: 'Unique Regions', icon: <Mountain className="w-6 h-6" /> }
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="heritage-card p-6 text-center"
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    style={{ background: 'var(--bg-secondary)', color: 'var(--tea-deep)' }}
                                >
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--tea-deep)' }}>{stat.value}</div>
                                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// District Card Component
function DistrictCard({ district, regionColor }: { district: District; regionColor: string }) {
    return (
        <Link
            href={`/districts/${district.slug}`}
            className="experience-card group overflow-hidden"
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
                <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: regionColor }}
                >
                    {district.region.replace(' Assam', '')}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-lg text-white">{district.name}</h3>
                    <p className="text-xs text-white/70">{district.nameAssamese}</p>
                </div>
            </div>

            <div className="p-4">
                <p
                    className="text-sm mb-3 line-clamp-2"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {district.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                    {district.highlights.slice(0, 2).map((highlight, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 rounded-full text-xs"
                            style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                        >
                            {highlight}
                        </span>
                    ))}
                </div>

                <div
                    className="flex items-center justify-between pt-3 text-sm"
                    style={{ borderTop: '1px solid var(--border-light)' }}
                >
                    <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Compass className="w-4 h-4" />
                        {district.experienceCount} experiences
                    </div>
                    <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Users className="w-4 h-4" />
                        {district.hostCount} hosts
                    </div>
                </div>
            </div>
        </Link>
    );
}
