import { getConnection, ObjectType } from "typeorm";

export const DB_CONNECTION_NAME = 'production';

export class DbConnectionFactory {
	
	public static getConnection<T>(repository: ObjectType<T>): T {
		return getConnection(DB_CONNECTION_NAME).getCustomRepository(repository);
	}
}
