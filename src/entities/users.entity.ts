import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./addresses.entity";
import { Comment } from "./comments.entity";
import { Vehicle } from "./vehicles.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  fullName: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  cellPhone: string;

  @Column()
  birthDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isSeller: boolean;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => Address, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user, { onDelete: "CASCADE" })
  vehicle: Vehicle[];

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: "CASCADE" })
  comment: Comment[];
}
