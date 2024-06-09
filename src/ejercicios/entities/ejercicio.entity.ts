import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Ejercicio {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    muscle: string;

    @Prop({required: true})
    description: string;

    @Prop({required: false})
    image: string;

}

export const EjercicioSchema = SchemaFactory.createForClass(Ejercicio);