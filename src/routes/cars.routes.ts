import { Router } from "express";
import {
  createCarController,
  deleteCarController,
  listCarsController,
  listSpecificCarController,
  updateCarController,
} from "../controllers/cars.controllers";

const carRoutes = Router();

carRoutes.post("", createCarController);
carRoutes.get("", listCarsController);
carRoutes.get("/:carId", listSpecificCarController);
carRoutes.patch("/:carId", updateCarController);
carRoutes.delete("/:carId", deleteCarController);

export default carRoutes;
