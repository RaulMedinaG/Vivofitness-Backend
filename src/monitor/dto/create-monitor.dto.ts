import { IsOptional, IsString } from "class-validator";

export class CreateMonitorDto {
    @IsString()
    name: string;

    @IsString()
    name_actividad: string;

    @IsOptional()
    @IsString()
    image: string;
}