import { SelectQueryBuilder } from "typeorm";
import { FilterBase } from "./FilterBase";

export class Filter<TypeEntity> extends FilterBase<TypeEntity> {
	
	constructor(qb: SelectQueryBuilder<TypeEntity>) {
		super(qb);
	}
	
	public addJoins(joins: []) {
		return this;
	}
}
