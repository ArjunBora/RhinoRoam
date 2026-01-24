import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* ============================================
   GET /api/hosts
   List all community hosts with filters
   ============================================ */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const type = searchParams.get('type');
        const district = searchParams.get('district');
        const community = searchParams.get('community');
        const verified = searchParams.get('verified');
        const superhost = searchParams.get('superhost');
        const search = searchParams.get('search');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Build where clause
        const where: Record<string, unknown> = {
            isActive: true,
        };

        if (type && type !== 'all') {
            where.type = type.toUpperCase();
        }

        if (district) {
            where.district = {
                slug: district,
            };
        }

        if (community) {
            where.community = community;
        }

        if (verified === 'true') {
            where.verified = true;
        }

        if (superhost === 'true') {
            where.superhost = true;
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { bio: { contains: search, mode: 'insensitive' } },
                { specialties: { has: search } },
            ];
        }

        // Fetch hosts
        const [hosts, total] = await Promise.all([
            prisma.communityHost.findMany({
                where,
                include: {
                    district: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            region: true,
                        },
                    },
                    _count: {
                        select: {
                            experiences: true,
                        },
                    },
                },
                orderBy: [
                    { superhost: 'desc' },
                    { verified: 'desc' },
                    { rating: 'desc' },
                ],
                skip: offset,
                take: limit,
            }),
            prisma.communityHost.count({ where }),
        ]);

        // Get unique communities for filter
        const communities = await prisma.communityHost.findMany({
            where: { isActive: true, community: { not: null } },
            select: { community: true },
            distinct: ['community'],
        });

        return NextResponse.json({
            success: true,
            data: hosts.map(host => ({
                ...host,
                experienceCount: host._count.experiences,
            })),
            filters: {
                communities: communities.map(c => c.community).filter(Boolean),
                types: ['GUIDE', 'HOMESTAY', 'ARTISAN', 'TOUR_OPERATOR', 'CHEF', 'NATURALIST', 'STORYTELLER'],
            },
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + hosts.length < total,
            },
        });
    } catch (error) {
        console.error('Error fetching hosts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch hosts' },
            { status: 500 }
        );
    }
}

/* ============================================
   POST /api/hosts
   Register as a community host
   ============================================ */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // TODO: Add authentication check

        const host = await prisma.communityHost.create({
            data: {
                userId: body.userId,
                districtId: body.districtId,
                name: body.name,
                slug: body.slug,
                type: body.type,
                bio: body.bio,
                avatar: body.avatar,
                coverImage: body.coverImage,
                location: body.location,
                community: body.community,
                languages: body.languages || [],
                specialties: body.specialties || [],
                phone: body.phone,
                email: body.email,
                whatsapp: body.whatsapp,
            },
            include: {
                district: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: host,
        });
    } catch (error) {
        console.error('Error creating host:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create host profile' },
            { status: 500 }
        );
    }
}
