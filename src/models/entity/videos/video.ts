import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { koala } from "koala-utils";

@Entity({name: "local_streaming_videos"})
export class Video {
	@PrimaryGeneratedColumn()
	private id: number;
	
	@Column({type: 'varchar', length: 150})
	private titulo_original: string;
	
	@Column({type: 'varchar', length: 150})
	private titulo?: string = null;
	
	@Column({type: 'varchar', length: 255})
	private arquivo: string;
	
	//#region [ID]
	public getId() {
		return this.id;
	}
	
	//#endregion
	
	//#region [TITULO ORIGINAL]
	public getTituloOriginal(): string {
		return this.titulo_original;
	}
	
	public setTituloOriginal(tituloOriginal: string) {
		this.titulo_original = tituloOriginal;
	}
	
	//#endregion
	
	//#region [TITULO]
	public getTitulo(): string {
		return this.titulo;
	}
	
	public setTitulo(titulo?: string) {
		this.titulo = titulo;
	}
	
	//#endregion
	
	//#region [ARQUIVO]
	public getArquivo() {
		return this.arquivo;
	}
	
	public setArquivo() {
		this.arquivo = koala('').string().random(255, true, true, true).getValue();
	}
	
	//#endregion
}
