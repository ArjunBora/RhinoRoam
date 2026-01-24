import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* ============================================
   ASSAM SEED DATA
   Sample data for AxomConnect platform
   ============================================ */

async function main() {
    console.log('🌱 Seeding Assam data...');

    // Clear existing data
    await prisma.experienceBooking.deleteMany();
    await prisma.experienceReview.deleteMany();
    await prisma.collectionExperience.deleteMany();
    await prisma.collection.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.festival.deleteMany();
    await prisma.communityHost.deleteMany();
    await prisma.district.deleteMany();

    console.log('✅ Cleared existing data');

    // ============================================
    // DISTRICTS
    // ============================================
    const districts = await Promise.all([
        // Upper Assam
        prisma.district.create({
            data: {
                name: 'Dibrugarh',
                nameAssamese: 'ডিব্ৰুগড়',
                slug: 'dibrugarh',
                region: 'UPPER_ASSAM',
                headquarters: 'Dibrugarh',
                description: 'The Tea City of India, known for its vast tea gardens and colonial heritage.',
                highlights: ['Tea Gardens', 'Heritage Bungalows', 'Brahmaputra River', 'Colonial Architecture'],
                specialties: ['Assam Tea', 'Oil Industry', 'Aviation History'],
            },
        }),
        prisma.district.create({
            data: {
                name: 'Sivasagar',
                nameAssamese: 'শিৱসাগৰ',
                slug: 'sivasagar',
                region: 'UPPER_ASSAM',
                headquarters: 'Sivasagar',
                description: 'The former capital of the Ahom Kingdom, rich in 600 years of history and monuments.',
                highlights: ['Rang Ghar', 'Talatal Ghar', 'Sivasagar Tank', 'Ahom Heritage'],
                specialties: ['Ahom Architecture', 'Historical Monuments', 'Tai-Ahom Culture'],
            },
        }),
        prisma.district.create({
            data: {
                name: 'Majuli',
                nameAssamese: 'মাজুলী',
                slug: 'majuli',
                region: 'UPPER_ASSAM',
                headquarters: 'Garamur',
                description: 'The world\'s largest river island and center of Vaishnavite culture with ancient Satras.',
                highlights: ['Satras', 'Mask Making', 'Mising Villages', 'River Island'],
                specialties: ['Sattriya Dance', 'Mask Crafts', 'Vaishnavite Culture'],
            },
        }),
        // Central Assam
        prisma.district.create({
            data: {
                name: 'Kamrup Metropolitan',
                nameAssamese: 'কামৰূপ মহানগৰ',
                slug: 'kamrup-metro',
                region: 'CENTRAL_ASSAM',
                headquarters: 'Guwahati',
                description: 'The gateway to Northeast India, home to Guwahati and the sacred Kamakhya Temple.',
                highlights: ['Kamakhya Temple', 'Brahmaputra River', 'Assam State Museum', 'Umananda Island'],
                specialties: ['Religious Tourism', 'Urban Culture', 'Gateway to Northeast'],
            },
        }),
        prisma.district.create({
            data: {
                name: 'Golaghat',
                nameAssamese: 'গোলাঘাট',
                slug: 'golaghat',
                region: 'CENTRAL_ASSAM',
                headquarters: 'Golaghat',
                description: 'Gateway to Kaziranga National Park, home to the one-horned rhinoceros.',
                highlights: ['Kaziranga National Park', 'One-horned Rhino', 'Wildlife Safari', 'Tea Gardens'],
                specialties: ['Wildlife Tourism', 'Conservation', 'Safari Experiences'],
            },
        }),
        // BTR
        prisma.district.create({
            data: {
                name: 'Kokrajhar',
                nameAssamese: 'কোকৰাঝাৰ',
                slug: 'kokrajhar',
                region: 'BTR',
                headquarters: 'Kokrajhar',
                description: 'The heart of Bodoland Territorial Region, showcasing vibrant Bodo culture.',
                highlights: ['Bodo Culture', 'Bagurumba Dance', 'Traditional Cuisine', 'Handloom'],
                specialties: ['Bodo Tribal Culture', 'Ethnic Dance', 'Traditional Silk'],
            },
        }),
        // Hill Districts
        prisma.district.create({
            data: {
                name: 'Karbi Anglong',
                nameAssamese: 'কাৰ্বি আংলং',
                slug: 'karbi-anglong',
                region: 'HILL_DISTRICTS',
                headquarters: 'Diphu',
                description: 'Scenic hill district home to the Karbi tribe with rich cultural heritage.',
                highlights: ['Hill Trekking', 'Karbi Culture', 'Waterfalls', 'Traditional Villages'],
                specialties: ['Karbi Dance', 'Hill Tourism', 'Tribal Festivals'],
            },
        }),
        prisma.district.create({
            data: {
                name: 'Dima Hasao',
                nameAssamese: 'ডিমা হাছাও',
                slug: 'dima-hasao',
                region: 'HILL_DISTRICTS',
                headquarters: 'Haflong',
                description: 'The Switzerland of East, featuring Assam\'s only hill station at Haflong.',
                highlights: ['Haflong Lake', 'Blue Mountains', 'Jatinga', 'Hill Station'],
                specialties: ['Hill Station Tourism', 'Dimasa Culture', 'Scenic Views'],
            },
        }),
    ]);

    console.log(`✅ Created ${districts.length} districts`);

    // ============================================
    // COMMUNITY HOSTS
    // ============================================
    const hosts = await Promise.all([
        prisma.communityHost.create({
            data: {
                districtId: districts[4].id, // Golaghat
                name: 'Kaziranga Eco Lodge',
                slug: 'kaziranga-eco-lodge',
                type: 'TOUR_OPERATOR',
                bio: 'Family-run eco-lodge with 12 years of experience in sustainable wildlife tourism. Our expert naturalists have deep local knowledge and are passionate about conservation.',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
                coverImage: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600&q=80',
                location: 'Kaziranga',
                languages: ['English', 'Hindi', 'Assamese'],
                specialties: ['Wildlife Safari', 'Eco-Tourism', 'Bird Watching'],
                verified: true,
                superhost: true,
                rating: 4.9,
                reviewCount: 567,
                yearsHosting: 12,
                responseTime: 'within 1 hour',
                responseRate: '100%',
            },
        }),
        prisma.communityHost.create({
            data: {
                districtId: districts[2].id, // Majuli
                name: 'Pranjal Saikia',
                slug: 'pranjal-saikia',
                type: 'GUIDE',
                bio: 'Born and raised in a Satra on Majuli Island. I offer unique experiences exploring the Vaishnavite culture, mask-making traditions, and the Mising tribal villages.',
                avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
                coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
                location: 'Majuli Island',
                community: 'Mising',
                languages: ['English', 'Assamese', 'Mising'],
                specialties: ['Satra Culture', 'Mask Making', 'Mising Village Tours'],
                verified: true,
                superhost: true,
                rating: 4.8,
                reviewCount: 189,
                yearsHosting: 8,
                responseTime: 'within 2 hours',
                responseRate: '98%',
            },
        }),
        prisma.communityHost.create({
            data: {
                districtId: districts[0].id, // Dibrugarh
                name: 'Mancotta Heritage Estate',
                slug: 'mancotta-heritage',
                type: 'TOUR_OPERATOR',
                bio: 'Third-generation tea planters offering heritage bungalow stays and authentic tea tourism experiences. Explore the world of Assam tea from plucking to tasting.',
                avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
                coverImage: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=600&q=80',
                location: 'Dibrugarh',
                languages: ['English', 'Hindi', 'Assamese'],
                specialties: ['Tea Tourism', 'Heritage Stays', 'Plantation Tours'],
                verified: true,
                superhost: true,
                rating: 4.9,
                reviewCount: 312,
                yearsHosting: 18,
                responseTime: 'within 1 hour',
                responseRate: '100%',
            },
        }),
        prisma.communityHost.create({
            data: {
                districtId: districts[5].id, // Kokrajhar
                name: 'Swmdwn Boro',
                slug: 'swmdwn-boro',
                type: 'HOMESTAY',
                bio: 'Welcome to my traditional Bodo homestay! I offer authentic cultural immersion experiences including Bagurumba dance lessons, Bodo cuisine cooking, and village tours.',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
                coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
                location: 'Kokrajhar',
                community: 'Bodo',
                languages: ['Bodo', 'Assamese', 'English', 'Hindi'],
                specialties: ['Bodo Culture', 'Bagurumba Dance', 'Traditional Cuisine'],
                verified: true,
                superhost: true,
                rating: 4.8,
                reviewCount: 98,
                yearsHosting: 6,
                responseTime: 'within 3 hours',
                responseRate: '97%',
            },
        }),
    ]);

    console.log(`✅ Created ${hosts.length} community hosts`);

    // ============================================
    // EXPERIENCES
    // ============================================
    const experiences = await Promise.all([
        prisma.experience.create({
            data: {
                hostId: hosts[0].id,
                districtId: districts[4].id,
                title: 'Kaziranga Safari: Track the One-Horned Rhino',
                slug: 'kaziranga-rhino-safari',
                tagline: 'Experience the thrill of spotting the majestic one-horned rhinoceros in their natural habitat',
                description: 'Embark on an unforgettable journey into the heart of Kaziranga National Park, a UNESCO World Heritage Site and home to two-thirds of the world\'s one-horned rhinoceros population.',
                category: 'WILDLIFE',
                subcategory: 'Safari',
                images: [
                    'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=1200&q=80',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
                ],
                duration: '2 Days / 1 Night',
                durationHours: 30,
                difficulty: 'EASY',
                groupSizeMin: 2,
                groupSizeMax: 6,
                languages: ['English', 'Hindi', 'Assamese'],
                price: 12000,
                priceType: 'PER_PERSON',
                highlights: ['Elephant Safari at dawn', 'Jeep Safari across ranges', 'Expert naturalist guide', 'Bird watching', 'Nature walk', 'Assamese dinner'],
                included: ['1 night accommodation', 'All meals', '2 Jeep safari permits', '1 Elephant safari', 'Park entry fees'],
                notIncluded: ['Transportation to Kaziranga', 'Video camera fees', 'Personal expenses', 'Travel insurance'],
                requirements: ['Minimum age: 5 years', 'Comfortable walking shoes', 'Neutral colored clothing'],
                bestSeason: 'November - April',
                sustainability: ['Carbon neutral', 'Local employment', 'Conservation contribution', 'Zero single-use plastic'],
                isFeatured: true,
                rating: 4.9,
                reviewCount: 567,
            },
        }),
        prisma.experience.create({
            data: {
                hostId: hosts[1].id,
                districtId: districts[2].id,
                title: 'Majuli Island: Living Heritage of the Satras',
                slug: 'majuli-satra-heritage',
                tagline: 'Immerse yourself in 500-year old Vaishnavite Satra culture',
                description: 'Discover the spiritual heart of Assam on the world\'s largest river island. Learn traditional mask-making, witness Sattriya dance, and stay with local Mising families.',
                category: 'TRIBAL',
                subcategory: 'Cultural Heritage',
                images: [
                    'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
                ],
                duration: '3 Days / 2 Nights',
                durationHours: 60,
                difficulty: 'EASY',
                groupSizeMin: 2,
                groupSizeMax: 8,
                languages: ['English', 'Assamese', 'Mising'],
                price: 8500,
                priceType: 'PER_PERSON',
                highlights: ['Mask Making Workshop', 'Satra Visit', 'Mising Village Stay', 'Sattriya Dance', 'Pottery Workshop'],
                included: ['2 nights accommodation', 'All meals', 'Ferry transfers', 'All workshops', 'Local guide'],
                notIncluded: ['Transportation to Jorhat', 'Personal expenses'],
                requirements: ['Respect local customs', 'Modest dress in Satras'],
                bestSeason: 'October - March',
                sustainability: ['Community tourism', 'Cultural preservation', 'Local artisan support'],
                isFeatured: true,
                rating: 4.8,
                reviewCount: 324,
            },
        }),
        prisma.experience.create({
            data: {
                hostId: hosts[2].id,
                districtId: districts[0].id,
                title: 'Tea Garden Stay & Plucking Experience',
                slug: 'tea-garden-experience',
                tagline: 'Stay in a heritage tea bungalow and learn the art of tea plucking',
                description: 'Experience 150 years of tea heritage at Mancotta, one of Assam\'s oldest tea estates. Stay in a colonial bungalow, pluck tea with workers, tour the factory, and enjoy high tea.',
                category: 'TEA',
                subcategory: 'Agri Tourism',
                images: [
                    'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=1200&q=80',
                ],
                duration: '2 Days / 1 Night',
                durationHours: 30,
                difficulty: 'EASY',
                groupSizeMin: 2,
                groupSizeMax: 4,
                languages: ['English', 'Hindi', 'Assamese'],
                price: 15000,
                priceType: 'PER_PERSON',
                highlights: ['Heritage Bungalow Stay', 'Tea Plucking', 'Factory Tour', 'High Tea Experience', 'Garden Walk'],
                included: ['1 night in heritage bungalow', 'All meals', 'Tea plucking experience', 'Factory tour', 'High tea', 'Tea tasting'],
                notIncluded: ['Transportation', 'Personal purchases'],
                requirements: ['Early morning wake-up for plucking', 'Comfortable shoes'],
                bestSeason: 'March - November',
                sustainability: ['Fair trade practices', 'Worker welfare', 'Organic farming'],
                isFeatured: true,
                rating: 4.9,
                reviewCount: 412,
            },
        }),
        prisma.experience.create({
            data: {
                hostId: hosts[3].id,
                districtId: districts[5].id,
                title: 'Bodo Cultural Immersion with Bagurumba Dance',
                slug: 'bodo-cultural-immersion',
                tagline: 'Experience the vibrant Bodo culture in the heart of BTR',
                description: 'Stay with a Bodo family and learn the graceful Bagurumba dance, try traditional Bodo cuisine, and participate in village festivities.',
                category: 'TRIBAL',
                subcategory: 'Cultural Experience',
                images: [
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
                ],
                duration: '2 Days / 1 Night',
                durationHours: 30,
                difficulty: 'EASY',
                groupSizeMin: 4,
                groupSizeMax: 10,
                languages: ['Bodo', 'Assamese', 'English', 'Hindi'],
                price: 5500,
                priceType: 'PER_PERSON',
                highlights: ['Bagurumba Dance Lesson', 'Traditional Cuisine', 'Handloom Visit', 'Village Stay', 'Rice Beer Brewing'],
                included: ['1 night homestay', 'All meals', 'Dance lessons', 'Handloom workshop', 'Village tour'],
                notIncluded: ['Transportation', 'Personal expenses'],
                requirements: ['Openness to new experiences', 'Comfortable clothes for dance'],
                bestSeason: 'October - April',
                sustainability: ['Community tourism', 'Cultural preservation', 'Direct income to families'],
                isNewlyAdded: true,
                rating: 4.6,
                reviewCount: 98,
            },
        }),
    ]);

    console.log(`✅ Created ${experiences.length} experiences`);

    // ============================================
    // FESTIVALS
    // ============================================
    const festivals = await Promise.all([
        prisma.festival.create({
            data: {
                name: 'Rongali Bihu',
                nameAssamese: 'ৰঙালী বিহু',
                slug: 'rongali-bihu',
                type: 'STATE',
                description: 'The Assamese New Year celebrated in mid-April, marking the onset of spring with music, dance, and feasting.',
                highlights: ['Bihu Dance', 'Husori Groups', 'Traditional Games', 'Festive Foods'],
                month: 4,
                isMajor: true,
                region: 'All Assam',
            },
        }),
        prisma.festival.create({
            data: {
                name: 'Bhogali Bihu',
                nameAssamese: 'ভোগালী বিহু',
                slug: 'bhogali-bihu',
                type: 'STATE',
                description: 'The harvest festival celebrated in January with community feasts and bonfire ceremonies (Meji).',
                highlights: ['Meji Bonfire', 'Community Feasts', 'Traditional Foods', 'Games'],
                month: 1,
                isMajor: true,
                region: 'All Assam',
            },
        }),
        prisma.festival.create({
            data: {
                name: 'Ali Aye Ligang',
                nameAssamese: 'আলি আয়ে লৃগাং',
                slug: 'ali-aye-ligang',
                type: 'TRIBAL',
                community: 'Mising',
                description: 'The spring festival of the Mising tribe marking the beginning of the sowing season.',
                highlights: ['Traditional Dance', 'Apong Rice Beer', 'Rituals', 'Community Feast'],
                month: 2,
                isMajor: true,
                region: 'Upper Assam',
            },
        }),
        prisma.festival.create({
            data: {
                name: 'Bwisagu',
                nameAssamese: 'বৈছাগু',
                slug: 'bwisagu',
                type: 'TRIBAL',
                community: 'Bodo',
                description: 'The Bodo New Year festival celebrated with the beautiful Bagurumba dance and traditional music.',
                highlights: ['Bagurumba Dance', 'Kherai Puja', 'Traditional Music', 'Community Feast'],
                month: 4,
                isMajor: true,
                region: 'BTR',
            },
        }),
        prisma.festival.create({
            data: {
                name: 'Ambubachi Mela',
                nameAssamese: 'অম্বুবাচী মেলা',
                slug: 'ambubachi-mela',
                type: 'RELIGIOUS',
                districtId: districts[3].id,
                description: 'Annual festival at Kamakhya Temple celebrating the goddess\'s menstrual cycle.',
                highlights: ['Religious Rituals', 'Tantric Practices', 'Pilgrim Gathering', 'Fair'],
                month: 6,
                location: 'Kamakhya Temple, Guwahati',
                isMajor: true,
                region: 'Central Assam',
            },
        }),
        prisma.festival.create({
            data: {
                name: 'Me-Dam-Me-Phi',
                nameAssamese: 'মে-ডাম-মে-ফি',
                slug: 'me-dam-me-phi',
                type: 'TRIBAL',
                community: 'Tai-Ahom',
                description: 'The Tai-Ahom festival honoring ancestors, held on January 31st.',
                highlights: ['Ancestor Worship', 'Traditional Rituals', 'Tai-Ahom Cuisine', 'Cultural Programs'],
                month: 1,
                isMajor: true,
                region: 'Upper Assam',
            },
        }),
        prisma.festival.create({
            data: {
                name: 'Rongker',
                nameAssamese: 'ৰংকেৰ',
                slug: 'rongker',
                type: 'TRIBAL',
                community: 'Karbi',
                description: 'The Karbi spring festival celebrating nature and agricultural prosperity.',
                highlights: ['Traditional Dance', 'Music', 'Rituals', 'Community Celebration'],
                month: 4,
                region: 'Hill Districts',
            },
        }),
        prisma.festival.create({
            data: {
                name: 'Jonbeel Mela',
                nameAssamese: 'জোনবীল মেলা',
                slug: 'jonbeel-mela',
                type: 'REGIONAL',
                description: 'Ancient barter fair where tribal communities exchange goods without money.',
                highlights: ['Barter Trading', 'Tribal Gathering', 'Cultural Exchange', 'Traditional Market'],
                month: 1,
                location: 'Jagiroad',
                region: 'Central Assam',
            },
        }),
    ]);

    console.log(`✅ Created ${festivals.length} festivals`);

    // ============================================
    // COLLECTIONS
    // ============================================
    const collections = await Promise.all([
        prisma.collection.create({
            data: {
                title: 'Wildlife Safaris',
                slug: 'wildlife',
                subtitle: 'Into the Wild',
                description: 'Track the one-horned rhino, spot Bengal tigers, and discover rare bird species',
                longDescription: 'Assam is home to some of India\'s most spectacular wildlife. From the UNESCO World Heritage Site of Kaziranga to the tiger-rich forests of Manas.',
                color: '#1B4D3E',
                heroImage: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=1200&q=80',
                order: 1,
                isFeatured: true,
            },
        }),
        prisma.collection.create({
            data: {
                title: 'Tea Trails',
                slug: 'tea',
                subtitle: 'Heritage Gardens',
                description: 'Stay in colonial bungalows, pluck tea leaves, and taste the finest Assam brews',
                longDescription: 'Assam produces over 50% of India\'s tea. Walk through century-old gardens and stay in heritage bungalows.',
                color: '#2D5016',
                heroImage: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=1200&q=80',
                order: 2,
                isFeatured: true,
            },
        }),
        prisma.collection.create({
            data: {
                title: 'Tribal Immersions',
                slug: 'tribal',
                subtitle: 'Living Cultures',
                description: 'Stay with Mising, Bodo, Karbi communities and experience their ancient traditions',
                longDescription: 'Assam is home to numerous indigenous tribes, each with distinct languages, customs, and traditions.',
                color: '#B71C1C',
                heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
                order: 3,
                isFeatured: true,
            },
        }),
    ]);

    console.log(`✅ Created ${collections.length} collections`);

    // Link experiences to collections
    await prisma.collectionExperience.create({
        data: {
            collectionId: collections[0].id,
            experienceId: experiences[0].id,
            order: 1,
            isFeatured: true,
        },
    });

    await prisma.collectionExperience.create({
        data: {
            collectionId: collections[1].id,
            experienceId: experiences[2].id,
            order: 1,
            isFeatured: true,
        },
    });

    await prisma.collectionExperience.create({
        data: {
            collectionId: collections[2].id,
            experienceId: experiences[1].id,
            order: 1,
            isFeatured: true,
        },
    });

    await prisma.collectionExperience.create({
        data: {
            collectionId: collections[2].id,
            experienceId: experiences[3].id,
            order: 2,
        },
    });

    console.log('✅ Linked experiences to collections');

    console.log('🌿 Seeding complete!');
}

main()
    .catch((e) => {
        console.error('Error seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
