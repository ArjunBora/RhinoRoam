import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const destinationId = searchParams.get("destinationId");
        const category = searchParams.get("category");
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = parseInt(searchParams.get("offset") || "0");

        const where = {
            isActive: true,
            ...(destinationId && { destinationId }),
            ...(category && { category: category as any }),
        };

        const [pois, total] = await Promise.all([
            prisma.pOI.findMany({
                where,
                take: limit,
                skip: offset,
                orderBy: { name: "asc" },
                include: {
                    destination: {
                        select: { name: true, slug: true },
                    },
                },
            }),
            prisma.pOI.count({ where }),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                items: pois,
                total,
                page: Math.floor(offset / limit) + 1,
                pageSize: limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching POIs:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch POIs" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const poi = await prisma.pOI.create({
            data: {
                destinationId: body.destinationId,
                name: body.name,
                slug: body.slug,
                category: body.category,
                description: body.description,
                culturalSignificance: body.culturalSignificance,
                latitude: body.latitude,
                longitude: body.longitude,
                images: body.images || [],
                audioGuideUrl: body.audioGuideUrl,
                videoUrl: body.videoUrl,
                timings: body.timings,
                entryFee: body.entryFee,
                dressCodes: body.dressCodes || [],
                restrictions: body.restrictions || [],
                safetyTips: body.safetyTips || [],
                culturalNorms: body.culturalNorms || [],
                healthAdvisories: body.healthAdvisories || [],
                environmentalRules: body.environmentalRules || [],
                averageVisitTime: body.averageVisitTime,
            },
        });

        return NextResponse.json({ success: true, data: poi }, { status: 201 });
    } catch (error) {
        console.error("Error creating POI:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create POI" },
            { status: 500 }
        );
    }
}
