export interface IVehicleRequest {
  name: string;
  description: string;
  km: number;
  year: number;
  coverImage: string;
  price: number;
  type: string;
  vehiclePhotos: string[];
}

export interface IVehicleUpdateRequest {
  name?: string;
  description?: string;
  km?: number;
  year?: number;
  coverImage?: string;
  price?: number;
  type?: string;
  vehiclePhotos?: string[];
}
