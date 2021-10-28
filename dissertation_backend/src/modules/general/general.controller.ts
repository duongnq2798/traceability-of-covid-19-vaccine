import { Controller, Get } from '@nestjs/common';
import { GeneralService } from './general.service'
@Controller('general')
export class GeneralController {
    constructor(private readonly generalService: GeneralService) {}

    @Get('producer')
    async getProducer() {
        return this.generalService.getProducer(); 
    }

    @Get('distributor')
    async getDistributor() {
        return this.generalService.getDistributor(); 
    }

    @Get('warehouse')
    async getWarehouse() {
        return this.generalService.getWarehouse(); 
    }
}
