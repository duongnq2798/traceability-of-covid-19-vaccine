import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';

export class Warehouse {
  @IsNotEmpty()
  @IsString()
  readonly batchNo: string;

  @IsNotEmpty()
  @IsString()
  readonly vaccineName: string;

  @IsNotEmpty()
  @IsString()
  readonly quantity: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isViolation: boolean;

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

  @IsNotEmpty()
  @IsString()
  readonly contractAddress: string;
}
