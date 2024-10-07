export interface ScrapeResult {
  _id: string;
  url: string;
  domains?: string[];
  domainsCount: number;
  foundUrls?: string[];
  foundUrlsCount: number;
  createdAt: string;
}
