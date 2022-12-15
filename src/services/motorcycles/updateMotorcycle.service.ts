import AppDataSource from "../../data-source";
import { MotorcycleImages } from "../../entities/motorcycleImages.entity";
import { Motorcycle } from "../../entities/motorcycles.entity";
import AppError from "../../errors/AppError";
import { IMotorcycleUpdateRequest } from "../../interfaces/motorcycles";

const updateMotorcycleService = async (
  motorcycleId: string,
  motorcycleInfo: IMotorcycleUpdateRequest
): Promise<Motorcycle> => {
  if (motorcycleId.length !== 36) {
    throw new AppError("Invalid id format.");
  }
  const motorcycleRepository = AppDataSource.getRepository(Motorcycle);
  const motorcycleImagesRepository =
    AppDataSource.getRepository(MotorcycleImages);

  const motorcycle = await motorcycleRepository.findOneBy({ id: motorcycleId });

  if (!motorcycle) {
    throw new AppError("Motorcycle not found.", 404);
  }

  await motorcycleRepository.update(motorcycle.id, {
    name: motorcycleInfo.name ? motorcycleInfo.name : motorcycle.name,
    description: motorcycleInfo.description
      ? motorcycleInfo.description
      : motorcycle.description,
    km: motorcycleInfo.km ? motorcycleInfo.km : motorcycle.km,
    year: motorcycleInfo.year ? motorcycleInfo.year : motorcycle.year,
    coverImage: motorcycleInfo.coverImage
      ? motorcycleInfo.coverImage
      : motorcycle.coverImage,
    price: motorcycleInfo.price ? motorcycleInfo.price : motorcycle.price,
  });

  if (motorcycleInfo.motorcyclePhotos) {
    if (motorcycleInfo.motorcyclePhotos.length < 1) {
      throw new AppError("You must add at least one image to your motorcycle.");
    }

    if (motorcycleInfo.motorcyclePhotos.length > 6) {
      throw new AppError(
        "You can't add more than 6 images to your motorcycle."
      );
    }

    await motorcycleImagesRepository.delete({
      motorcycle: { id: motorcycle.id },
    });

    motorcycleInfo.motorcyclePhotos.map(async (url) => {
      const newPhoto = motorcycleImagesRepository.create({
        url,
        motorcycle,
      });

      await motorcycleImagesRepository.save(newPhoto);
    });
  }

  const updatedMotorcycle = await motorcycleRepository.findOneBy({
    id: motorcycleId,
  });

  return updatedMotorcycle!;
};

export default updateMotorcycleService;
