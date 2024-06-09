import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail({}, {message: "Por favor, introduzca un email correcto"})
    email: string;

    @IsString()
    name: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsBoolean()
    isAdmin: boolean;
}
