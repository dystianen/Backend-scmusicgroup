import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  artistName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  accountName: string;

  @Column()
  amount: string;

  @Column()
  phone: string;

  @Column({ default: true })
  status: boolean;

  // @CreateDateColumn({
  //   type: 'timestamp with time zone',
  //   nullable: false,
  // })
  // createdAt: Date;
  //
  // @UpdateDateColumn({
  //   type: 'timestamp with time zone',
  //   nullable: false,
  // })
  // updatedAt: Date;
  //
  // @DeleteDateColumn({
  //   type: 'timestamp with time zone',
  //   nullable: true,
  // })
  // deletedAt: Date;

  @VersionColumn()
  version: number;
}
