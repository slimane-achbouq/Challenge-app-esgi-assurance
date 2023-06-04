import {Body, Controller, Param, Patch, Post, Put} from '@nestjs/common';
import {Demand} from "../schema/demand.schema";
import {DemandService} from "./demand.service";
import {CreateDemandDto, UpdateDemandDto} from "./demand.dto";

@Controller("demand")
export class DemandController {
    constructor(private readonly demandService: DemandService) {
    }

    @Post()
    async createDemand(@Body() demand: CreateDemandDto) {
        console.log(demand);
        return this.demandService.create(demand);
    }

    @Patch(':id')
    async updateDemand(@Param('id') id: string, @Body() updateDemandDto: UpdateDemandDto) {
        const {decision, additionalInfo} = updateDemandDto;
        const updatedDemand = await this.demandService.updateDemand(id, decision, additionalInfo);
        return updatedDemand;
    }
}