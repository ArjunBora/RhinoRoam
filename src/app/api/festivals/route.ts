import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* ============================================
   GET /api/festivals
   List all festivals with filters
   ============================================ */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const month = searchParams.get('month');
        const year = searchParams.get('year');
        const type = searchParams.get('type');
        const community = searchParams.get('community');
        const region = searchParams.get('region');
        const search = searchParams.get('search');
        const upcoming = searchParams.get('upcoming');

        // Build where clause
        const where: Record<string, unknown> = {
            isActive: true,
        };

        if (month && month !== 'all') {
            where.month = parseInt(month);
        }

        if (type && type !== 'all') {
            where.type = type.toUpperCase();
        }

        if (community && community !== 'all') {
            where.community = community;
        }

        if (region && region !== 'all') {
            where.region = region;
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { nameAssamese: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        // If upcoming, filter by current month onwards
        if (upcoming === 'true') {
            const currentMonth = new Date().getMonth() + 1;
            where.month = { gte: currentMonth };
        }

        // Fetch festivals
        const festivals = await prisma.festival.findMany({
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
            },
            orderBy: { month: 'asc' },
        });

        // Group by month
        const groupedByMonth = festivals.reduce((acc, festival) => {
            const month = festival.month;
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(festival);
            return acc;
        }, {} as Record<number, unknown[]>);

        // Get unique communities for filter
        const communities = await prisma.festival.findMany({
            where: { isActive: true, community: { not: null } },
            select: { community: true },
            distinct: ['community'],
        });

        return NextResponse.json({
            success: true,
            data: festivals,
            grouped: groupedByMonth,
            filters: {
                communities: communities.map(c => c.community).filter(Boolean),
                types: ['STATE', 'TRIBAL', 'RELIGIOUS', 'REGIONAL', 'LOCAL', 'CULTURAL'],
                regions: ['Upper Assam', 'Central Assam', 'Lower Assam', 'BTR', 'Hill Districts', 'Barak Valley'],
            },
            total: festivals.length,
        });
    } catch (error) {
        console.error('Error fetching festivals:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch festivals' },
            { status: 500 }
        );
    }
}
