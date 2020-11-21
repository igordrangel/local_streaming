import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationVideoVideoArquivo1605996783294 implements MigrationInterface {
    name = 'RelationVideoVideoArquivo1605996783294'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video_arquivo"
            ADD "videoId" integer`);
        await queryRunner.query(`ALTER TABLE "video_arquivo"
            ADD CONSTRAINT "FK_83522f321e53658bfcb0bc81079" FOREIGN KEY ("videoId") REFERENCES "video" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video_arquivo"
            DROP CONSTRAINT "FK_83522f321e53658bfcb0bc81079"`);
        await queryRunner.query(`ALTER TABLE "video_arquivo"
            DROP COLUMN "videoId"`);
    }
    
}
