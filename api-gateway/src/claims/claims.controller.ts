import { Body, Controller, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { CreateDemandDto } from './dto/create-demand.dto';

@ApiTags('Claims')
@Controller({
  path: 'claims',
})
export class ClaimsController {
  constructor(
    @Inject('CLAIMS_SERVICE') private readonly claimsService: ClientProxy,
  ) {}

  @Post()
  async createDemand(@Body() demand: CreateDemandDto) {
    return this.claimsService
      .send({ cmd: 'createDemande' }, demand)
      .toPromise();
  }

  @Put(':id')
  async updateDemand(
    @Param('id') id: string,
    @Body() updateDemandDto: UpdateDemandDto,
  ) {
    return this.claimsService
      .send(
        { cmd: 'updateDemande' },
        { id: id, updateDemandDto: updateDemandDto },
      )
      .toPromise();
  }
}
