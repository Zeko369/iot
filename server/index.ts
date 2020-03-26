import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

interface IData {
  data: {
    temperature: number;
    humidity: number;
  };
  time: Date;
}

let data: IData[] = [];

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/data", (req, res) => {
  res.send(data);
});

app.post("/save", (req, res) => {
  console.log(req.body);
  res.status(201).send("Hello");
});

app.listen(3000, () => {
  console.log("Listening on: http://localhost:3000");
});
