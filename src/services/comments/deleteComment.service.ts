import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import AppError from "../../errors/AppError";

const deleteCommentService = async (commentId: string) => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comment = await commentRepository.findOneBy({ id: commentId });

  if (!comment) {
    throw new AppError("Comment not found.", 404);
  }

  await commentRepository.delete({ id: commentId });

  return true;
};

export default deleteCommentService;
