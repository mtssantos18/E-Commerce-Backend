import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./cars.entity";

@Entity("carImages")
export class CarImages {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Car, { onDelete: "CASCADE" })
  car: Car;
}
