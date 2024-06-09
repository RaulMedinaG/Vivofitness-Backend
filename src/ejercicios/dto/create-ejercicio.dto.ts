import { IsOptional, IsString } from "class-validator";

export class CreateEjercicioDto {
    @IsString()
    name: string;

    @IsString()
    muscle: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image: string;
}