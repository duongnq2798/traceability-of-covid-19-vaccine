import { IsNotEmpty, IsString } from 'class-validator';

export class Process {
    @IsNotEmpty()
    @IsString()
    readonly batchNo: string
    @IsNotEmpty()
    @IsString()
    readonly producer: string
    @IsNotEmpty()
    @IsString()
    readonly warehouse: string
    @IsNotEmpty()
    @IsString()
    readonly distributor: string
    @IsNotEmpty()
    @IsString()
    readonly vaccinationStation: string
    @IsNotEmpty()
    @IsString()
    readonly totalWeight: string
    @IsNotEmpty()
    @IsString()
    readonly from: string
    @IsNotEmpty()
    @IsString()
    readonly to: string
    @IsNotEmpty()
    @IsString()
    readonly status: string
    @IsNotEmpty()
    @IsString()
    readonly transactionHash: string
    @IsNotEmpty()
    @IsString()
    readonly blockHash: string
    @IsNotEmpty()
    @IsString()
    readonly blockNumber: string
    @IsNotEmpty()
    @IsString()
    readonly confirmations: string
    @IsNotEmpty()
    @IsString()
    readonly byzantium: string
    @IsNotEmpty()
    @IsString()
    readonly transactionIndex: string
    @IsNotEmpty()
    @IsString()
    readonly contractAddress: string
    @IsNotEmpty()
    @IsString()
    readonly nextAcction: string
}