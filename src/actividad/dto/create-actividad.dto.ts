import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateActividadDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    hourhand: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsNumber()
    participants: number;

    @IsArray()
    registered: [];

    @IsArray()
    waiting_list: [];
}