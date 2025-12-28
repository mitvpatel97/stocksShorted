import { NextResponse } from "next/server";
import { sampleShortInterestData, ShortInterestStock } from "@/lib/data";

// Simulate slight variations in data to make it feel "live"
function getVariedData(): ShortInterestStock[] {
    return sampleShortInterestData.map((stock) => {
        // Add small random variation to short float (±0.3%)
        const variation = (Math.random() - 0.5) * 0.6;
        const newShortFloat = Math.max(1, stock.shortFloat + variation);

        return {
            ...stock,
            previousShortFloat: stock.shortFloat,
            shortFloat: parseFloat(newShortFloat.toFixed(1)),
        };
    }).sort((a, b) => b.shortFloat - a.shortFloat)
        .map((stock, index) => ({ ...stock, rank: index + 1 }));
}

export async function GET() {
    // Simulate network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 300));

    const data = getVariedData();

    return NextResponse.json({
        data,
        timestamp: new Date().toISOString(),
        source: "demo",
        note: "Demo data - connect a real API for production use",
    });
}
