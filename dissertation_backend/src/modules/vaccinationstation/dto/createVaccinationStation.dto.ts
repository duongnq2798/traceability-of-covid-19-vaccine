import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class VaccinationStation {
    @IsNotEmpty()
    @IsString()
    readonly batchNo: string;

    @IsNotEmpty()
    @IsString()
    readonly quantity: string;

    @IsNotEmpty()
    @IsString()
    readonly arrivalDateTime: string;

    @IsNotEmpty()
    @IsString()
    readonly vaccinationStationId: string;

    @IsNotEmpty()
    @IsString()
    readonly shippingName: string;
    
    @IsNotEmpty()
    @IsString()
    readonly shippingNo: string;

    @IsNotEmpty()
    @IsString()
    readonly from: string;
  
    @IsNotEmpty()
    @IsString()
    readonly to: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly status: number;
  
    @IsNotEmpty()
    @IsString()
    readonly transactionHash: string;
  
    @IsNotEmpty()
    @IsString()
    readonly blockHash: string;
  
    @IsNotEmpty()
    @IsString()
    readonly blockNumber: string;
  
    @IsNotEmpty()
    @IsNumber()
    readonly confirmations: number;
  
    @IsNotEmpty()
    @IsNumber()
    readonly byzantium: number;
  
    @IsNotEmpty()
    @IsNumber()
    readonly transactionIndex: number;
}