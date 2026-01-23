import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;

        const destination = await prisma.destination.findUnique({
            where: { slug },
            include: {
                pois: {
                    where: { isActive: true },
                    orderBy: { name: "asc" },
                },
                heritageTrails: {
                    where: { isActive: true },
                    include: {
                        stops: {
                            include: { poi: true },
                            orderBy: { order: "asc" },
                        },
                    },
                },
                stays: {
                    where: { isActive: true },
                    orderBy: { rating: "desc" },
                },
                artisans: {
                    where: { isActive: true },
                },
                localGuides: {
                    where: { isActive: true },
                    orderBy: { rating: "desc" },
                },
                cbtVillages: {
                    where: { isActive: true },
                },
                seasonality: {
                    orderBy: { month: "asc" },
                },
                _count: {
                    select: {
                        pois: true,
                        heritageTrails: true,
                        stays: true,
                        localGuides: true,
                        articles: true,
                    },
                },
            },
        });

        if (!destination) {
            return NextResponse.json(
                { success: false, error: "Destination not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: destination });
    } catch (error) {
        console.error("Error fetching destination:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch destination" },
            { status: 500 }
        );
    }
}
