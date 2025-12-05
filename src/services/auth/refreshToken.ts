/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getCookie, setCookie } from "./tokenHandaler";

/**
 * Refresh the access token using the refresh token
 * Returns true if successful, false otherwise
 */
export const refreshToken = async (): Promise<boolean> => {
    try {
        // Get the current refresh token from cookies
        const currentRefreshToken = await getCookie("refreshToken");

        if (!currentRefreshToken) {
            console.error("No refresh token found");
            return false;
        }

        // Send refresh token request to backend
        const res = await serverFetch.post("/auth/refresh-token", {
            body: JSON.stringify({ refreshToken: currentRefreshToken }),
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            console.error("Token refresh failed");
            return false;
        }

        const result = await res.json();

        if (!result.success || !result.data?.accessToken) {
            console.error("Invalid refresh token response");
            return false;
        }

        // Extract new tokens from response
        const newAccessToken = result.data.accessToken;
        const newRefreshToken = result.data.refreshToken || currentRefreshToken;

        // Parse cookies from response headers if available
        const setCookieHeaders = res.headers.getSetCookie();
        let accessTokenMaxAge = 15 * 60; // 15 minutes default
        let refreshTokenMaxAge = 7 * 24 * 60 * 60; // 7 days default

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookieString: string) => {
                const parts = cookieString.split(';').map(part => part.trim());
                const [nameValue] = parts;
                const [name] = nameValue.split('=');

                if (name === 'accessToken') {
                    const maxAgePart = parts.find(p => p.startsWith('Max-Age='));
                    if (maxAgePart) {
                        accessTokenMaxAge = parseInt(maxAgePart.split('=')[1]) || accessTokenMaxAge;
                    }
                } else if (name === 'refreshToken') {
                    const maxAgePart = parts.find(p => p.startsWith('Max-Age='));
                    if (maxAgePart) {
                        refreshTokenMaxAge = parseInt(maxAgePart.split('=')[1]) || refreshTokenMaxAge;
                    }
                }
            });
        }

        // Set new access token
        await setCookie("accessToken", newAccessToken, {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: accessTokenMaxAge,
            sameSite: "strict",
            path: "/",
        });

        // Update refresh token if a new one was provided
        if (newRefreshToken !== currentRefreshToken) {
            await setCookie("refreshToken", newRefreshToken, {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: refreshTokenMaxAge,
                sameSite: "strict",
                path: "/",
            });
        }

        return true;
    } catch (error: any) {
        console.error("Token refresh error:", error.message || error);
        return false;
    }
};
