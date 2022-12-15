import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1671103013982 implements MigrationInterface {
    name = 'initialMigration1671103013982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "km" integer NOT NULL, "year" integer NOT NULL, "coverImage" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carImages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "carId" uuid, CONSTRAINT "PK_d6c3be9847d30d3d4132b72ee57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "motorcycleImages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "motorcycleId" uuid, CONSTRAINT "PK_9c4e7db88498dfd3cc1a8aafcd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "motorcycle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "km" integer NOT NULL, "year" integer NOT NULL, "coverImage" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_376a2d7dc14cdf2c1b73fb4049d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carImages" ADD CONSTRAINT "FK_088e6bf0a92fa07cae1b17eb3de" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "motorcycleImages" ADD CONSTRAINT "FK_e9a8afe822e8be0059fd66fe9bf" FOREIGN KEY ("motorcycleId") REFERENCES "motorcycle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "motorcycleImages" DROP CONSTRAINT "FK_e9a8afe822e8be0059fd66fe9bf"`);
        await queryRunner.query(`ALTER TABLE "carImages" DROP CONSTRAINT "FK_088e6bf0a92fa07cae1b17eb3de"`);
        await queryRunner.query(`DROP TABLE "motorcycle"`);
        await queryRunner.query(`DROP TABLE "motorcycleImages"`);
        await queryRunner.query(`DROP TABLE "carImages"`);
        await queryRunner.query(`DROP TABLE "car"`);
    }

}
