import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";

const listCommentsService = async (): Promise<Comment[]> => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comments = await commentRepository.find({
    relations: { vehicle: { user: true } },
  });

  return comments;
};

export default listCommentsService;
