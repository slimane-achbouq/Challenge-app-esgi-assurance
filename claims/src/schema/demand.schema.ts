import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, now} from 'mongoose';

@Schema()
export class Demand extends Document {
    @Prop({required: true})
    reason: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop()
    decision: string;

    @Prop({default: "None"})
    additionalInfo: string;

    @Prop({required: true, default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const DemandSchema = SchemaFactory.createForClass(Demand);
