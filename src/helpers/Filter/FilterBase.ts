import { SelectQueryBuilder } from "typeorm";
import { koala } from "koala-utils";

interface filterOptions {
	collumName: string;
	comparator: '=' | '!=' | 'like';
	value: any;
}

export abstract class FilterBase<TypeEntity> {
	private parseStringTypes: string[] = []
	
	protected constructor(protected qb: SelectQueryBuilder<TypeEntity>) {}
	
	public and(option: filterOptions) {
		if (option.value) {
			const parseString = this.generateParseString(option.collumName);
			this.qb.andWhere(
				this.createConditionString(option, parseString),
				{[parseString]: this.validateValue(option)}
			);
		}
		return this;
	}
	
	public or(options: filterOptions | filterOptions[]) {
		if (Array.isArray(options)) {
			const conditionsOr: string[] = [];
			const params: any = {};
			options.forEach((option, index) => {
				if (option.value) {
					const parseString = this.generateParseString(option.collumName);
					conditionsOr.push(this.createConditionString(option, parseString));
					params[parseString] = this.validateValue(option);
				}
			});
			if (conditionsOr.length > 0) {
				this.qb.andWhere(
					`(${koala(conditionsOr).array().toString(' OR ').getValue()})`,
					params
				);
			}
		} else {
			if (options.value) {
				const parseString = this.generateParseString(options.collumName);
				this.qb.orWhere(
					this.createConditionString(options, parseString),
					{[parseString]: this.validateValue(options)}
				);
			}
		}
		return this;
	}
	
	public orderBy(sort?: string, order?: 'ASC' | 'DESC') {
		if (sort) this.qb.orderBy(sort, order);
		return this;
	}
	
	public getData() {
		return this.qb.getMany();
	}
	
	public getOne() {
		return this.qb.getOne();
	}
	
	public count() {
		return this.qb.getCount();
	}
	
	private generateParseString(collumName: string) {
		let parseStringName = collumName;
		let numParam = 0;
		let parseString;
		do {
			parseString = parseStringName + numParam;
			numParam++;
		} while (this.parseStringTypes.indexOf(parseString) >= 0);
		this.parseStringTypes.push(parseString);
		
		return parseString;
	}
	
	private createConditionString(options: filterOptions, parseString: string) {
		let conditionString: string;
		switch (options.comparator) {
			case "=":
			case "!=":
			case "like":
				conditionString = `${options.collumName} ${options.comparator} :${parseString}`;
				break;
		}
		
		return conditionString;
	}
	
	private validateValue(option: filterOptions) {
		switch (option.comparator) {
			case "like":
				option.value = `%${option.value}%`;
				break;
		}
		
		return option.value;
	}
}
