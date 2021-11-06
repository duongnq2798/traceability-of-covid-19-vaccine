import { Body, Controller, HttpCode, Get, Post, Query } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from 'src/exceptions';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './dto';

@Controller('warehouse')
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) {}

    @Get()
    @HttpCode(200)
    async searchKeyword(@Query('keyword') keyword: string) {
      let result: any;
  
      try {
        result = await this.warehouseService.searchWarehouse(keyword);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }

    @Get('count')
    @HttpCode(200)
    async countWarehouse() {
      let result: any;
  
      try {
        result = await this.warehouseService.countDocuments();
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
  
    @Get('all')
    @HttpCode(200)
    async getProcess(
      @Query('currentPage') currentPage: string,
      @Query('perPage') perPage: string,
    ) {
      let result: any;
  
      try {
        result = await this.warehouseService.getAllWarehouse(currentPage, perPage);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
  
    @Post()
    @HttpCode(200)
    async createProcess(@Body() body?: Warehouse) {
      let result: any;
  
      try {
        result = await this.warehouseService.createWarehouse(body);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new BadRequestException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
}
