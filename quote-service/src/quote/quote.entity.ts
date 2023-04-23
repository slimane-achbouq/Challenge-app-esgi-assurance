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

  @Column()
  insurancePremium: number;

  @Column()
  coverageDuration: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column()
  userId: string;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.quote, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  vehicle: Vehicle;
}
