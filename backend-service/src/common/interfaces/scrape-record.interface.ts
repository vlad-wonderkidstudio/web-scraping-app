export interface ScrapeRecord {
  _id: string;
  url: string;
  domains?: string[];
  domainsCount: number;
  foundUrls?: string[];
  foundUrlsCount: number;
  createdAt: Date;
}
