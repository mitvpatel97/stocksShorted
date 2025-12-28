"use client";

import { TrendingDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
    lastUpdated: Date | null;
    secondsUntilRefresh: number;
    onRefresh: () => void;
    isLoading: boolean;
}

export function Header({ lastUpdated, secondsUntilRefresh, onRefresh, isLoading }: HeaderProps) {
    return (
        <header className="relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />

            <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Title section */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/25">
                            <TrendingDown className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                Short Interest Tracker
                            </h1>
                            <p className="text-zinc-400 text-sm md:text-base mt-1">
                                Top 25 Most Shorted Stocks
                            </p>
                        </div>
                    </div>

                    {/* Refresh section */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            {lastUpdated && (
                                <p className="text-zinc-500 text-xs">
                                    Last updated: {lastUpdated.toLocaleTimeString()}
                                </p>
                            )}
                            <p className="text-zinc-400 text-sm font-medium">
                                Next refresh in <span className="text-white font-mono">{secondsUntilRefresh}s</span>
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onRefresh}
                            disabled={isLoading}
                            className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700/50 text-white"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                            Refresh
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
