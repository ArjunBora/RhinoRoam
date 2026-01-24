'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ChevronLeft, Plane, Train, Bus, Car, MapPin, Clock,
    IndianRupee, ArrowRight, Navigation, ExternalLink,
    AlertCircle, Check, Info
} from 'lucide-react';

/* ============================================
   HOW TO REACH PAGE
   Destination Roadmaps & Transportation Guide
   ============================================ */

// Major Destinations
const destinations = [
    { id: 'guwahati', name: 'Guwahati', label: 'Gateway City' },
    { id: 'kaziranga', name: 'Kaziranga', label: 'Wildlife Hub' },
    { id: 'majuli', name: 'Majuli Island', label: 'Cultural Heart' },
    { id: 'sivasagar', name: 'Sivasagar', label: 'Ahom Heritage' },
    { id: 'dibrugarh', name: 'Dibrugarh', label: 'Tea Capital' },
];

// Transportation data for each destination
const transportData: Record<string, {
    overview: string;
    byAir: {
        nearestAirport: string;
        code: string;
        distance: string;
        duration: string;
        airlines: string[];
        tips: string[];
    };
    byTrain: {
        nearestStation: string;
        majorTrains: string[];
        duration: string;
        tips: string[];
    };
    byBus: {
        fromGuwahati: { duration: string; cost: string; frequency: string };
        buses: string[];
        tips: string[];
    };
    bySelfDrive: {
        fromGuwahati: { distance: string; duration: string; route: string };
        roadConditions: string;
        tips: string[];
    };
    intraCity: {
        options: { mode: string; details: string; cost: string }[];
    };
}> = {
    guwahati: {
        overview: 'Guwahati is the gateway to Northeast India with excellent connectivity by air, rail, and road.',
        byAir: {
            nearestAirport: 'Lokpriya Gopinath Bordoloi International Airport',
            code: 'GAU',
            distance: '25 km from city center',
            duration: '30-45 mins',
            airlines: ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'AirAsia'],
            tips: ['Book early for better rates', 'Morning flights have clearer views of Brahmaputra'],
        },
        byTrain: {
            nearestStation: 'Guwahati Railway Station',
            majorTrains: [
                'Rajdhani Express (New Delhi - 24h)',
                'Northeast Express (New Delhi - 30h)',
                'Kanchenjunga Express (Kolkata - 20h)',
                'Saraighat Express (Kolkata - 17h)',
            ],
            duration: 'Varies by origin',
            tips: ['Book in advance during peak season', 'Tatkal opens 24h before journey'],
        },
        byBus: {
            fromGuwahati: { duration: '-', cost: '-', frequency: '-' },
            buses: ['Network Travels', 'ASTC (Govt)', 'Blue Hill Travels'],
            tips: ['Overnight buses available from Kolkata, Siliguri'],
        },
        bySelfDrive: {
            fromGuwahati: { distance: '-', duration: '-', route: '-' },
            roadConditions: 'Well-maintained NH27',
            tips: ['GPS essential', 'Avoid night driving'],
        },
        intraCity: {
            options: [
                { mode: 'Auto Rickshaw', details: 'Widely available, meter-based', cost: '₹10-20/km' },
                { mode: 'City Bus', details: 'ASTC network covers major areas', cost: '₹10-30' },
                { mode: 'Taxi/Cab', details: 'Ola, Uber, and local taxis', cost: '₹15-25/km' },
                { mode: 'Ferry', details: 'Brahmaputra crossing to North Guwahati', cost: '₹20-50' },
            ],
        },
    },
    kaziranga: {
        overview: 'Kaziranga is best accessed via Jorhat or Guwahati, with the park entrance at Kohora.',
        byAir: {
            nearestAirport: 'Jorhat Airport (Rowriah)',
            code: 'JRH',
            distance: '97 km from Kohora',
            duration: '2-2.5 hours',
            airlines: ['IndiGo', 'Air India'],
            tips: ['Limited flights - book early', 'Alternative: Guwahati airport (217 km)'],
        },
        byTrain: {
            nearestStation: 'Furkating Junction',
            majorTrains: [
                'Dibrugarh Rajdhani (New Delhi)',
                'Kamakhya-Dibrugarh Express',
                'Brahmaputra Mail (Dibrugarh)',
            ],
            duration: 'Varies by origin',
            tips: ['Furkating is 75 km from Kohora', 'Pre-book taxi from station'],
        },
        byBus: {
            fromGuwahati: { duration: '4-5 hours', cost: '₹250-400', frequency: 'Every 30 mins' },
            buses: ['ASTC', 'Network Travels', 'Private operators'],
            tips: ['Buses stop at Kohora on NH37', 'Morning buses recommended'],
        },
        bySelfDrive: {
            fromGuwahati: { distance: '217 km', duration: '4-5 hours', route: 'NH37 via Nagaon' },
            roadConditions: 'Well-maintained national highway',
            tips: ['Best time: Early morning', 'Watch for wildlife crossing near park', 'Fuel up before Nagaon'],
        },
        intraCity: {
            options: [
                { mode: 'Jeep Safari', details: 'Park-authorized vehicles only', cost: '₹2,500-3,500' },
                { mode: 'Elephant Safari', details: 'Morning rides (6-7 AM)', cost: '₹1,600-2,000' },
                { mode: 'Local Auto', details: 'For nearby attractions', cost: '₹50-100/trip' },
                { mode: 'Hotel Transport', details: 'Most hotels offer transfers', cost: 'Varies' },
            ],
        },
    },
    majuli: {
        overview: 'Majuli is a river island accessible only by ferry from Nimati Ghat near Jorhat.',
        byAir: {
            nearestAirport: 'Jorhat Airport (Rowriah)',
            code: 'JRH',
            distance: '14 km to Nimati Ghat',
            duration: '30 mins + 1 hour ferry',
            airlines: ['IndiGo', 'Air India'],
            tips: ['Limited daily flights', 'Book return tickets in advance'],
        },
        byTrain: {
            nearestStation: 'Jorhat Town Railway Station',
            majorTrains: [
                'Dibrugarh Rajdhani (New Delhi)',
                'Kamakhya-Dibrugarh Express',
                'Brahmaputra Mail',
            ],
            duration: 'Varies by origin',
            tips: ['25 km from Jorhat station to Nimati Ghat', 'Pre-book taxi'],
        },
        byBus: {
            fromGuwahati: { duration: '6-7 hours', cost: '₹300-500', frequency: 'Multiple daily' },
            buses: ['ASTC to Jorhat, then auto to Nimati Ghat'],
            tips: ['First ferry at 7 AM, last at 3 PM', 'Check schedules - vary by season'],
        },
        bySelfDrive: {
            fromGuwahati: { distance: '347 km', duration: '7-8 hours', route: 'NH37 via Kaziranga, then NH715' },
            roadConditions: 'Good roads till Jorhat',
            tips: ['No cars on ferry - park at Nimati Ghat', 'Motorcycle can be taken on ferry'],
        },
        intraCity: {
            options: [
                { mode: 'Bicycle', details: 'Best way to explore the island', cost: '₹100-200/day' },
                { mode: 'Auto Rickshaw', details: 'Limited, pre-negotiate rates', cost: '₹200-500/trip' },
                { mode: 'Rented Scooter', details: 'Available at Kamalabari', cost: '₹300-500/day' },
                { mode: 'Walking', details: 'Island is very walkable', cost: 'Free' },
            ],
        },
    },
    sivasagar: {
        overview: 'Sivasagar, the former Ahom capital, is well-connected by road from Jorhat and Dibrugarh.',
        byAir: {
            nearestAirport: 'Jorhat Airport (Rowriah)',
            code: 'JRH',
            distance: '60 km',
            duration: '1.5 hours',
            airlines: ['IndiGo', 'Air India'],
            tips: ['Alternative: Dibrugarh airport (80 km)', 'Pre-book taxi from airport'],
        },
        byTrain: {
            nearestStation: 'Simaluguri Junction',
            majorTrains: [
                'Dibrugarh Rajdhani (New Delhi)',
                'Brahmaputra Mail',
                'Kamakhya-Dibrugarh Express',
            ],
            duration: 'Varies by origin',
            tips: ['Simaluguri is 16 km from Sivasagar town', 'Auto-rickshaws available'],
        },
        byBus: {
            fromGuwahati: { duration: '6-7 hours', cost: '₹300-500', frequency: 'Multiple daily' },
            buses: ['ASTC', 'Network Travels', 'Private operators'],
            tips: ['Buses run via NH37 and Jorhat', 'Night buses available'],
        },
        bySelfDrive: {
            fromGuwahati: { distance: '370 km', duration: '7-8 hours', route: 'NH37 via Kaziranga and Jorhat' },
            roadConditions: 'Well-maintained national highway',
            tips: ['Petrol pumps available throughout', 'Can combine with Kaziranga visit'],
        },
        intraCity: {
            options: [
                { mode: 'Auto Rickshaw', details: 'Main mode of transport', cost: '₹20-100/trip' },
                { mode: 'Cycle Rickshaw', details: 'For short distances in town', cost: '₹10-30' },
                { mode: 'Rented Car', details: 'For visiting all monuments', cost: '₹1,500-2,500/day' },
                { mode: 'Walking', details: 'Monuments are spread out', cost: 'Free' },
            ],
        },
    },
    dibrugarh: {
        overview: 'Dibrugarh, the tea capital, has its own airport and is well-connected by rail and road.',
        byAir: {
            nearestAirport: 'Dibrugarh Airport (Chabua)',
            code: 'DIB',
            distance: '15 km from city',
            duration: '30 mins',
            airlines: ['IndiGo', 'Air India', 'SpiceJet'],
            tips: ['Daily flights from Delhi, Kolkata', 'Book early for peak tea season'],
        },
        byTrain: {
            nearestStation: 'Dibrugarh Town Railway Station',
            majorTrains: [
                'Dibrugarh Rajdhani (New Delhi - 36h)',
                'Brahmaputra Mail (Dibrugarh-Delhi)',
                'Kamakhya-Dibrugarh Express',
            ],
            duration: 'Varies by origin',
            tips: ['Major junction with good connectivity', 'AC coaches recommended'],
        },
        byBus: {
            fromGuwahati: { duration: '8-9 hours', cost: '₹400-600', frequency: 'Multiple daily' },
            buses: ['ASTC', 'Network Travels', 'Private Volvo services'],
            tips: ['Overnight buses available', 'Book Volvo for comfort'],
        },
        bySelfDrive: {
            fromGuwahati: { distance: '439 km', duration: '9-10 hours', route: 'NH37 via Kaziranga and Jorhat' },
            roadConditions: 'Well-maintained, scenic route through tea country',
            tips: ['Break journey at Kaziranga or Jorhat', 'Great tea garden views after Jorhat'],
        },
        intraCity: {
            options: [
                { mode: 'Auto Rickshaw', details: 'Widely available', cost: '₹15-20/km' },
                { mode: 'Taxi', details: 'Ola, local operators', cost: '₹20-30/km' },
                { mode: 'Rented Car', details: 'For tea garden visits', cost: '₹1,500-2,500/day' },
                { mode: 'Cycle', details: 'Town is cycle-friendly', cost: '₹100-150/day' },
            ],
        },
    },
};

export default function HowToReachPage() {
    const [selectedDestination, setSelectedDestination] = useState('guwahati');

    const data = transportData[selectedDestination];

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-12 relative overflow-hidden"
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

                    <div className="max-w-2xl">
                        <span className="badge badge-muga mb-4">
                            <Navigation className="w-4 h-4" />
                            Travel Guide
                        </span>
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            How to <span style={{ color: 'var(--muga-light)' }}>Reach</span>
                        </h1>
                        <p className="text-lg text-white/80">
                            Complete transportation guide: airports, trains, buses, and self-drive options
                        </p>
                    </div>
                </div>
            </header>

            {/* Destination Selector */}
            <section
                className="py-6 sticky top-0 z-40"
                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}
            >
                <div className="container-custom">
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                        {destinations.map((dest) => (
                            <button
                                key={dest.id}
                                onClick={() => setSelectedDestination(dest.id)}
                                className={`px-5 py-3 rounded-xl text-center min-w-[120px] transition-all ${selectedDestination === dest.id ? 'text-white' : ''
                                    }`}
                                style={{
                                    background: selectedDestination === dest.id ? 'var(--gradient-tea)' : 'var(--bg-card)',
                                    border: '1px solid var(--border-light)'
                                }}
                            >
                                <p className="font-semibold">{dest.name}</p>
                                <p className="text-xs opacity-70">{dest.label}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transportation Details */}
            <section className="section-padding">
                <div className="container-custom max-w-5xl">
                    {/* Overview */}
                    <div
                        className="p-6 rounded-2xl mb-8"
                        style={{ background: 'var(--bg-secondary)' }}
                    >
                        <p className="text-lg">{data.overview}</p>
                    </div>

                    {/* By Air */}
                    <div className="heritage-card p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: 'var(--gradient-river)' }}
                            >
                                <Plane className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">By Air</h2>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Fastest option for long distances</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">Nearest Airport</h3>
                                <p>{data.byAir.nearestAirport}</p>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    Code: {data.byAir.code} • {data.byAir.distance}
                                </p>

                                <h3 className="font-semibold mt-4 mb-2">Airlines</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.byAir.airlines.map((airline, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-full text-sm"
                                            style={{ background: 'var(--bg-secondary)' }}
                                        >
                                            {airline}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Tips</h3>
                                <ul className="space-y-2">
                                    {data.byAir.tips.map((tip, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--info)' }} />
                                            <span style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* By Train */}
                    <div className="heritage-card p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: 'var(--gradient-tea)' }}
                            >
                                <Train className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">By Train</h2>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Scenic and comfortable</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">Nearest Station</h3>
                                <p>{data.byTrain.nearestStation}</p>

                                <h3 className="font-semibold mt-4 mb-2">Major Trains</h3>
                                <ul className="space-y-1">
                                    {data.byTrain.majorTrains.map((train, idx) => (
                                        <li key={idx} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            • {train}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Tips</h3>
                                <ul className="space-y-2">
                                    {data.byTrain.tips.map((tip, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--info)' }} />
                                            <span style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="https://www.irctc.co.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 text-sm font-medium"
                                    style={{ color: 'var(--tea-garden)' }}
                                >
                                    Book on IRCTC <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* By Bus */}
                    <div className="heritage-card p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: 'var(--gradient-muga)' }}
                            >
                                <Bus className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">By Bus</h2>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Budget-friendly option</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                {selectedDestination !== 'guwahati' && (
                                    <>
                                        <h3 className="font-semibold mb-2">From Guwahati</h3>
                                        <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                                            <div className="p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                                                <p className="font-semibold">{data.byBus.fromGuwahati.duration}</p>
                                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Duration</p>
                                            </div>
                                            <div className="p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                                                <p className="font-semibold">{data.byBus.fromGuwahati.cost}</p>
                                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Cost</p>
                                            </div>
                                            <div className="p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                                                <p className="font-semibold">{data.byBus.fromGuwahati.frequency}</p>
                                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Frequency</p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <h3 className="font-semibold mb-2">Bus Operators</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.byBus.buses.map((bus, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-full text-sm"
                                            style={{ background: 'var(--bg-secondary)' }}
                                        >
                                            {bus}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Tips</h3>
                                <ul className="space-y-2">
                                    {data.byBus.tips.map((tip, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--info)' }} />
                                            <span style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* By Self Drive */}
                    <div className="heritage-card p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #424242 0%, #212121 100%)' }}
                            >
                                <Car className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Self Drive</h2>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Flexible & scenic</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                {selectedDestination !== 'guwahati' && (
                                    <>
                                        <h3 className="font-semibold mb-2">From Guwahati</h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                            <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                                                <p className="font-semibold">{data.bySelfDrive.fromGuwahati.distance}</p>
                                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Distance</p>
                                            </div>
                                            <div className="p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                                                <p className="font-semibold">{data.bySelfDrive.fromGuwahati.duration}</p>
                                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Drive Time</p>
                                            </div>
                                        </div>
                                        <p className="text-sm mb-2">
                                            <strong>Route:</strong> {data.bySelfDrive.fromGuwahati.route}
                                        </p>
                                    </>
                                )}
                                <p className="text-sm">
                                    <strong>Road Conditions:</strong> {data.bySelfDrive.roadConditions}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Tips</h3>
                                <ul className="space-y-2">
                                    {data.bySelfDrive.tips.map((tip, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--info)' }} />
                                            <span style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={`https://www.google.com/maps/dir/Guwahati/${destinations.find(d => d.id === selectedDestination)?.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-ghost mt-4 text-sm"
                                >
                                    <Navigation className="w-4 h-4" />
                                    Open in Maps
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Intra-City Transport */}
                    <div className="heritage-card p-6">
                        <h2 className="text-xl font-bold mb-4">Getting Around {destinations.find(d => d.id === selectedDestination)?.name}</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {data.intraCity.options.map((option, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-xl"
                                    style={{ background: 'var(--bg-secondary)' }}
                                >
                                    <h3 className="font-semibold mb-1">{option.mode}</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        {option.details}
                                    </p>
                                    <p className="text-sm mt-2 font-medium" style={{ color: 'var(--tea-garden)' }}>
                                        {option.cost}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
