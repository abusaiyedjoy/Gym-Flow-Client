/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { UserInfo } from "@/types/userInfo";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandaler";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            return null;
        }

        if (!accessToken.includes('.') || accessToken.split('.').length !== 3) {
            console.error("Invalid token format detected");
            // Delete malformed cookie to prevent loop
            const { deleteCookie } = await import("./tokenHandaler");
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            return null;
        }

        let userInfoFromToken: any = null;

        try {
            const jwtSecret = process.env.JWT_ACCESS_SECRET;

            if (!jwtSecret) {
                console.error("JWT_ACCESS_SECRET is not defined in environment variables");
                // Delete invalid cookie to prevent loop
                const { deleteCookie } = await import("./tokenHandaler");
                await deleteCookie("accessToken");
                return null;
            }

            const decoded = jwt.verify(
                accessToken,
                jwtSecret
            ) as JwtPayload & { userId?: string };

            userInfoFromToken = {
                id: decoded.userId || "",
                name: decoded.name || "Unknown User",
                email: decoded.email || "",
                role: decoded.role || "MEMBER",
            };

            console.log("Token decoded successfully:", { id: userInfoFromToken.id, role: userInfoFromToken.role });
        } catch (jwtError: any) {
            console.error("JWT verification failed:", jwtError.message);
            // Token is invalid, delete it to prevent infinite loop
            const { deleteCookie } = await import("./tokenHandaler");
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            return null;
        }

        // -----------------------------------------------------
        // 3️⃣ Fetch extended user info from backend
        // -----------------------------------------------------
        let response;

        try {
            response = await serverFetch.get("/auth/me", {
                cache: "no-store", // Changed from force-cache to no-store for fresh data
            });

            if (!response.ok) {
                console.error("Failed to fetch user info from backend:", response.status);
                // If backend call fails, return token data as fallback
                return userInfoFromToken;
            }
        } catch (fetchError) {
            console.error("Error fetching user info:", fetchError);
            // Return token data as fallback
            return userInfoFromToken;
        }

        const result = await response.json();

        if (!result.success || !result.data) {
            console.log("Backend returned unsuccessful response, using token data");
            return userInfoFromToken;
        }

        // -----------------------------------------------------
        // 4️⃣ Normalize /auth/me response
        // -----------------------------------------------------
        const data = result.data;

        const normalizedUser: UserInfo = {
            id: data.id || userInfoFromToken.id,
            name: data.name || userInfoFromToken.name,
            email: data.email || userInfoFromToken.email,
            role: data.role || userInfoFromToken.role,

            phone: data.phone ?? null,
            profileImage: data.profileImage ?? null,
            isActive: !!data.isActive,
            isVerified: !!data.isVerified,
            needPasswordChange: !!data.needPasswordChange,

            // Nested relations
            admin: data.admin ?? null,
            trainer: data.trainer ?? null,
            member: data.member ?? null,

            // IDs for easier access
            adminId: data.admin?.id ?? null,
            trainerId: data.trainer?.id ?? null,
            memberId: data.member?.id ?? null,
        };

        console.log("User info retrieved successfully:", { id: normalizedUser.id, role: normalizedUser.role });

        // -----------------------------------------------------
        // 5️⃣ Return merged data
        // -----------------------------------------------------
        return normalizedUser;

    } catch (error: any) {
        console.error("getUserInfo ERROR:", error.message || error);

        // Clean up cookies on any error to prevent infinite loops
        try {
            const { deleteCookie } = await import("./tokenHandaler");
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
        } catch (cleanupError) {
            console.error("Failed to cleanup cookies:", cleanupError);
        }

        // Return null instead of dummy data to indicate auth failure
        return null;
    }
};