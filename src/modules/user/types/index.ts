export interface BeerRank {
  rank: string;
  current: number;
  toNext: number;
  nextRank?: string;
  max: number;
}
