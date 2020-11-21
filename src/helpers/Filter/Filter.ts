import { SelectQueryBuilder } from "typeorm";
import { FilterBase } from "./FilterBase";

export class Filter<TypeEntity> extends FilterBase<TypeEntity> {
	
	constructor(qb: SelectQueryBuilder<TypeEntity>) {
		super(qb);
	}
	
	public addJoinsOnList(joins: {
		mapToProperty: string;
		target: any;
		alias: string;
		condition: string;
	}[]) {
		joins.forEach(join => {
			this.qb.leftJoinAndMapMany(join.mapToProperty, join.target, join.alias, join.condition);
		});
		return this;
	}
	
	public addJoinsEntity(joins: {
		mapToProperty: string;
		target: any;
		alias: string;
		condition: string;
	}[]) {
		joins.forEach(join => {
			this.qb.leftJoinAndMapOne(join.mapToProperty, join.target, join.alias, join.condition);
		});
		return this;
	}
}
