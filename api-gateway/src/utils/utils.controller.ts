import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('utils')
export class UtilsController {
    constructor(
        @Inject('UTILS_SERVICE') private readonly utilsService: ClientProxy,
    ) {}
    
    @Post()
    async sendMail(@Body() mailDto: any) {
        return this.utilsService.send({ cmd: 'sendMail'}, mailDto).toPromise();
    }
}
