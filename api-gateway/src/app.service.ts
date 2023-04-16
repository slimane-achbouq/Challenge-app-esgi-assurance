import { Inject, Injectable,OnModuleInit } from '@nestjs/common';
import { Client, ClientProxy,Transport } from '@nestjs/microservices';


@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

}
