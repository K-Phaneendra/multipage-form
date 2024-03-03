import express from "express";
import cors from "cors";

import formRouter from './routers/form.js';

const app = express();

app.use(cors({ origin: "*" }));

app.use("/form", formRouter)

app.get("/", (req, res) => {
  res.send("This is API server");
});

export default app;
