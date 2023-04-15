import { Inject, Injectable,OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


@Injectable()
export class AppService implements OnModuleInit {

  
  constructor(@Inject('INSURANCE_SERVICE') private readonly client: ClientKafka){

  }
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    this.client.subscribeToResponseOf('get.insurance');
  }

  async getInsurance(id: string) {
    return this.client.send('get.insurance', JSON.stringify({"ok":"ok"})).subscribe(d=>console.log(d));
  }
}
