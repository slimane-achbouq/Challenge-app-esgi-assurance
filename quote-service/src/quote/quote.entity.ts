import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';


enum InsuranceType {
  LIABILITY = 'Liability',
  COLLISION = 'Collision',
  COMPREHENSIVE = 'Comprehensive',
}

enum Coverage {
  BASIC = 'Basic',
  STANDARD = 'Standard',
  PREMIUM = 'Premium',
}

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  

  @PrimaryGeneratedColumn()
  quoteNumber: number;

  @Column({
    type: 'enum',
    enum: InsuranceType,
  })
  insuranceType: string;

  @Column({
    type: 'enum',
    enum: Coverage,
  })
  coverage: string;

  @Column({ nullable: true })
  insurancePremium: number;

  @Column()
  coverageDuration: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  coverageStartDate: Date;

  @Column()
  userId: string;

  @Column({ nullable: true })
  insuranceId: string;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.quote, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  vehicle: Vehicle;
}
