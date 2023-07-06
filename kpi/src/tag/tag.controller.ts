import {Body, Controller, Get, Headers, HttpCode, Post} from '@nestjs/common';
import {Tag} from '../schemas/tag.schema';
import {TagService} from './tag.service';
import {MessagePattern} from '@nestjs/microservices';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {
    }

    @MessagePattern('createTag')
    async createTag(@Body() tag: Tag) {
        try {
            return this.tagService.create(tag);
        } catch (e) {
            return e;
        }
    }

    @MessagePattern('getAllTags')
    async getAllTags(@Headers() headers) {
        const app_id = headers['app-id'];
        return await this.tagService.findAllByAppId(app_id);
    }
}
