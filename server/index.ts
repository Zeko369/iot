import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";

import db from "./db";
import router from "./router";

const PORT = 5000;

config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(router);

(async () => {
  await db();
  app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });
})();
