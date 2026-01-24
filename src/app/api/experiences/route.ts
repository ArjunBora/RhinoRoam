import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* ============================================
   GET /api/experiences
   List all experiences with filters
   ============================================ */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const category = searchParams.get('category');
        const district = searchParams.get('district');
        const collection = searchParams.get('collection');
        const featured = searchParams.get('featured');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const search = searchParams.get('search');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');
        const sortBy = searchParams.get('sortBy') || 'featured';

        // Build where clause
        const where: Record<string, unknown> = {
            isActive: true,
        };

        if (category && category !== 'all') {
            where.category = category.toUpperCase();
        }

        if (district) {
            where.district = {
                slug: district,
            };
        }

        if (featured === 'true') {
            where.isFeatured = true;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) {
                (where.price as Record<string, number>).gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                (where.price as Record<string, number>).lte = parseFloat(maxPrice);
            }
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { tagline: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Build orderBy
        let orderBy: Record<string, string> = {};
        switch (sortBy) {
            case 'price-low':
                orderBy = { price: 'asc' };
                break;
            case 'price-high':
                orderBy = { price: 'desc' };
                break;
            case 'rating':
                orderBy = { rating: 'desc' };
                break;
            case 'reviews':
                orderBy = { reviewCount: 'desc' };
                break;
            case 'newest':
                orderBy = { createdAt: 'desc' };
                break;
            default:
                orderBy = { isFeatured: 'desc' };
        }

        // Fetch experiences
        const [experiences, total] = await Promise.all([
            prisma.experience.findMany({
                where,
                include: {
                    host: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            avatar: true,
                            verified: true,
                            superhost: true,
                            rating: true,
                        },
                    },
                    district: {
                        select: {
                            id: true,
                            name: true,
                            nameAssamese: true,
                            slug: true,
                            region: true,
                        },
                    },
                },
                orderBy,
                skip: offset,
                take: limit,
            }),
            prisma.experience.count({ where }),
        ]);

        return NextResponse.json({
            success: true,
            data: experiences,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + experiences.length < total,
            },
        });
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch experiences' },
            { status: 500 }
        );
    }
}

/* ============================================
   POST /api/experiences
   Create a new experience (host only)
   ============================================ */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // TODO: Add authentication check for host

        const experience = await prisma.experience.create({
            data: {
                hostId: body.hostId,
                districtId: body.districtId,
                title: body.title,
                slug: body.slug,
                tagline: body.tagline,
                description: body.description,
                category: body.category,
                subcategory: body.subcategory,
                images: body.images || [],
                duration: body.duration,
                durationHours: body.durationHours,
                difficulty: body.difficulty || 'EASY',
                groupSizeMin: body.groupSizeMin || 1,
                groupSizeMax: body.groupSizeMax || 10,
                languages: body.languages || [],
                price: body.price,
                priceType: body.priceType || 'PER_PERSON',
                highlights: body.highlights || [],
                included: body.included || [],
                notIncluded: body.notIncluded || [],
                requirements: body.requirements || [],
                itinerary: body.itinerary,
                bestSeason: body.bestSeason,
                sustainability: body.sustainability || [],
            },
            include: {
                host: true,
                district: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: experience,
        });
    } catch (error) {
        console.error('Error creating experience:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create experience' },
            { status: 500 }
        );
    }
}
