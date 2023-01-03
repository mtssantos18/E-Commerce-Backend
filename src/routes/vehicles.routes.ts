import { Router } from "express";
import {
  createVehicleController,
  deleteVehicleController,
  listSpecificVehicleController,
  listVehiclesController,
  updateVehicleController,
} from "../controllers/vehicles.controllers";

const vehicleRoutes = Router();

vehicleRoutes.post("", createVehicleController);
vehicleRoutes.get("", listVehiclesController);
vehicleRoutes.get("/:vehicleId", listSpecificVehicleController);
vehicleRoutes.patch("/:vehicleId", updateVehicleController);
vehicleRoutes.delete("/:vehicleId", deleteVehicleController);

export default vehicleRoutes;
