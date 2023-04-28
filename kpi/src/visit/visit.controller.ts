import {Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import {VisitService} from "./visit.service";
import {Visit} from "../schemas/visit.schema";

@Controller("visit")
export class VisitController {
    constructor(private readonly visitService: VisitService) {
    }

    @Post()
    async createVisit(@Body() visit: Visit) {
        console.log(visit)
        return this.visitService.create(visit);
    }

    // Get total unique Visits
    /*@Get()
    @HttpCode(200)
    async getUniqueVisitsCount(@Body() body: { app_id: string }) {
        const { app_id } = body;
        return this.visitService.getTotalDistinctVisits(app_id);
    }*/

    @Get()
    @HttpCode(200)
    async getTotalVisitsCount(@Body() body: { app_id: string }) {
        const { app_id } = body;
        return this.visitService.getTotalVisitsByAppId(app_id);
    }
}