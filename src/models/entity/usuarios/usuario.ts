import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "local_streaming_usuarios"})
export class Usuario {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column({type: 'varchar', length: 50})
	login: string;
	
	@Column({type: 'varchar', length: 16})
	senha: string;
}
