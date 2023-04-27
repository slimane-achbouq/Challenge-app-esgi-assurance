import {Body, Controller, Post} from '@nestjs/common';
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
}