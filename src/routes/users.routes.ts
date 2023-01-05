import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listSpecificUserController,
  listUsersController,
  updateUserAddressController,
  updateUserController,
} from "../controllers/users.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import checkCpfMiddleware from "../middlewares/checkCpf.middleware";
import checkEmailMiddleware from "../middlewares/checkEmail.middleware";

const userRoutes = Router();

userRoutes.post(
  "",
  checkEmailMiddleware,
  checkCpfMiddleware,
  createUserController
);
userRoutes.get("", listUsersController);
userRoutes.get("/:userId", listSpecificUserController);
userRoutes.patch(
  "/:userId",
  authTokenMiddleware,
  checkEmailMiddleware,
  checkCpfMiddleware,
  updateUserController
);
userRoutes.patch(
  "/address/:userId",
  authTokenMiddleware,
  updateUserAddressController
);
userRoutes.delete("/:userId", authTokenMiddleware, deleteUserController);

export default userRoutes;
