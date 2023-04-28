import {Body, Controller, Get, Post} from '@nestjs/common';
import {KpiService} from "./kpi.service";
import {Kpi} from "../schemas/kpi.schema";

@Controller("kpi")
export class KpiController {
    constructor(private readonly kpiService: KpiService) {
    }

    @Post()
    async createKpi(@Body() kpi: Kpi) {
        console.log(kpi)
        return this.kpiService.create(kpi);
    }

    @Get()
    async getKpis() {
        return this.kpiService.findAll();
    }

    @Get("tag/:tag")
    async getKpisByTag(@Body() tag: string) {
        return this.kpiService.findKpisByTag(tag);
    }

    @Get("visitor/:visitor")
    async getKpisByVisitor(@Body() visitor: string) {
        return this.kpiService.findKpisByVisitor(visitor);
    }
}