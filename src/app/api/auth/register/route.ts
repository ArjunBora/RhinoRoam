import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        // MOCK REGISTRATION
        // Skip DB check and creation
        /*
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || email.split("@")[0],
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });
        */

        // Mock success response
        const user = {
            id: "mock-user-id",
            email,
            name: name || email.split("@")[0],
            createdAt: new Date(),
        };

        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to register user" },
            { status: 500 }
        );
    }
}
