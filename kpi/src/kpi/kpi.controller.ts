import {Body, Controller, Get, Headers, HttpCode, Post} from '@nestjs/common';
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
    @HttpCode(200)
    async getUniqueVisitorsCount(@Headers() headers) {
        const app_id = headers["app-id"];
        return this.kpiService.findAllKpis(app_id);
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