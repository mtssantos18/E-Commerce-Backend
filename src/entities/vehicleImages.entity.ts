import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicles.entity";

@Entity("vehicleImages")
export class VehicleImages {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Vehicle, { onDelete: "CASCADE" })
  vehicle: Vehicle;
}
