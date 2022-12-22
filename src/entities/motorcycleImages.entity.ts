import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Motorcycle } from "./motorcycles.entity";

@Entity("motorcycleImages")
export class MotorcycleImages {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Motorcycle, { onDelete: "CASCADE" })
  motorcycle: Motorcycle;
}
