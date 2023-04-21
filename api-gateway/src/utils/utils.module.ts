import { Module } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UTILS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'utils-service-host',
          port: 3004,
        },
      },
    ]),
  ],
  controllers: [UtilsController],
})
export class UtilsModule {}
