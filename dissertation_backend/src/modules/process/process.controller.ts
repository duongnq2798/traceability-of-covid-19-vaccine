import { Body, Controller, HttpCode, Get, Post, Query } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from 'src/exceptions';
import { ProcessService } from './process.service';
import { Process } from './dto';
@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Get()
  @HttpCode(200)
  async searchKeyword(@Query('keyword') keyword: string) {
    let result: any;

    try {
      result = await this.processService.searchProcess(keyword);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!result) throw new NotFoundException();

    return { status: result ? 'SUCCESS' : 'FAILED', data: result };
  }

  @Post()
  @HttpCode(200)
  async createProcess(@Body() body: Process) {
    let result: any;

    try {
      result = await this.processService.createProcess(body);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!result) throw new BadRequestException();

    return { status: result ? 'SUCCESS' : 'FAILED', data: result };
  }
}
