import { Router } from "express";

import {
  createMotorcycleController,
  deleteMotorcycleController,
  listMotorcyclesController,
  updateMotorcycleController,
} from "../controllers/motorcycles.controllers";

const motorcycleRoutes = Router();

motorcycleRoutes.post("", createMotorcycleController);
motorcycleRoutes.get("", listMotorcyclesController);
motorcycleRoutes.patch("/:motorcycleId", updateMotorcycleController);
motorcycleRoutes.delete("/:motorcycleId", deleteMotorcycleController);

export default motorcycleRoutes;
