import { RecordStatusType } from 'src/common/types/record-status.type';
import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity()
export class ScrapingResult {
  @ObjectIdColumn()
  _id: string | ObjectId;

  @Column()
  url: string;

  @Column()
  domains?: string[];

  @Column()
  domainsCount?: number;

  @Column()
  foundUrls?: string[];

  @Column()
  foundUrlsCount?: number;

  @Column()
  createdAt?: Date;

  @Column()
  status: RecordStatusType;
}
