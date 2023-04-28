import {Body, Controller, Get, Headers, HttpCode, Post} from '@nestjs/common';
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
    async getUniqueVisitorsCount(@Headers() headers) {
        const app_id = headers["app-id"];
        return this.visitorService.getTotalDistinctVisitors(app_id);
    }
}