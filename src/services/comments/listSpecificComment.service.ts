import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import AppError from "../../errors/AppError";

const listSpecificCommentService = async (
  commentId: string
): Promise<Comment> => {
  if (commentId.length !== 36) {
    throw new AppError("Invalid id format.");
  }

  const commentRepository = AppDataSource.getRepository(Comment);

  const comment = await commentRepository.findOne({
    where: { id: commentId },
    relations: { vehicle: { user: true } },
  });

  if (!comment) {
    throw new AppError("Comment not found.", 404);
  }

  return comment;
};

export default listSpecificCommentService;
