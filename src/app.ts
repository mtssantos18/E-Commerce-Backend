import express from "express";
import cors from "cors";
import "express-async-errors";
import "reflect-metadata";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import carRoutes from "./routes/cars.routes";
import motorcycleRoutes from "./routes/motorcycles.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/cars", carRoutes);
app.use("/motorcycles", motorcycleRoutes);

app.use(handleErrorMiddleware);

export default app;
