import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MotorcycleImages } from "./motorcycleImages.entity";

@Entity("motorcycle")
export class Motorcycle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  km: number;

  @Column()
  year: number;

  @Column()
  coverImage: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => MotorcycleImages,
    (motorcycleImages) => motorcycleImages.motorcycle,
    { eager: true }
  )
  motorcycleImages: MotorcycleImages[];
}
