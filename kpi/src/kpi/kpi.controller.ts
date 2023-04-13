import {Body, Controller, Post} from '@nestjs/common';
import {KpiService} from "./kpi.service";
import {Kpi} from "../schemas/kpi.schema";

@Controller("kpi")
export class KpiController {
    constructor(private readonly kpiService: KpiService) {
    }

    @Post()
    async createKpi(@Body() kpi: Kpi) {
        return this.kpiService.create(kpi);
    }
}