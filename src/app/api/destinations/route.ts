import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const region = searchParams.get("region");
        const limit = parseInt(searchParams.get("limit") || "10");
        const offset = parseInt(searchParams.get("offset") || "0");

        const where = {
            isActive: true,
            ...(region && { region }),
        };

        const [destinations, total] = await Promise.all([
            prisma.destination.findMany({
                where,
                take: limit,
                skip: offset,
                orderBy: { name: "asc" },
                include: {
                    _count: {
                        select: {
                            pois: true,
                            heritageTrails: true,
                            stays: true,
                            localGuides: true,
                        },
                    },
                },
            }),
            prisma.destination.count({ where }),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                items: destinations,
                total,
                page: Math.floor(offset / limit) + 1,
                pageSize: limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch destinations" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const destination = await prisma.destination.create({
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description,
                latitude: body.latitude,
                longitude: body.longitude,
                region: body.region,
                state: body.state,
                country: body.country || "India",
                heroImage: body.heroImage,
                images: body.images || [],
                howToReach: body.howToReach,
                bestTime: body.bestTime,
                highlights: body.highlights || [],
            },
        });

        return NextResponse.json({ success: true, data: destination }, { status: 201 });
    } catch (error) {
        console.error("Error creating destination:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create destination" },
            { status: 500 }
        );
    }
}
