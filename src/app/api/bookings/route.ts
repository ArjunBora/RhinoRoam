import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* ============================================
   POST /api/bookings
   Create a new experience booking
   ============================================ */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const required = ['experienceId', 'guestName', 'guestEmail', 'guestPhone', 'guests', 'bookingDate', 'totalAmount'];
        for (const field of required) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Create booking
        const booking = await prisma.experienceBooking.create({
            data: {
                experienceId: body.experienceId,
                userId: body.userId || null,
                guestName: body.guestName,
                guestEmail: body.guestEmail,
                guestPhone: body.guestPhone,
                guests: body.guests,
                bookingDate: new Date(body.bookingDate),
                totalAmount: body.totalAmount,
                currency: body.currency || 'INR',
                specialRequests: body.specialRequests || null,
                status: 'PENDING',
                paymentStatus: 'PENDING',
            },
            include: {
                experience: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        host: {
                            select: {
                                name: true,
                                email: true,
                                phone: true,
                            },
                        },
                    },
                },
            },
        });

        // TODO: Send confirmation emails
        // - To guest
        // - To host

        // Generate booking reference
        const bookingRef = `AXC-${booking.id.slice(-8).toUpperCase()}`;

        return NextResponse.json({
            success: true,
            data: {
                ...booking,
                bookingRef,
            },
            message: 'Booking created successfully',
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create booking' },
            { status: 500 }
        );
    }
}

/* ============================================
   GET /api/bookings
   List bookings (for authenticated user)
   ============================================ */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const userId = searchParams.get('userId');
        const experienceId = searchParams.get('experienceId');
        const status = searchParams.get('status');

        if (!userId && !experienceId) {
            return NextResponse.json(
                { success: false, error: 'userId or experienceId is required' },
                { status: 400 }
            );
        }

        // Build where clause
        const where: Record<string, unknown> = {};

        if (userId) {
            where.userId = userId;
        }

        if (experienceId) {
            where.experienceId = experienceId;
        }

        if (status) {
            where.status = status.toUpperCase();
        }

        const bookings = await prisma.experienceBooking.findMany({
            where,
            include: {
                experience: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        images: true,
                        host: {
                            select: {
                                name: true,
                                slug: true,
                            },
                        },
                    },
                },
            },
            orderBy: { bookingDate: 'asc' },
        });

        return NextResponse.json({
            success: true,
            data: bookings,
            total: bookings.length,
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch bookings' },
            { status: 500 }
        );
    }
}
