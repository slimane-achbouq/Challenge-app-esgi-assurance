import { Inject, Injectable,OnModuleInit } from '@nestjs/common';
import { Client, ClientProxy,Transport } from '@nestjs/microservices';


@Injectable()
export class AppService {

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001,
    },
  })
  client: ClientProxy;

  getHello(): string {
    return 'Hello World!';
  }

  async getInsurance(id: string) {
    return this.client.send({ cmd: 'hello' }, id).subscribe(d=>console.log(d));
  }
}
