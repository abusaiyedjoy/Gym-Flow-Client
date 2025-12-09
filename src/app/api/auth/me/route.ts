import { NextResponse } from "next/server";
import { getUserInfo } from "@/services/auth/getUserInfo";

export async function GET() {
    try {
        const userInfo = await getUserInfo();

        if (!userInfo) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            data: userInfo,
        });
    } catch (error: any) {
        console.error("API /auth/me error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to fetch user info" },
            { status: 500 }
        );
    }
}
