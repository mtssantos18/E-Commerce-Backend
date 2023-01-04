import { Router } from "express";
import {
  createVehicleController,
  deleteVehicleController,
  listSpecificVehicleController,
  listVehiclesController,
  updateVehicleController,
} from "../controllers/vehicles.controllers";

import authTokenMiddleware from "../middlewares/authToken.middleware";
import checkIsOwnerMiddleware from "../middlewares/checkIsOwner.middleware";
import checkIsSellerMiddleware from "../middlewares/checkIsSeller.middleware";

const vehicleRoutes = Router();

vehicleRoutes.post(
  "",
  authTokenMiddleware,
  checkIsSellerMiddleware,
  createVehicleController
);
vehicleRoutes.get("", listVehiclesController);
vehicleRoutes.get("/:vehicleId", listSpecificVehicleController);
vehicleRoutes.patch(
  "/:vehicleId",
  authTokenMiddleware,
  checkIsOwnerMiddleware,
  updateVehicleController
);
vehicleRoutes.delete(
  "/:vehicleId",
  authTokenMiddleware,
  checkIsOwnerMiddleware,
  deleteVehicleController
);

export default vehicleRoutes;
