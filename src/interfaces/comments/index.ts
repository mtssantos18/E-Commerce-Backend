export interface ICommentRequest {
  text: string;
  vehicleId: string;
}

export interface ICommentUpdateRequest {
  text?: string;
  vehicleId?: string;
}
