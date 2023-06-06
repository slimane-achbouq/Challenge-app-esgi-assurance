import { Body, Controller, Param, Patch, Post, Put } from '@nestjs/common';
import { Demand } from '../schema/demand.schema';
import { DemandService } from './demand.service';
import { CreateDemandDto, UpdateDemandDto } from './demand.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Demand')
@Controller({
  path: 'demand',
})
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Post()
  async createDemand(@Body() demand: CreateDemandDto) {
    return this.demandService.create(demand);
  }

  // for the admin
  @Patch(':id')
  async updateDemand(
    @Param('id') id: string,
    @Body() updateDemandDto: UpdateDemandDto,
  ) {
    const { decision, additionalInfo, insurance_id } = updateDemandDto;
    const updatedDemand = await this.demandService.updateDemand(
      id,
      decision,
      additionalInfo,
      insurance_id,
    );
    return updatedDemand;
  }
}
