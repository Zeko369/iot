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
  hum: Number,
  device: { type: Schema.Types.ObjectId, ref: "Device" },
});

const Entry = model<IEntry>("Entry", entrySchema);

export interface IDevice extends Document {
  name: string;
}

const deviceSchema = new Schema({
  name: String,
  entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
});

const Device = model<IDevice>("Device", deviceSchema);

export { entrySchema, Entry, deviceSchema, Device };
