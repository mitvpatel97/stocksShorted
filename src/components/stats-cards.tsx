"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BarChart3, Target } from "lucide-react";
import { ShortInterestStock, formatNumber } from "@/lib/data";

interface StatsCardsProps {
    data: ShortInterestStock[];
}

export function StatsCards({ data }: StatsCardsProps) {
    if (data.length === 0) return null;

    const totalShortInterest = data.reduce((acc, stock) => acc + stock.shortInterest, 0);
    const avgDaysToCover = data.reduce((acc, stock) => acc + stock.daysToCover, 0) / data.length;
    const highestShort = data[0];

    const stats = [
        {
            title: "Highest Short Interest",
            value: formatNumber(highestShort?.shortInterest || 0),
            subtitle: highestShort?.ticker || "N/A",
            icon: Target,
            gradient: "from-red-500 to-orange-500",
            shadow: "shadow-red-500/20",
        },
        {
            title: "Avg Days to Cover",
            value: avgDaysToCover.toFixed(1),
            subtitle: "Across top 25 stocks",
            icon: BarChart3,
            gradient: "from-orange-500 to-yellow-500",
            shadow: "shadow-orange-500/20",
        },
        {
            title: "Total Short Interest",
            value: formatNumber(totalShortInterest),
            subtitle: "Shares shorted",
            icon: TrendingUp,
            gradient: "from-yellow-500 to-green-500",
            shadow: "shadow-yellow-500/20",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <Card
                    key={index}
                    className="relative overflow-hidden bg-zinc-900/50 border-zinc-800 backdrop-blur-sm group hover:border-zinc-700 transition-all duration-300"
                >
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-zinc-400 text-sm font-medium">{stat.title}</p>
                                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                                <p className="text-zinc-500 text-sm mt-1">{stat.subtitle}</p>
                            </div>
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} ${stat.shadow} shadow-lg`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        {/* Subtle gradient overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
