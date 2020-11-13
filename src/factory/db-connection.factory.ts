import { getConnection, ObjectType } from "typeorm";

export const DB_CONNECTION_NAME = 'localhost';

export class DbConnectionFactory {
	
	public static getRepository<T>(repository: ObjectType<T>): T {
		return getConnection(DB_CONNECTION_NAME).getCustomRepository(repository);
	}
}
