import {Body, Controller, Get, Headers, HttpCode, Post} from '@nestjs/common';
import {Tag} from "../schemas/tag.schema";
import {TagService} from "./tag.service";

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {
    }
    @Post()
    async createTag(@Body() tag: Tag) {
        return this.tagService.create(tag);
    }

    @Get()
    @HttpCode(200)
    async getAllTags(@Headers() headers) {
        const app_id = headers["app-id"];
        return await this.tagService.findAllByAppId(app_id);
    }
}