import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";

import db from "./db";
import router from "./router";

config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(router);

(async () => {
  await db();
  app.listen(5000, () => {
    console.log("Listening on: http://localhost:5000");
  });
})();
