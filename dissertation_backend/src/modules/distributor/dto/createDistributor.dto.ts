import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class Distributor {
    @IsNotEmpty()
    @IsString()
    batchNo: string;
    @IsNotEmpty()
    @IsString()
    shippingName: string;
    @IsNotEmpty()
    @IsString()
    shippingNo: string;
    @IsNotEmpty()
    @IsString()
    quantity: string;
    @IsNotEmpty()
    @IsString()
    departureDateTime: string;
    @IsNotEmpty()
    @IsString()
    estimateDateTime: string;
    @IsNotEmpty()
    @IsString()
    distributorId: string;
    @IsNotEmpty()
    @IsString()
    optimumTemp: string;
    @IsNotEmpty()
    @IsString()
    optimumHum: string;

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