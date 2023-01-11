import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1673442968074 implements MigrationInterface {
    name = 'initialMigration1673442968074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying, "zipCode" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicleImages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "vehicleId" uuid, CONSTRAINT "PK_ffdc96d130a4306242b6e8683af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "km" numeric(10,2) NOT NULL, "year" integer NOT NULL, "coverImage" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "cpf" character varying NOT NULL, "cellPhone" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "description" character varying, "isSeller" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "addressId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "vehicleId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicleImages" ADD CONSTRAINT "FK_d4494157be45b0ec3359b079556" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_86aea53f0b2b4f046e25e8315d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1780f918d3523791d18590d67a4" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1780f918d3523791d18590d67a4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_86aea53f0b2b4f046e25e8315d1"`);
        await queryRunner.query(`ALTER TABLE "vehicleImages" DROP CONSTRAINT "FK_d4494157be45b0ec3359b079556"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "vehicleImages"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
