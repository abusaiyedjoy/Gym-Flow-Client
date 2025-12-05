"use client";

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { refreshToken } from '@/services/auth/refreshToken';

/**
 * Custom hook to handle automatic token refresh
 * Refreshes access token before it expires (every 14 minutes)
 */
export function useTokenRefresh() {
    const router = useRouter();

    const refreshAccessToken = useCallback(async () => {
        try {
            const success = await refreshToken();

            if (!success) {
                // If refresh fails, redirect to login
                console.error('Token refresh failed');
                router.push('/signin');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error refreshing token:', error);
            router.push('/signin');
            return false;
        }
    }, [router]);

    useEffect(() => {
        // Refresh token every 14 minutes (1 minute before expiry)
        const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds

        // Initial refresh check after 14 minutes
        const intervalId = setInterval(() => {
            refreshAccessToken();
        }, REFRESH_INTERVAL);

        // Also refresh on focus (when user comes back to tab)
        const handleFocus = () => {
            refreshAccessToken();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('focus', handleFocus);
        };
    }, [refreshAccessToken]);

    return { refreshAccessToken };
}
