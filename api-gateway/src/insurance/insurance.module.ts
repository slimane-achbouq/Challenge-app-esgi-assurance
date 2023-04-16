import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InsuranceController } from './insurance.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INSURANCE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [InsuranceController],
})
export class InsuranceModule {}