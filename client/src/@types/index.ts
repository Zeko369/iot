export type Action =
  | { type: "loading" }
  | { type: "error"; payload: string }
  | { type: "success"; payload: any[] };

export interface IEntry {
  _id: string;
  temp: number;
  hum: number;
  lux: number;
  date: string;
  __v: number;
}

export interface IState {
  loading: boolean;

  data: IEntry[];
  error: string;
}
