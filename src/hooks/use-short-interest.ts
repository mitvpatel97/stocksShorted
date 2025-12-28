"use client";

import { useState, useEffect, useCallback } from "react";
import { ShortInterestStock } from "@/lib/data";

interface UseShortInterestReturn {
    data: ShortInterestStock[];
    isLoading: boolean;
    error: string | null;
    lastUpdated: Date | null;
    refetch: () => Promise<void>;
    secondsUntilRefresh: number;
}

const REFRESH_INTERVAL = 60; // seconds

export function useShortInterest(): UseShortInterestReturn {
    const [data, setData] = useState<ShortInterestStock[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(REFRESH_INTERVAL);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch("/api/short-interest");

            if (!response.ok) {
                throw new Error("Failed to fetch short interest data");
            }

            const result = await response.json();
            setData(result.data);
            setLastUpdated(new Date());
            setSecondsUntilRefresh(REFRESH_INTERVAL);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsUntilRefresh((prev) => {
                if (prev <= 1) {
                    fetchData();
                    return REFRESH_INTERVAL;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [fetchData]);

    return {
        data,
        isLoading,
        error,
        lastUpdated,
        refetch: fetchData,
        secondsUntilRefresh,
    };
}
