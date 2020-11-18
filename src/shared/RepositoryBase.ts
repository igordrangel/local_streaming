import { EntityTarget, getConnection, QueryRunner, Repository, SelectQueryBuilder } from "typeorm";
import { DB_CONNECTION_NAME } from "../factory/db-connection.factory";
import { Filter } from "./filter/Filter";

export abstract class RepositoryBase<TypeEntity> extends Repository<TypeEntity> {
	protected qb: SelectQueryBuilder<TypeEntity>;
	protected queryRunnerBase: QueryRunner;
	
	private selectAlias = "e";
	
	protected constructor(private targetEntity: EntityTarget<TypeEntity>, withDistinct = false) {
		super();
		this.qb = getConnection(DB_CONNECTION_NAME)
			.getRepository(targetEntity)
			.createQueryBuilder((withDistinct ? 'DISTINCT ' : '') + this.selectAlias)
	}
	
	public async beginTransaction() {
		this.queryRunnerBase = await this.getQueryRunner();
		await this.queryRunnerBase.startTransaction();
	}
	
	public async commit() {
		await this.queryRunnerBase.commitTransaction();
	}
	
	public async rollback() {
		await this.queryRunnerBase.rollbackTransaction();
	}
	
	public async saveData(entity: TypeEntity) {
		try {
			const tmpEntity = entity as any;
			if (entity.hasOwnProperty('id') && tmpEntity.id) {
				await this.queryRunnerBase.manager.update(this.targetEntity, tmpEntity.id, entity).catch(e => {
					throw e;
				});
			} else {
				await this.queryRunnerBase.manager.insert(this.targetEntity, entity).catch(e => {
					throw e;
				});
			}
		} catch (e) {
			throw e;
		}
	}
	
	public search() {
		return new Filter<TypeEntity>(this.qb);
	}
	
	private async getQueryRunner() {
		const queryRunner = getConnection(DB_CONNECTION_NAME).createQueryRunner();
		await queryRunner.connect();
		return queryRunner;
	}
}
