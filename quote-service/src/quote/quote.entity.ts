import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class Quote {
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

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
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
