import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* ============================================
   GET /api/districts
   List all districts with filters
   ============================================ */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const region = searchParams.get('region');
        const search = searchParams.get('search');

        // Build where clause
        const where: Record<string, unknown> = {
            isActive: true,
        };

        if (region && region !== 'all') {
            where.region = region.toUpperCase().replace(/ /g, '_');
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { nameAssamese: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { highlights: { has: search } },
            ];
        }

        // Fetch districts with counts
        const districts = await prisma.district.findMany({
            where,
            include: {
                _count: {
                    select: {
                        experiences: true,
                        communityHosts: true,
                        festivals: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });

        // Group by region
        const groupedByRegion = districts.reduce((acc, district) => {
            const region = district.region;
            if (!acc[region]) {
                acc[region] = [];
            }
            acc[region].push({
                ...district,
                experienceCount: district._count.experiences,
                hostCount: district._count.communityHosts,
                festivalCount: district._count.festivals,
            });
            return acc;
        }, {} as Record<string, unknown[]>);

        return NextResponse.json({
            success: true,
            data: districts.map(d => ({
                ...d,
                experienceCount: d._count.experiences,
                hostCount: d._count.communityHosts,
                festivalCount: d._count.festivals,
            })),
            grouped: groupedByRegion,
            total: districts.length,
        });
    } catch (error) {
        console.error('Error fetching districts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch districts' },
            { status: 500 }
        );
    }
}
