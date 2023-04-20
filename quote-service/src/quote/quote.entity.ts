import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Vehicle } from '../vehicle/vehicle.entity';
  
  @Entity()
  export class Quote {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    quoteNumber: string;
  
    @Column()
    insuranceType: string;
  
    @Column()
    coverage: string;
  
    @Column()
    insurancePremium: number;
  
    @Column()
    coverageDuration: number;
  
    @Column({ type: 'timestamptz' })
    createdAt: Date;
  
    @Column({ type: 'timestamptz' })
    updatedAt: Date;
  
    @Column()
    userId: string;
  
    @ManyToOne(() => Vehicle, (vehicle) => vehicle.quotes, { onDelete: 'CASCADE' })
    vehicle: Vehicle;
  }
  