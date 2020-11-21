import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVideo1605995964616 implements MigrationInterface {
    name = 'CreateVideo1605995964616'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "video"
                                 (
                                     "id"             SERIAL                 NOT NULL,
                                     "tituloOriginal" character varying(150) NOT NULL,
                                     "titulo"         character varying(150),
                                     "categoria"      integer,
                                     "tipo"           integer,
                                     CONSTRAINT "UQ_8056c1dd8eb34d181e5888dabfd" UNIQUE ("tituloOriginal"),
                                     CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id")
                                 )`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "video"`);
    }
    
}
