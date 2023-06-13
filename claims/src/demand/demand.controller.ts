import { Body, Controller } from '@nestjs/common';
import { DemandService } from './demand.service';
import { CreateDemandDto } from '../dto/create-demand.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateDemandDto } from 'src/dto/update-demand.dto';

@ApiTags('Demand')
@Controller({
  path: 'demand',
})
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @MessagePattern({ cmd: 'createDemande' })
  async createDemand(@Payload() demand: CreateDemandDto) {
    return this.demandService.create(demand);
  }

  @MessagePattern({ cmd: 'updateDemande' })
  async updateDemand(@Payload() updateDemandDto: UpdateDemandDto) {
    const updatedDemand = await this.demandService.updateDemand(
      updateDemandDto,
    );
    return updatedDemand;
  }
}
