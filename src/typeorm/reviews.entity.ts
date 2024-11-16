import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '.';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  incidentDate: Date;

  @Column()
  rate: string;

  @Column({ default: false })
  anonymous: boolean;

  @Column()
  message: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
