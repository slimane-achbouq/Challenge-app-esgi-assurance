import {Body, Controller, Post} from '@nestjs/common';
import {Time} from "../schemas/time.schema";
import {TimeService} from "./time.service";

@Controller("time")
export class TimeController {
    constructor(private readonly timeService: TimeService) {
    }

    @Post()
    async createTime(@Body() time: Time) {
        console.log(time)
        return this.timeService.create(time);
    }
}