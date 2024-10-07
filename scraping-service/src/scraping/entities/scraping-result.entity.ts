import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class ScrapingResult {
  @ObjectIdColumn()
  _id: string;

  @Column()
  url: string;

  @Column()
  domains?: string[];

  @Column()
  domainsCount: number;

  @Column()
  foundUrls?: string[];

  @Column()
  foundUrlsCount: number;

  @Column()
  createdAt: Date;
}
