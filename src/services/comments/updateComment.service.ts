import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import AppError from "../../errors/AppError";
import { ICommentUpdateRequest } from "../../interfaces/comments";

const updateCommentService = async (
  { text, vehicleId }: ICommentUpdateRequest,
  commentId: string
) => {
  if (vehicleId) {
    throw new AppError("You cannot update property vehicle from comment.");
  }

  const commentRepository = AppDataSource.getRepository(Comment);

  const comment = await commentRepository.findOneBy({ id: commentId });

  if (!comment) {
    throw new AppError("Comment not found.", 404);
  }

  await commentRepository.update(comment!.id, {
    text: text ? text : comment.text,
  });

  const updatedComment = await commentRepository.findOneBy({ id: commentId });

  return updatedComment;
};

export default updateCommentService;
