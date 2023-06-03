import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { Quote } from '../quote/quote.entity';


enum VehicleType {
  CAR = 'Car',
  MOTORCYCLE = 'Motorcycle',
  TRUCK = 'Truck',
}

enum PurchaseMode {
  NEW = 'New',
  USED = 'Used',
}


@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: VehicleType,
  })
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

  @Column({
    type: 'enum',
    enum: PurchaseMode,
  })
  purchaseMode: string;

  @Column()
  parkingPostalCode: string;

  @Column({nullable: true })
  parkingType: string;

  @Column()
  annualMileage: number;

  @Column({ type: 'bytea', nullable: true }) 
  carteGrise: Buffer;

  @OneToOne(() => Quote, (quote) => quote.vehicle)
  quote: Quote;
}