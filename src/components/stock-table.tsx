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
import { ShortInterestStock, formatNumber, getShortFloatColor, getChangeIndicator } from "@/lib/data";

interface StockTableProps {
    data: ShortInterestStock[];
    isLoading: boolean;
}

function getShortFloatBadgeVariant(shortFloat: number): "destructive" | "secondary" | "outline" {
    if (shortFloat >= 30) return "destructive";
    if (shortFloat >= 20) return "secondary";
    return "outline";
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
                            <TableHead className="text-zinc-400 font-semibold text-right">Short Float</TableHead>
                            <TableHead className="text-zinc-400 font-semibold text-right hidden sm:table-cell">Short Interest</TableHead>
                            <TableHead className="text-zinc-400 font-semibold text-right hidden lg:table-cell">Days to Cover</TableHead>
                            <TableHead className="text-zinc-400 font-semibold text-center w-20">Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((stock, index) => {
                            const change = getChangeIndicator(stock.shortFloat, stock.previousShortFloat);
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
                                        <Badge
                                            variant={getShortFloatBadgeVariant(stock.shortFloat)}
                                            className={`font-mono ${stock.shortFloat >= 30
                                                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30"
                                                    : stock.shortFloat >= 20
                                                        ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/30"
                                                        : "bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700 border-zinc-600"
                                                }`}
                                        >
                                            {stock.shortFloat.toFixed(1)}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-zinc-300 hidden sm:table-cell">
                                        {formatNumber(stock.shortInterest)}
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-zinc-400 hidden lg:table-cell">
                                        {stock.daysToCover.toFixed(1)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className={`font-bold ${change.color}`}>
                                            {change.arrow}
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
