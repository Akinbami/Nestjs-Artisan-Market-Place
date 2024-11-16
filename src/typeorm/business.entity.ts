import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Review } from './reviews.entity';
import { User } from './user.entity';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  businessName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  url: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  referralCode: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isRegistered: boolean;

  @Column({ nullable: true })
  registrationNumber: string;

  @Column({ nullable: true })
  registrationDocument: string; // document url

  @Column({
    type: 'enum',
    enum: ['artisan', 'domestic'],
    default: 'artisan',
  })
  category: string;

  @Column({
    type: 'set',
    enum: [
      'agriculture',
      'automobile',
      'engineering',
      'food',
      'health',
      'information technology',
      'sales',
    ],
    default: [],
  })
  industries: string;

  @Column({
    type: 'set',
    enum: ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'],
    default: ['mon'],
  })
  workDays: string;

  @Column({ nullable: true })
  workTime: string;

  @Column({
    type: 'set',
    enum: ['shoe', 'leader', 'slippers'],
    default: [],
  })
  services: string;

  @Column()
  rating: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.businesses)
  user: User;
}
