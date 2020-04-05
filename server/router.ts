import express from "express";
import { Entry } from "./models";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 }).limit(20);
    res.send(entries);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/save", async (req, res) => {
  try {
    const entity = {
      temp: req.body.temp,
      lux: req.body.lux,
      hum: req.body.hum,
    };

    console.log(req.body.device_id);

    const entry = await Entry.create(entity);
    res.status(201).send(entry.id);
  } catch (err) {
    res.status(500);
  }
});

export default router;
