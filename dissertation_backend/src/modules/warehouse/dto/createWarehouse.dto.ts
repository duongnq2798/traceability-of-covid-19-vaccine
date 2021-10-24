import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

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
  @IsString()
  readonly price: string;

  @IsNotEmpty()
  @IsString()
  readonly optimumTemp: string;

  @IsNotEmpty()
  @IsString()
  readonly optimumHum: string;

  @IsNotEmpty()
  @IsString()
  readonly storageDate: string;

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
  @IsString()
  readonly status: string;

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
  @IsString()
  readonly confirmations: string;

  @IsNotEmpty()
  @IsString()
  readonly byzantium: string;

  @IsNotEmpty()
  @IsString()
  readonly transactionIndex: string;

  @IsNotEmpty()
  @IsString()
  readonly contractAddress: string;
  
  @IsNotEmpty()
  @IsString()
  readonly nextAcction: string;
}
