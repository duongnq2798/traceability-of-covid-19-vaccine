import { Body, Controller, HttpCode, Get, Post, Query } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from 'src/exceptions';
import { UserService } from './user.service';
import { User } from './dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(200)
    async searchKeyword(@Query('keyword') keyword: string) {
      let result: any;
  
      try {
        result = await this.userService.searchProcess(keyword);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }

    @Get('role')
    @HttpCode(200)
    async role() {
      let result: any;
  
      try {
        result = await this.userService.getUserRole();
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }

    @Get('countrole')
    @HttpCode(200)
    async countUserRole() {
      let result: any;
  
      try {
        result = await this.userService.getUserRole();
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result.length };
    }

    @Get('count')
    @HttpCode(200)
    async countUser() {
      let result: any;
  
      try {
        result = await this.userService.countDocuments();
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
        result = await this.userService.getAllProcess(currentPage, perPage);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new NotFoundException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
  
    @Post()
    @HttpCode(200)
    async createProcess(@Body() body: User) {
      let result: any;
  
      try {
        result = await this.userService.createProcess(body);
      } catch (error) {
        throw new InternalServerErrorException();
      }
  
      if (!result) throw new BadRequestException();
  
      return { status: result ? 'SUCCESS' : 'FAILED', data: result };
    }
}
