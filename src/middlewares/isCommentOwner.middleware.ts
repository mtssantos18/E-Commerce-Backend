import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Comment } from "../entities/comments.entity";
import AppError from "../errors/AppError";

const isCommentOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;

  const { commentId } = req.params;

  const commentRepository = AppDataSource.getRepository(Comment);

  const comment = await commentRepository.findOneBy({ id: commentId });

  if (id !== comment?.user.id) {
    throw new AppError("You must be comment owner to access this.", 401);
  }

  return next();
};

export default isCommentOwnerMiddleware;
