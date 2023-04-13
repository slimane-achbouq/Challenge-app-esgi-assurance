import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Kpi extends Document {
    @Prop({required: true})
    id_visitor: string;

    @Prop({required: true})
    id_visit: string;

    @Prop({required: true})
    tag: string;

    @Prop({required: true})
    event: string;

    @Prop({required: true})
    content: string;
}

export const KpiSchema = SchemaFactory.createForClass(Kpi);
