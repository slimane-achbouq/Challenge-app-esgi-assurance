import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @PrimaryGeneratedColumn('increment')
  quoteNumber: number;

  @Column()
  insuranceType: string;

  @Column()
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
