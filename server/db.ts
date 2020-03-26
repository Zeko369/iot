import mongoose from "mongoose";

const db = () => {
  const URI = process.env.DB || "";

  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
};

export default db;
