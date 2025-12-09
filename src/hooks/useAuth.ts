"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { serverFetch } from "@/lib/serverFetch";

interface DecodedToken {
    userId: string;
    email: string;
    role: string;
    name?: string;
    iat?: number;
    exp?: number;
}

interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: string;
    member?: {
        id: string;
        employeeId: string;
        // ... other member fields
    } | null;
    trainer?: {
        id: string;
        employeeId: string;
        // ... other trainer fields
    } | null;
    admin?: {
        id: string;
        // ... other admin fields
    } | null;
}

export function useAuth() {
    const [userId, setUserId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [memberId, setMemberId] = useState<string | null>(null);
    const [trainerId, setTrainerId] = useState<string | null>(null);
    const [adminId, setAdminId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const accessToken = Cookies.get("accessToken");

                if (!accessToken) {
                    setLoading(false);
                    return;
                }

                // Decode JWT to get basic info
                const decoded = jwtDecode<DecodedToken>(accessToken);
                setUserId(decoded.userId);
                setUserRole(decoded.role);
                setUserEmail(decoded.email);
                setUserName(decoded.name || null);

                // Fetch full user info from API to get member/trainer/admin ID
                try {
                    const response = await serverFetch.get("/auth/me", {
                                    cache: "no-store", // Changed from force-cache to no-store for fresh data
                                });

                    if (response.ok) {
                        const result = await response.json();
                        const userData: UserInfo = result.data;

                        // Set role-specific IDs
                        if (userData.member?.id) {
                            setMemberId(userData.member.id);
                            console.log("Member ID set:", userData.member.id);
                        }
                        if (userData.trainer?.id) {
                            setTrainerId(userData.trainer.id);
                        }
                        if (userData.admin?.id) {
                            setAdminId(userData.admin.id);
                        }
                    } else {
                        console.warn("Failed to fetch user info from API, using token data only");
                    }
                } catch (fetchError) {
                    console.error("Error fetching user info:", fetchError);
                    // Continue with token data only
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return {
        userId,
        userRole,
        userEmail,
        userName,
        memberId,
        trainerId,
        adminId,
        loading,
        isAuthenticated: !!userId,
    };
}
