import { Body, Controller, HttpCode, Get, Post, Query } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from 'src/exceptions';
import { VaccinationstationService } from './vaccinationstation.service';
import { VaccinationStation } from './dto';

@Controller('vaccinationstation')
export class VaccinationstationController {
    constructor(private readonly vaccinationstationService: VaccinationstationService) {}

    @Get()
    @HttpCode(200)
    async searchKeyword(@Query('keyword') keyword: string) {
      let result: any;
  
      try {
        result = await this.vaccinationstationService.searchVaccinationStation(keyword);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }

    @Get('count')
    @HttpCode(200)
    async countVaccinationStation() {
      let result: any;
  
      try {
        result = await this.vaccinationstationService.countDocuments();
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
        result = await this.vaccinationstationService.countSuccess();
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
        result = await this.vaccinationstationService.countUnSuccess();
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
  
    @Get('all')
    @HttpCode(200)
    async getAllVaccinationStation(
      @Query('currentPage') currentPage: string,
      @Query('perPage') perPage: string,
    ) {
      let result: any;
  
      try {
        result = await this.vaccinationstationService.getAllVaccinationStation(currentPage, perPage);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
  
    @Post()
    @HttpCode(200)
    async createVaccinationStation(@Body() body: VaccinationStation) {
      let result: any;
  
      try {
        result = await this.vaccinationstationService.createVaccinationStation(body);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new BadRequestException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }

}
