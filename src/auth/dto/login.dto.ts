import { MinLength, IsEmail, IsString } from "class-validator";

export class LoginDto{
    @IsEmail({}, {message: "Por favor, introduzca un email correcto"})
    email: string;

    @IsString()
    @MinLength(6)
    password: string
}