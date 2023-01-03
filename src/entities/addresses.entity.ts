import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;
}
