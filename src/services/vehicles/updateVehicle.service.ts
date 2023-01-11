import AppDataSource from "../../data-source";
import { VehicleImages } from "../../entities/vehicleImages.entity";
import { Vehicle } from "../../entities/vehicles.entity";
import AppError from "../../errors/AppError";
import { IVehicleUpdateRequest } from "../../interfaces/vehicles";

const updateVehicleService = async (
  vehicleId: string,
  vehicleData: IVehicleUpdateRequest
): Promise<Vehicle> => {
  if (vehicleId.length !== 36) {
    throw new AppError("Invalid id format.");
  }

  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const vehicleImagesRepository = AppDataSource.getRepository(VehicleImages);

  const vehicle = await vehicleRepository.findOneBy({ id: vehicleId });

  if (!vehicle) {
    throw new AppError("Vehicle not found.", 404);
  }

  await vehicleRepository.update(vehicle.id, {
    name: vehicleData.name ? vehicleData.name : vehicle.name,
    description: vehicleData.description
      ? vehicleData.description
      : vehicle.description,
    km: vehicleData.km ? vehicleData.km : vehicle.km,
    year: vehicleData.year ? vehicleData.year : vehicle.year,
    coverImage: vehicleData.coverImage
      ? vehicleData.coverImage
      : vehicle.coverImage,
    price: vehicleData.price ? vehicleData.price : vehicle.price,
    type: vehicleData.type ? vehicleData.type : vehicle.type,
  });

  if (vehicleData.vehiclePhotos) {
    if (vehicleData.vehiclePhotos.length < 1) {
      throw new AppError("You must add at least one image to your vehicle.");
    }

    if (vehicleData.vehiclePhotos.length > 6) {
      throw new AppError("You can't add more than 6 images to your vehicle.");
    }

    await vehicleImagesRepository.delete({ vehicle: { id: vehicle.id } });

    vehicleData.vehiclePhotos.map(async (url) => {
      const newPhoto = vehicleImagesRepository.create({ url, vehicle });

      await vehicleImagesRepository.save(newPhoto);
    });
  }

  const updatedVehicle = await vehicleRepository.findOneBy({ id: vehicleId });

  return updatedVehicle!;
};

export default updateVehicleService;
