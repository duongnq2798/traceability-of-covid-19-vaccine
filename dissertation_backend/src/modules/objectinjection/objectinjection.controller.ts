import { Body, Controller, HttpCode, Get, Post, Query } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from 'src/exceptions';
import { ObjectinjectionService } from './objectinjection.service';
import { ObjectInjection } from './dto';

@Controller('objectinjection')
export class ObjectinjectionController {
    constructor(private readonly objectinjectionService:ObjectinjectionService ) {}

    @Get()
    @HttpCode(200)
    async searchKeyword(@Query('keyword') keyword: string) {
      let result: any;
  
      try {
        result = await this.objectinjectionService.searchObjectInjection(keyword);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }

    @Get('count')
    @HttpCode(200)
    async countObjectInjection() {
      let result: any;
  
      try {
        result = await this.objectinjectionService.countDocuments();
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
        result = await this.objectinjectionService.countSuccess();
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
        result = await this.objectinjectionService.countUnSuccess();
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
  
    @Get('all')
    @HttpCode(200)
    async getObjectinjection(
      @Query('currentPage') currentPage: string,
      @Query('perPage') perPage: string,
    ) {
      let result: any;
  
      try {
        result = await this.objectinjectionService.getAllPObjectInjection(currentPage, perPage);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
  
    @Post()
    @HttpCode(200)
    async createObjectinjection(@Body() body: ObjectInjection) {
      let result: any;
  
      try {
        result = await this.objectinjectionService.createObjectInjection(body);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new BadRequestException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
}
