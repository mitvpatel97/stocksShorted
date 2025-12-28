import { NextResponse } from "next/server";

export interface ShortInterestStock {
    rank: number;
    ticker: string;
    companyName: string;
    shortFloat: number; // Will be 0 when not available from API
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

async function fetchFINRAData(): Promise<ShortInterestStock[]> {
    try {
        // Fetch short interest data from FINRA API
        // Sort by currentShortPositionQuantity descending to get most shorted stocks
        const response = await fetch(
            "https://api.finra.org/data/group/otcMarket/name/consolidatedShortInterest",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    limit: 100,
                    offset: 0,
                    sortFields: ["-currentShortPositionQuantity"],
                    // Get recent data - filter for major exchanges
                    domainFilters: [],
                    compareFilters: [
                        {
                            compareType: "equal",
                            fieldName: "marketClassCode",
                            fieldValue: "NYSE"
                        }
                    ]
                }),
                next: { revalidate: 300 } // Cache for 5 minutes
            }
        );

        if (!response.ok) {
            throw new Error(`FINRA API error: ${response.status}`);
        }

        const data: FINRAShortInterestResponse[] = await response.json();

        // Filter and sort by short interest quantity
        const sortedData = data
            .filter(item =>
                item.currentShortPositionQuantity > 1000000 && // At least 1M shares shorted
                item.averageDailyVolumeQuantity > 0
            )
            .sort((a, b) => b.currentShortPositionQuantity - a.currentShortPositionQuantity)
            .slice(0, 25);

        return sortedData.map((item, index): ShortInterestStock => ({
            rank: index + 1,
            ticker: item.symbolCode,
            companyName: item.issueName.substring(0, 30), // Truncate long names
            shortFloat: 0, // FINRA doesn't provide float data
            shortInterest: item.currentShortPositionQuantity,
            floatShares: 0,
            avgVolume: item.averageDailyVolumeQuantity,
            daysToCover: Math.min(item.daysToCoverQuantity, 999),
            previousShortFloat: 0,
            changePercent: item.changePercent,
            settlementDate: item.settlementDate,
        }));
    } catch (error) {
        console.error("FINRA API fetch failed:", error);
        throw error;
    }
}

// Backup: Fetch from a different FINRA endpoint for all exchanges
async function fetchFINRADataAllExchanges(): Promise<ShortInterestStock[]> {
    try {
        const response = await fetch(
            "https://api.finra.org/data/group/otcMarket/name/consolidatedShortInterest?limit=200",
            {
                headers: {
                    "Accept": "application/json",
                },
                next: { revalidate: 300 }
            }
        );

        if (!response.ok) {
            throw new Error(`FINRA API error: ${response.status}`);
        }

        const data: FINRAShortInterestResponse[] = await response.json();

        // Get the most recent settlement date from the data
        const latestDate = data.reduce((latest, item) => {
            return item.settlementDate > latest ? item.settlementDate : latest;
        }, "2020-01-01");

        // Filter for major exchanges and latest date, sort by short interest
        const filtered = data
            .filter(item =>
                item.settlementDate === latestDate &&
                (item.marketClassCode === "NYSE" ||
                    item.marketClassCode === "NNM" ||
                    item.marketClassCode === "ARCA" ||
                    item.marketClassCode === "AMEX") &&
                item.currentShortPositionQuantity > 100000
            )
            .sort((a, b) => b.currentShortPositionQuantity - a.currentShortPositionQuantity)
            .slice(0, 25);

        return filtered.map((item, index): ShortInterestStock => ({
            rank: index + 1,
            ticker: item.symbolCode,
            companyName: item.issueName.substring(0, 30),
            shortFloat: 0,
            shortInterest: item.currentShortPositionQuantity,
            floatShares: 0,
            avgVolume: item.averageDailyVolumeQuantity,
            daysToCover: Math.min(item.daysToCoverQuantity, 999),
            previousShortFloat: 0,
            changePercent: item.changePercent,
            settlementDate: item.settlementDate,
        }));
    } catch (error) {
        console.error("FINRA API fetch failed:", error);
        throw error;
    }
}

export async function GET() {
    try {
        // Try to fetch real data from FINRA
        let data = await fetchFINRADataAllExchanges();

        // If we got no results, try the POST method
        if (data.length === 0) {
            data = await fetchFINRAData();
        }

        return NextResponse.json({
            data,
            timestamp: new Date().toISOString(),
            source: "FINRA",
            note: "Real short interest data from FINRA - updated bi-weekly",
        });
    } catch (error) {
        // Fallback to sample data if API fails
        console.error("Failed to fetch FINRA data, using fallback:", error);

        // Return cached/sample data as fallback
        const fallbackData = await import("@/lib/data").then(m => m.sampleShortInterestData);

        return NextResponse.json({
            data: fallbackData,
            timestamp: new Date().toISOString(),
            source: "demo",
            note: "Fallback demo data - FINRA API temporarily unavailable",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
