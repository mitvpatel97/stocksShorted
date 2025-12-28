"use client";

import { Header } from "@/components/header";
import { StatsCards } from "@/components/stats-cards";
import { StockTable } from "@/components/stock-table";
import { useShortInterest } from "@/hooks/use-short-interest";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { data, isLoading, error, lastUpdated, refetch, secondsUntilRefresh } = useShortInterest();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,40,0.3),rgba(0,0,0,0))]" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

      <div className="relative z-10">
        <Header
          lastUpdated={lastUpdated}
          secondsUntilRefresh={secondsUntilRefresh}
          onRefresh={refetch}
          isLoading={isLoading}
        />

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Demo mode badge */}
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
              Demo Mode
            </Badge>
            <span className="text-zinc-500 text-sm">
              Showing simulated data • Connect a real API for production
            </span>
          </div>

          {/* Error state */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
              {error}
            </div>
          )}

          {/* Stats cards */}
          <StatsCards data={data} />

          {/* Main table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Top 25 Most Shorted Stocks
              </h2>
              <span className="text-zinc-500 text-sm">
                Sorted by Short Float %
              </span>
            </div>
            <StockTable data={data} isLoading={isLoading} />
          </div>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-zinc-800">
            <p className="text-zinc-500 text-sm">
              Data refreshes automatically every 60 seconds
            </p>
            <p className="text-zinc-600 text-xs mt-2">
              Short Interest Tracker • Built with Next.js & shadcn/ui
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
