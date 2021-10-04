import { Controller, Get, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import {TemperatureService} from './temperature.service'


@Controller('temperature')
export class TemperatureController {
    constructor(private readonly temperatureService: TemperatureService,
    ) { }

    @Get()
    async findAll() {
        return this.temperatureService.getAll();
    }

    @Get('/deleteall/yes')
    async removeAll() {
        return this.temperatureService.removeAll();
    }

    @Post()
    async createTemp(@Body() payload: any): Promise<any> {
        try {
            const { temperature, humidity } = payload;
            if(!temperature) throw new HttpException('Data must have temperature', HttpStatus.BAD_REQUEST)
            if(!humidity) throw new HttpException('Data must have humidity', HttpStatus.BAD_REQUEST)
            return this.temperatureService.createTemp(payload)
        } catch (error) {
            throw new Error(error)
        }
    }
}
