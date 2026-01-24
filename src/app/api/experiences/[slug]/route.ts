import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* ============================================
   GET /api/experiences/[slug]
   Get a single experience by slug
   ============================================ */

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const experience = await prisma.experience.findUnique({
            where: { slug },
            include: {
                host: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        type: true,
                        bio: true,
                        avatar: true,
                        coverImage: true,
                        location: true,
                        community: true,
                        languages: true,
                        specialties: true,
                        verified: true,
                        superhost: true,
                        rating: true,
                        reviewCount: true,
                        yearsHosting: true,
                        responseTime: true,
                        responseRate: true,
                    },
                },
                district: {
                    select: {
                        id: true,
                        name: true,
                        nameAssamese: true,
                        slug: true,
                        region: true,
                        description: true,
                    },
                },
                reviews: {
                    where: { status: 'APPROVED' },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });

        if (!experience) {
            return NextResponse.json(
                { success: false, error: 'Experience not found' },
                { status: 404 }
            );
        }

        // Fetch similar experiences
        const similarExperiences = await prisma.experience.findMany({
            where: {
                isActive: true,
                category: experience.category,
                id: { not: experience.id },
            },
            select: {
                id: true,
                title: true,
                slug: true,
                images: true,
                price: true,
                rating: true,
                duration: true,
                district: {
                    select: {
                        name: true,
                    },
                },
            },
            take: 4,
        });

        return NextResponse.json({
            success: true,
            data: {
                ...experience,
                similarExperiences,
            },
        });
    } catch (error) {
        console.error('Error fetching experience:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch experience' },
            { status: 500 }
        );
    }
}
