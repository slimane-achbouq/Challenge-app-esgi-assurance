import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Quote } from '../quote/quote.entity';
  
  @Entity()
  export class Vehicle {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    vehicleType: string;
  
    @Column()
    brand: string;
  
    @Column()
    model: string;
  
    @Column()
    horsepower: number;
  
    @Column()
    licensePlate: string;
  
    @Column({ type: 'date' })
    licenseObtainedDate: Date;
  
    @Column({ type: 'date' })
    vehicleCirculationDate: Date;
  
    @Column({ type: 'date' })
    registrationCardDate: Date;
  
    @Column()
    registrationCardHolder: string;
  
    @Column()
    purchaseMode: string;
  
    @Column()
    parkingPostalCode: string;
  
    @Column()
    parkingType: string;
  
    @Column()
    annualMileage: number;
  
    @OneToMany(() => Quote, (quote) => quote.vehicle, { cascade: true })
    quotes: Quote[];
  }
  