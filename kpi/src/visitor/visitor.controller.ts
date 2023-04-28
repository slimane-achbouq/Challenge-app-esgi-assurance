import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';
import {VisitorService} from "./visitor.service";
import {Visitor} from "../schemas/visitor.schema";

@Controller("visitor")
export class VisitorController {
    constructor(private readonly visitorService: VisitorService) {
    }

    @Post()
    async createVisitor(@Body() visitor: Visitor) {
        console.log(visitor)
        return this.visitorService.create(visitor);
    }

    // @AuthenticationRequired()
    // @HasRole(Role.ADMINISTRATOR)
    @Get()
    @HttpCode(200)
    async getUniqueVisitorsCount(@Body() body: { app_id: string }) {
        const { app_id } = body;
        return this.visitorService.getTotalDistinctVisitors(app_id);
    }
}