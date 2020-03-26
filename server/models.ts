import { Schema, model, Document } from "mongoose";

export interface IEntry extends Document {
  date: Date;
  temp: number;
  lux: number;
  hum: number;
}

const entrySchema = new Schema({
  date: { type: Date, default: Date.now },
  temp: Number,
  lux: Number,
  hum: Number
});

const Entry = model<IEntry>("Entry", entrySchema);

export { entrySchema, Entry };
