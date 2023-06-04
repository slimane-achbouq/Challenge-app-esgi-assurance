import {IsNotEmpty, IsString} from "class-validator";

export class CreateDemandDto {
    @IsNotEmpty()
    @IsString()
    insuarnce_id: string;

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
    insurance_id: string;

    @IsNotEmpty()
    @IsString()
    decision: string;

    @IsString()
    additionalInfo: string;
}