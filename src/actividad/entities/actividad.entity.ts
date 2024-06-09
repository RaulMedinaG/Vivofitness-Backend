import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Actividad {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    hourhand: string;

    @Prop({required: false})
    image: string;

    @Prop({required: true})
    participants: number;

    @Prop({required: true})
    registered: [];

    @Prop({required: true})
    waiting_list: [];

}

export const ActividadSchema = SchemaFactory.createForClass(Actividad);