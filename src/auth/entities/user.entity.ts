import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    @Prop({required: true})
    name: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true, minlength: 6})
    password: string;

    @Prop({required: true})
    isAdmin: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);