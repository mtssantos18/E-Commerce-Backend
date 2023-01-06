import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createCommentService from "../services/comments/createComment.service";
import deleteCommentService from "../services/comments/deleteComment.service";
import listCommentsService from "../services/comments/listComments.service";
import listSpecificCommentService from "../services/comments/listSpecificComment.service";
import updateCommentService from "../services/comments/updateComment.service";

export const createCommentController = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const commentData = req.body;

  const comment = await createCommentService(commentData, userId);

  return res.status(201).json(instanceToPlain(comment));
};

export const listCommentsController = async (req: Request, res: Response) => {
  const comments = await listCommentsService();

  return res.status(201).json(instanceToPlain(comments));
};

export const listSpecificCommentController = async (
  req: Request,
  res: Response
) => {
  const { commentId } = req.params;

  const comment = await listSpecificCommentService(commentId);

  return res.status(200).json(instanceToPlain(comment));
};

export const updateCommentController = async (req: Request, res: Response) => {
  const commentData = req.body;

  const { commentId } = req.params;

  const comment = await updateCommentService(commentData, commentId);

  return res.status(200).json(instanceToPlain(comment));
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const { commentId } = req.params;

  const deleteComment = await deleteCommentService(commentId);

  return res.status(204).json(deleteComment);
};
