import express from "express";
import cors from "cors";
import "express-async-errors";
import "reflect-metadata";
import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.use(handleErrorMiddleware);

export default app;
