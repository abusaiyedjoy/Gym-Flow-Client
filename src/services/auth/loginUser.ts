/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { zodValidator } from "@/lib/zodValidator";
import { loginValidationSchema } from "@/zod/auth.validation";
import { serverFetch } from "@/lib/serverFetch";
import { redirect } from "next/navigation";
import { setCookie } from "./tokenHandaler";

export const loginUser = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const redirectTo = formData.get("redirect") || null;

        const payload = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        // 1️⃣ Validate form data
        const validation = zodValidator(payload, loginValidationSchema);
        if (!validation.success) return validation;

        const validatedPayload = validation.data;

        // 2️⃣ Send login request
        const res = await serverFetch.post("/auth/login", {
            body: JSON.stringify(validatedPayload),
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const errorResult = await res.json();
            throw new Error(errorResult.message || "Login failed");
        }

        const result = await res.json();

        // 3️⃣ Extract cookies from backend response headers
        const setCookieHeaders = res.headers.getSetCookie();

        if (!setCookieHeaders || setCookieHeaders.length === 0) {
            throw new Error("No authentication cookies received from server");
        }

        // Parse cookies properly
        let accessToken: string | null = null;
        let refreshToken: string | null = null;
        let accessTokenMaxAge = 15 * 60; // 15 minutes default
        let refreshTokenMaxAge = 7 * 24 * 60 * 60; // 7 days default

        setCookieHeaders.forEach((cookieString: string) => {
            // Parse cookie string: "name=value; Max-Age=900; Path=/; HttpOnly; Secure"
            const parts = cookieString.split(';').map(part => part.trim());
            const [nameValue] = parts;
            const [name, value] = nameValue.split('=');

            if (name === 'accessToken') {
                accessToken = value;
                const maxAgePart = parts.find(p => p.startsWith('Max-Age='));
                if (maxAgePart) {
                    accessTokenMaxAge = parseInt(maxAgePart.split('=')[1]) || accessTokenMaxAge;
                }
            } else if (name === 'refreshToken') {
                refreshToken = value;
                const maxAgePart = parts.find(p => p.startsWith('Max-Age='));
                if (maxAgePart) {
                    refreshTokenMaxAge = parseInt(maxAgePart.split('=')[1]) || refreshTokenMaxAge;
                }
            }
        });

        if (!accessToken || !refreshToken) {
            throw new Error("Authentication tokens not found in response");
        }

        // 4️⃣ Set cookies in Next.js
        await setCookie("accessToken", accessToken, {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: accessTokenMaxAge,
            sameSite: "strict",
            path: "/",
        });

        await setCookie("refreshToken", refreshToken, {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: refreshTokenMaxAge,
            sameSite: "strict",
            path: "/",
        });

        // 5️⃣ Check response success
        if (!result.success) {
            throw new Error(result.message || "Login failed");
        }

        // 6️⃣ Redirect to dashboard
        redirect(`/dashboard?loggedIn=true`);

    } catch (error: any) {
        // Allow Next.js redirects to work
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error("LOGIN ERROR:", error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Login failed. Please check your credentials and try again.",
        };
    }
};