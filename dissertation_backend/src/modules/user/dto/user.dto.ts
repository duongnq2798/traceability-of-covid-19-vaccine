import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class User {
    @IsNotEmpty()
    @IsString()
    readonly userAddress: string

    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    readonly contactNo: string

    @IsNotEmpty()
    @IsString()
    readonly role: string

    @IsNotEmpty()
    @IsString()
    readonly isActive: string

    @IsNotEmpty()
    @IsString()
    readonly profileHash: string

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