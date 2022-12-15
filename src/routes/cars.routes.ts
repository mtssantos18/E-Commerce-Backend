import { Router } from "express";
import {
  createCarController,
  deleteCarController,
  listCarsController,
  updateCarController,
} from "../controllers/cars.controllers";

const carRoutes = Router();

carRoutes.post("", createCarController);
carRoutes.get("", listCarsController);
carRoutes.patch("/:carId", updateCarController);
carRoutes.delete("/:carId", deleteCarController);

export default carRoutes;
