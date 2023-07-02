import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Get,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { CreateDemandDto } from './dto/create-demand.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Claims')
@Controller({
  path: 'claims',
  version: '1',
})
@SkipThrottle()
export class ClaimsController {
  constructor(
    @Inject('CLAIMS_SERVICE') private readonly claimsService: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('proof'))
  @UseGuards(JwtAuthGuard)
  @SkipThrottle()
  async createDemand(
    @Body() demand: CreateDemandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileContent = file ? file.buffer.toString('base64') : null;
    if (!fileContent) {
      throw new Error('File not uploaded');
    }

    demand.proof = fileContent;

    return this.claimsService
      .send({ cmd: 'createDemande' }, demand)
      .toPromise();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('proof'))
  @UseGuards(JwtAuthGuard)
  @SkipThrottle()
  async updateDemand(
    @Param('id') id: string,
    @Body() updateDemandDto: UpdateDemandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const fileContent = file.buffer.toString('base64');
      updateDemandDto.proof = Buffer.from(fileContent, 'base64'); // Update the proof field to Buffer
    }

    return this.claimsService
      .send({ cmd: 'updateDemande' }, { id: id, ...updateDemandDto })
      .toPromise();
  }

  @Get()
  @UseInterceptors(FileInterceptor('proof'))
  @UseGuards(JwtAuthGuard)
  @SkipThrottle()
  async getDemandes() {
    const claims = await this.claimsService
      .send({ cmd: 'getDemandes' }, '')
      .toPromise();

    return claims;
  }

  @Get(':id')
  @UseInterceptors(FileInterceptor('proof'))
  @UseGuards(JwtAuthGuard)
  @SkipThrottle()
  async getDemande(@Param('id') id: string) {
    const claims = await this.claimsService
      .send({ cmd: 'getDemande' }, { _id: id })
      .toPromise();

    return claims;
  }

  @Delete(':id')
  @UseInterceptors(FileInterceptor('proof'))
  @UseGuards(JwtAuthGuard)
  @SkipThrottle()
  async deleteDemande(@Param('id') id: string) {
    console.log(id);
    const claims = await this.claimsService
      .send({ cmd: 'deleteDemande' }, { _id: id })
      .toPromise();

    return claims;
  }
}
