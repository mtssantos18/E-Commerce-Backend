import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { User } from "../../entities/users.entity";
import { Vehicle } from "../../entities/vehicles.entity";
import AppError from "../../errors/AppError";
import { ICommentRequest } from "../../interfaces/comments";

const createCommentService = async (
  commentData: ICommentRequest,
  userId: string
): Promise<Comment> => {
  const { text, vehicleId } = commentData;

  console.log(text, vehicleId);

  if (!text) {
    throw new AppError("You must create a text.");
  }

  if (!vehicleId) {
    throw new AppError("You must send vehicleId.");
  }

  if (vehicleId.length !== 36) {
    throw new AppError("Vehicle invalid id format.");
  }

  const userRepository = AppDataSource.getRepository(User);
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const commentRepository = AppDataSource.getRepository(Comment);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const vehicle = await vehicleRepository.findOneBy({ id: vehicleId });

  if (!vehicle) {
    throw new AppError("Vehicle not found.", 404);
  }

  const comment = commentRepository.create({ text, user, vehicle });

  await commentRepository.save(comment);

  return comment;
};

export default createCommentService;
