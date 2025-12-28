"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShortInterestStock, formatNumber, getChangeIndicator } from "@/lib/data";

interface StockTableProps {
    data: ShortInterestStock[];
    isLoading: boolean;
}

function getDaysToCoverColor(days: number): string {
    if (days >= 10) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (days >= 5) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    return "bg-zinc-700/50 text-zinc-300 border-zinc-600";
}

function LoadingSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                    <Skeleton className="h-6 w-8 bg-zinc-800" />
                    <Skeleton className="h-6 w-16 bg-zinc-800" />
                    <Skeleton className="h-6 w-40 bg-zinc-800" />
                    <Skeleton className="h-6 w-20 bg-zinc-800" />
                    <Skeleton className="h-6 w-20 bg-zinc-800" />
                    <Skeleton className="h-6 w-16 bg-zinc-800" />
                </div>
            ))}
        </div>
    );
}

export function StockTable({ data, isLoading }: StockTableProps) {
    if (isLoading && data.length === 0) {
        return (
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm p-4">
                <LoadingSkeleton />
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-800 hover:bg-transparent">
                            <TableHead className="text-zinc-400 font-semibold w-16">#</TableHead>
                            <TableHead className="text-zinc-400 font-semibold">Ticker</TableHead>
                            <TableHead className="text-zinc-400 font-semibold hidden md:table-cell">Company</TableHead>
                            <TableHead className="text-zinc-400 font-semibold text-right">Short Interest</TableHead>
                            <TableHead className="text-zinc-400 font-semibold text-right hidden sm:table-cell">Avg Volume</TableHead>
                            <TableHead className="text-zinc-400 font-semibold text-right hidden lg:table-cell">Days to Cover</TableHead>
                            <TableHead className="text-zinc-400 font-semibold text-center w-24">Change %</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((stock, index) => {
                            const change = getChangeIndicator(stock.changePercent ?? 0);
                            return (
                                <TableRow
                                    key={stock.ticker}
                                    className="border-zinc-800 hover:bg-zinc-800/50 transition-colors duration-150 group"
                                    style={{ animationDelay: `${index * 30}ms` }}
                                >
                                    <TableCell className="font-mono text-zinc-500">
                                        {stock.rank}
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-bold text-white group-hover:text-red-400 transition-colors">
                                            {stock.ticker}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-zinc-400 hidden md:table-cell max-w-[200px] truncate">
                                        {stock.companyName}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="font-mono text-white font-medium">
                                            {formatNumber(stock.shortInterest)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-zinc-300 hidden sm:table-cell">
                                        {formatNumber(stock.avgVolume)}
                                    </TableCell>
                                    <TableCell className="text-right hidden lg:table-cell">
                                        <Badge
                                            variant="outline"
                                            className={`font-mono ${getDaysToCoverColor(stock.daysToCover)}`}
                                        >
                                            {stock.daysToCover.toFixed(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className={`font-mono font-bold ${change.color}`}>
                                            {change.arrow} {Math.abs(stock.changePercent ?? 0).toFixed(1)}%
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
