import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";

import db from "./db";
import { Entry } from "./models";

config();

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

app.get("/", async (req, res) => {
  try {
    const entries = await Entry.find()
      .sort({ date: -1 })
      .limit(20);
    res.send(entries);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/save", async (req, res) => {
  try {
    const entry = await Entry.create(req.body);
    res.status(201).send("Hello");
  } catch (err) {
    res.status(500);
  }
});

db()
  .then(() => {
    app.listen(5000, () => {
      console.log("Listening on: http://localhost:5000");
    });
  })
  .catch(err => {
    console.error(err);
  });
