import { EntityTarget, getConnection } from "typeorm";
import { Filter } from "./Filter";

export default class FilterService {
	public static search<TypeEntity>(
		targetEntity: EntityTarget<TypeEntity>,
		selectAlias  = "e",
		withDistinct = false
	) {
		const qb = getConnection()
			.getRepository(targetEntity)
			.createQueryBuilder(selectAlias);
		if (withDistinct) qb.distinct(true);
		return new Filter<TypeEntity>(qb);
	}
}
