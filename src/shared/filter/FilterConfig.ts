export class FilterConfig {
	private _group?: string;
	
	get group(): string {
		return this._group;
	}
	
	set group(value: string) {
		this._group = value;
	}
	
	private _collumName: string;
	
	get collumName(): string {
		return this._collumName;
	}
	
	set collumName(value: string) {
		this._collumName = value;
	}
	
	private _comparator: string;
	
	get comparator(): string {
		return this._comparator;
	}
	
	set comparator(value: string) {
		this._comparator = value;
	}
	
	private _value: string | [];
	
	get value(): string | [] {
		return this._value;
	}
	
	set value(value: string | []) {
		this._value = value;
	}
	
	private _alias: string;
	
	get alias(): string {
		return this._alias;
	}
	
	set alias(value: string) {
		this._alias = value;
	}
}
