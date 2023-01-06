import express from "express";
import cors from "cors";
import "express-async-errors";
import "reflect-metadata";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import vehicleRoutes from "./routes/vehicles.routes";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes";
import commentRoutes from "./routes/comments.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/login", sessionRoutes);
app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/comments", commentRoutes);

app.use(handleErrorMiddleware);

export default app;
