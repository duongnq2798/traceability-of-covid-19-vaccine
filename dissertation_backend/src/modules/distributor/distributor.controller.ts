import { Body, Controller, HttpCode, Get, Post, Query } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from 'src/exceptions';
import { DistributorService } from './distributor.service';
import { Distributor } from './dto';

@Controller('distributor')
export class DistributorController {
    constructor(private readonly distributorService: DistributorService) {}
    
  @Get()
  @HttpCode(200)
  async searchKeyword(@Query('keyword') keyword: string) {
    let result: any;

    try {
      result = await this.distributorService.searchDistributor(keyword);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!result) throw new NotFoundException();

    return { status: result ? 'SUCCESS' : 'FAILED', data: result };
  }

  @Get('count')
  @HttpCode(200)
  async countDistributor() {
    let result: any;

    try {
      result = await this.distributorService.countDocuments();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return { status: result ? 'SUCCESS' : 'FAILED', data: result };
  }

  @Get('countsuccess')
  @HttpCode(200)
  async countSuccess() {
    let result: any;

    try {
      result = await this.distributorService.countSuccess();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return { status: result ? 'SUCCESS' : 'FAILED', data: result };
  }

  @Get('countunsuccess')
  @HttpCode(200)
  async countUnSuccess() {
    let result: any;

    try {
      result = await this.distributorService.countUnSuccess();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return { status: result ? 'SUCCESS' : 'FAILED', data: result };
  }

  @Get('all')
  @HttpCode(200)
  async getDistributor(
    @Query('currentPage') currentPage: string,
    @Query('perPage') perPage: string,
  ) {
    let result: any;

    try {
      result = await this.distributorService.getAllDistributor(currentPage, perPage);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!result) throw new NotFoundException();

    return { status: result ? 'SUCCESS' : 'FAILED', data: result };
  }

  @Post()
  @HttpCode(200)
  async createDistributor(@Body() body: Distributor) {
    let result: any;

    try {
      result = await this.distributorService.createDistributor(body);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if (!result) throw new BadRequestException();

    return { status: result ? 'SUCCESS' : 'FAILED', data: result };
  }
}
