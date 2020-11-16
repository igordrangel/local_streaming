import { getConnection, ObjectType, QueryRunner } from "typeorm";

export const DB_CONNECTION_NAME = 'localhost';

export class DbConnectionFactory {
	
	public static getRepository<T>(repository: ObjectType<T>): T {
		return getConnection(DB_CONNECTION_NAME).getCustomRepository(repository);
	}
	
	public static async getQueryRunner(): Promise<QueryRunner> {
		const queryRunner = getConnection(DB_CONNECTION_NAME).createQueryRunner();
		await queryRunner.connect();
		return queryRunner;
	}
}
