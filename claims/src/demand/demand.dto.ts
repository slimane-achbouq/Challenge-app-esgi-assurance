import {IsNotEmpty, IsString} from "class-validator";

export class CreateDemandDto {
    @IsNotEmpty()
    @IsString()
    reason: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}

export class UpdateDemandDto {
    @IsNotEmpty()
    @IsString()
    decision: string;

    @IsString()
    additionalInfo: string;
}