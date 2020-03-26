import express from "express";
import { Entry } from "./models";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find()
      .sort({ date: -1 })
      .limit(20);
    res.send(entries);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/save", async (req, res) => {
  try {
    const entry = await Entry.create(req.body);
    res.status(201).send(entry.id);
  } catch (err) {
    res.status(500);
  }
});
export default router;
