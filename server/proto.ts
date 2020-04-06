import { config } from "dotenv";

import db from "./db";
import { Entry } from "./models";
import { disconnect } from "mongoose";

config();
db()
  .then(() => {
    return Entry.find({
      date: { $gt: new Date("2020-04-05T20:30:27.428+00:00") },
    });
  })
  .then((entries) => {
    entries.forEach((row) => {
      console.log(`${row.temp}`);
    });
  })
  .catch((err) => console.error(err))
  .finally(() => disconnect());
