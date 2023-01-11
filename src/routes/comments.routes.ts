import { Router } from "express";
import {
  createCommentController,
  deleteCommentController,
  listCommentsController,
  listSpecificCommentController,
  updateCommentController,
} from "../controllers/comments.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import isCommentOwnerMiddleware from "../middlewares/isCommentOwner.middleware";

const commentRoutes = Router();

commentRoutes.post("", authTokenMiddleware, createCommentController);
commentRoutes.get("", listCommentsController);
commentRoutes.get("/:commentId", listSpecificCommentController);
commentRoutes.patch(
  "/:commentId",
  authTokenMiddleware,
  isCommentOwnerMiddleware,
  updateCommentController
);
commentRoutes.delete(
  "/:commentId",
  authTokenMiddleware,
  isCommentOwnerMiddleware,
  deleteCommentController
);

export default commentRoutes;
