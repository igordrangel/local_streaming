import { SelectQueryBuilder } from "typeorm";
import { FilterBase } from "./FilterBase";

export class Filter<TypeEntity> extends FilterBase<TypeEntity> {
	
	constructor(qb: SelectQueryBuilder<TypeEntity>) {
		super(qb);
	}
	
	public addJoins(joins: {
		target: any;
		alias: string;
		condition: string;
	}[]) {
		joins.forEach(join => {
			this.qb.leftJoinAndSelect(join.target, join.alias, join.condition);
		});
		return this;
	}
}
