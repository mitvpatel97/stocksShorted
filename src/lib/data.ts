export interface ShortInterestStock {
  rank: number;
  ticker: string;
  companyName: string;
  shortFloat: number; // percentage - may be 0 if not available
  shortInterest: number; // number of shares shorted
  floatShares: number; // total float shares
  avgVolume: number; // average daily volume
  daysToCover: number; // short interest / avg volume
  previousShortFloat: number; // for showing change
  changePercent?: number; // percent change from previous period
  settlementDate?: string; // date of the data
}

// Sample data for the top 25 most shorted stocks (fallback data)
export const sampleShortInterestData: ShortInterestStock[] = [
  { rank: 1, ticker: "CVNA", companyName: "Carvana Co.", shortFloat: 52.3, shortInterest: 41200000, floatShares: 78800000, avgVolume: 8420000, daysToCover: 4.9, previousShortFloat: 51.8 },
  { rank: 2, ticker: "BYND", companyName: "Beyond Meat Inc.", shortFloat: 41.2, shortInterest: 26300000, floatShares: 63800000, avgVolume: 2150000, daysToCover: 12.2, previousShortFloat: 40.5 },
  { rank: 3, ticker: "UPST", companyName: "Upstart Holdings Inc.", shortFloat: 38.7, shortInterest: 31400000, floatShares: 81200000, avgVolume: 4320000, daysToCover: 7.3, previousShortFloat: 39.1 },
  { rank: 4, ticker: "BBBY", companyName: "Bed Bath & Beyond", shortFloat: 36.9, shortInterest: 29800000, floatShares: 80800000, avgVolume: 15200000, daysToCover: 2.0, previousShortFloat: 35.2 },
  { rank: 5, ticker: "MSTR", companyName: "MicroStrategy Inc.", shortFloat: 34.5, shortInterest: 4650000, floatShares: 13500000, avgVolume: 1890000, daysToCover: 2.5, previousShortFloat: 33.8 },
  { rank: 6, ticker: "SPCE", companyName: "Virgin Galactic Holdings", shortFloat: 32.8, shortInterest: 61200000, floatShares: 186600000, avgVolume: 9450000, daysToCover: 6.5, previousShortFloat: 33.2 },
  { rank: 7, ticker: "LCID", companyName: "Lucid Group Inc.", shortFloat: 31.5, shortInterest: 298000000, floatShares: 946000000, avgVolume: 28500000, daysToCover: 10.5, previousShortFloat: 30.9 },
  { rank: 8, ticker: "RIVN", companyName: "Rivian Automotive Inc.", shortFloat: 29.8, shortInterest: 148000000, floatShares: 496600000, avgVolume: 21800000, daysToCover: 6.8, previousShortFloat: 28.5 },
  { rank: 9, ticker: "BGFV", companyName: "Big 5 Sporting Goods", shortFloat: 28.4, shortInterest: 6120000, floatShares: 21600000, avgVolume: 875000, daysToCover: 7.0, previousShortFloat: 27.9 },
  { rank: 10, ticker: "BBIG", companyName: "Vinco Ventures Inc.", shortFloat: 27.6, shortInterest: 32400000, floatShares: 117400000, avgVolume: 8920000, daysToCover: 3.6, previousShortFloat: 28.1 },
  { rank: 11, ticker: "FIZZ", companyName: "National Beverage Corp.", shortFloat: 26.3, shortInterest: 6850000, floatShares: 26000000, avgVolume: 421000, daysToCover: 16.3, previousShortFloat: 25.8 },
  { rank: 12, ticker: "PLUG", companyName: "Plug Power Inc.", shortFloat: 25.1, shortInterest: 145000000, floatShares: 577700000, avgVolume: 24600000, daysToCover: 5.9, previousShortFloat: 24.6 },
  { rank: 13, ticker: "NKLA", companyName: "Nikola Corporation", shortFloat: 24.8, shortInterest: 156000000, floatShares: 629000000, avgVolume: 18900000, daysToCover: 8.3, previousShortFloat: 25.3 },
  { rank: 14, ticker: "AMC", companyName: "AMC Entertainment", shortFloat: 23.5, shortInterest: 121000000, floatShares: 515000000, avgVolume: 32500000, daysToCover: 3.7, previousShortFloat: 22.8 },
  { rank: 15, ticker: "OPEN", companyName: "Opendoor Technologies", shortFloat: 22.9, shortInterest: 138000000, floatShares: 602600000, avgVolume: 12400000, daysToCover: 11.1, previousShortFloat: 23.4 },
  { rank: 16, ticker: "COIN", companyName: "Coinbase Global Inc.", shortFloat: 21.7, shortInterest: 42800000, floatShares: 197200000, avgVolume: 8950000, daysToCover: 4.8, previousShortFloat: 21.2 },
  { rank: 17, ticker: "MRNA", companyName: "Moderna Inc.", shortFloat: 20.4, shortInterest: 73600000, floatShares: 360800000, avgVolume: 6720000, daysToCover: 11.0, previousShortFloat: 19.8 },
  { rank: 18, ticker: "GME", companyName: "GameStop Corp.", shortFloat: 19.8, shortInterest: 60200000, floatShares: 304000000, avgVolume: 8450000, daysToCover: 7.1, previousShortFloat: 20.3 },
  { rank: 19, ticker: "PTON", companyName: "Peloton Interactive", shortFloat: 18.6, shortInterest: 62400000, floatShares: 335500000, avgVolume: 9870000, daysToCover: 6.3, previousShortFloat: 18.1 },
  { rank: 20, ticker: "CHPT", companyName: "ChargePoint Holdings", shortFloat: 17.9, shortInterest: 74500000, floatShares: 416200000, avgVolume: 11200000, daysToCover: 6.7, previousShortFloat: 17.4 },
  { rank: 21, ticker: "SQ", companyName: "Block Inc.", shortFloat: 16.5, shortInterest: 62100000, floatShares: 376400000, avgVolume: 8650000, daysToCover: 7.2, previousShortFloat: 16.9 },
  { rank: 22, ticker: "FUBO", companyName: "fuboTV Inc.", shortFloat: 15.8, shortInterest: 41200000, floatShares: 260800000, avgVolume: 12300000, daysToCover: 3.4, previousShortFloat: 15.2 },
  { rank: 23, ticker: "SNOW", companyName: "Snowflake Inc.", shortFloat: 14.7, shortInterest: 46800000, floatShares: 318400000, avgVolume: 4210000, daysToCover: 11.1, previousShortFloat: 15.1 },
  { rank: 24, ticker: "DASH", companyName: "DoorDash Inc.", shortFloat: 13.9, shortInterest: 48200000, floatShares: 346800000, avgVolume: 5120000, daysToCover: 9.4, previousShortFloat: 13.5 },
  { rank: 25, ticker: "RBLX", companyName: "Roblox Corporation", shortFloat: 12.4, shortInterest: 69500000, floatShares: 560500000, avgVolume: 7890000, daysToCover: 8.8, previousShortFloat: 12.8 },
];

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return num.toFixed(0);
}

export function getShortFloatColor(shortFloat: number): string {
  if (shortFloat >= 30) return "text-red-400";
  if (shortFloat >= 20) return "text-orange-400";
  if (shortFloat >= 10) return "text-yellow-400";
  return "text-green-400";
}

export function getChangeIndicator(changePercent: number): { arrow: string; color: string } {
  if (changePercent > 0) return { arrow: "↑", color: "text-red-400" };
  if (changePercent < 0) return { arrow: "↓", color: "text-green-400" };
  return { arrow: "—", color: "text-zinc-500" };
}
