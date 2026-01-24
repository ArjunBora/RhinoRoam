import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* ============================================
   GET /api/collections
   List all collections with featured experiences
   ============================================ */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const featured = searchParams.get('featured');

        // Build where clause
        const where: Record<string, unknown> = {
            isActive: true,
        };

        if (featured === 'true') {
            where.isFeatured = true;
        }

        const collections = await prisma.collection.findMany({
            where,
            include: {
                experiences: {
                    where: { isFeatured: true },
                    include: {
                        experience: {
                            select: {
                                id: true,
                                title: true,
                                slug: true,
                                tagline: true,
                                images: true,
                                price: true,
                                rating: true,
                                reviewCount: true,
                                duration: true,
                                district: {
                                    select: {
                                        name: true,
                                        slug: true,
                                    },
                                },
                            },
                        },
                    },
                    take: 4,
                    orderBy: { order: 'asc' },
                },
                _count: {
                    select: {
                        experiences: true,
                    },
                },
            },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json({
            success: true,
            data: collections.map(c => ({
                ...c,
                experienceCount: c._count.experiences,
                featuredExperiences: c.experiences.map(e => e.experience),
            })),
            total: collections.length,
        });
    } catch (error) {
        console.error('Error fetching collections:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch collections' },
            { status: 500 }
        );
    }
}
