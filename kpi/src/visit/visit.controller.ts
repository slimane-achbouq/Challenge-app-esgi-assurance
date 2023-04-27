import {Body, Controller, Post} from '@nestjs/common';
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
}