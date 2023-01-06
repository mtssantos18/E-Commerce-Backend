import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./comments.entity";
import { User } from "./users.entity";
import { VehicleImages } from "./vehicleImages.entity";

@Entity("vehicle")
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  km: number;

  @Column()
  year: number;

  @Column()
  coverImage: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => VehicleImages, (vehicleImages) => vehicleImages.vehicle, {
    eager: true,
  })
  vehicleImages: VehicleImages[];

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.vehicle)
  comment: Comment[];
}
