import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVideoArquivo1605996298967 implements MigrationInterface {
    name = 'CreateVideoArquivo1605996298967'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "video_arquivo"
                                 (
                                     "id"       SERIAL                 NOT NULL,
                                     "filename" character varying(100) NOT NULL,
                                     "type"     character varying(10)  NOT NULL,
                                     CONSTRAINT "PK_4fa35419c846b0f46e529f41e6d" PRIMARY KEY ("id")
                                 )`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "video_arquivo"`);
    }
    
}
