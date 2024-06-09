import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Monitor {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    name_actividad: string;

    @Prop({required: false})
    image: string;

}

export const MonitorSchema = SchemaFactory.createForClass(Monitor);