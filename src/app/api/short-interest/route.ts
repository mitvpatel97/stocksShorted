import { NextResponse } from "next/server";

export interface ShortInterestStock {
    rank: number;
    ticker: string;
    companyName: string;
    shortFloat: number;
    shortInterest: number;
    floatShares: number;
    avgVolume: number;
    daysToCover: number;
    previousShortFloat: number;
    changePercent: number;
    settlementDate: string;
}

interface FINRAShortInterestResponse {
    symbolCode: string;
    issueName: string;
    currentShortPositionQuantity: number;
    previousShortPositionQuantity: number;
    averageDailyVolumeQuantity: number;
    daysToCoverQuantity: number;
    changePercent: number;
    settlementDate: string;
    marketClassCode: string;
}

// Get the most recent settlement dates to try
function getRecentSettlementDates(): string[] {
    const dates: string[] = [];
    const today = new Date();

    // FINRA publishes bi-weekly, so check the last few potential dates
    // Settlement dates are typically mid-month and end of month
    for (let i = 0; i < 60; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const day = date.getDate();
        // Common settlement dates are around 15th and last day of month
        if (day === 15 || day === 14 || day === 16 || day === 28 || day === 29 || day === 30 || day === 31) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const dayStr = String(day).padStart(2, '0');
            dates.push(`${year}-${month}-${dayStr}`);
        }
    }

    return dates.slice(0, 10); // Try up to 10 recent potential dates
}

async function fetchFINRADataWithDate(settlementDate: string): Promise<ShortInterestStock[]> {
    const response = await fetch(
        "https://api.finra.org/data/group/otcMarket/name/consolidatedShortInterest",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                limit: 50,
                offset: 0,
                compareFilters: [
                    {
                        compareType: "equal",
                        fieldName: "settlementDate",
                        fieldValue: settlementDate
                    }
                ],
                sortFields: ["-currentShortPositionQuantity"]
            }),
            next: { revalidate: 300 }
        }
    );

    if (!response.ok) {
        throw new Error(`FINRA API error: ${response.status}`);
    }

    const data: FINRAShortInterestResponse[] = await response.json();

    if (!data || data.length === 0) {
        throw new Error("No data for this settlement date");
    }

    // Filter for major exchanges only (exclude OTC penny stocks)
    // NYSE = A, NASDAQ NNM = R, ARCA = E, AMEX = B
    const filtered = data
        .filter(item =>
            item.currentShortPositionQuantity > 1000000 && // At least 1M shares shorted  
            item.averageDailyVolumeQuantity > 100000 && // Reasonable volume
            (item.marketClassCode === "NYSE" ||
                item.marketClassCode === "NNM" ||
                item.marketClassCode === "ARCA" ||
                item.marketClassCode === "AMEX")
        )
        .slice(0, 25);

    return filtered.map((item, index): ShortInterestStock => ({
        rank: index + 1,
        ticker: item.symbolCode,
        companyName: item.issueName.substring(0, 35),
        shortFloat: 0,
        shortInterest: item.currentShortPositionQuantity,
        floatShares: 0,
        avgVolume: item.averageDailyVolumeQuantity,
        daysToCover: Math.min(item.daysToCoverQuantity, 99),
        previousShortFloat: 0,
        changePercent: item.changePercent,
        settlementDate: item.settlementDate,
    }));
}

async function fetchFINRAData(): Promise<{ data: ShortInterestStock[], settlementDate: string }> {
    // Try multiple recent settlement dates until we find one with data
    const datesToTry = getRecentSettlementDates();

    for (const date of datesToTry) {
        try {
            const data = await fetchFINRADataWithDate(date);
            if (data.length >= 10) {
                return { data, settlementDate: date };
            }
        } catch {
            // Try next date
            continue;
        }
    }

    // Fallback to a known working date (may be historical)
    const fallbackDates = ["2024-12-13", "2024-11-29", "2024-11-15", "2020-04-15"];

    for (const date of fallbackDates) {
        try {
            const data = await fetchFINRADataWithDate(date);
            if (data.length >= 10) {
                return { data, settlementDate: date };
            }
        } catch {
            continue;
        }
    }

    throw new Error("Could not fetch data from any settlement date");
}

export async function GET() {
    try {
        const result = await fetchFINRAData();

        return NextResponse.json({
            data: result.data,
            timestamp: new Date().toISOString(),
            settlementDate: result.settlementDate,
            source: "FINRA",
            note: `Real short interest data from FINRA (Settlement: ${result.settlementDate})`,
        });
    } catch (error) {
        console.error("Failed to fetch FINRA data:", error);

        // Return sample data as fallback
        const fallbackData = await import("@/lib/data").then(m => m.sampleShortInterestData);

        return NextResponse.json({
            data: fallbackData,
            timestamp: new Date().toISOString(),
            source: "demo",
            note: "Demo data - FINRA API temporarily unavailable",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
