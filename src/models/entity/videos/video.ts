import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { koala } from "koala-utils";
import { VideoTipoEnum } from "../../../enums/video/video-tipo.enum";
import { VideoCategoriaEnum } from "../../../enums/video/video-categoria.enum";

@Entity({name: "local_streaming_videos"})
export class Video {
	@PrimaryGeneratedColumn()
	private id: number;
	
	@Column({type: 'varchar', length: 150})
	private tituloOriginal: string;
	
	@Column({type: 'varchar', length: 150, nullable: true})
	private titulo?: string = null;
	
	@Column({type: 'int'})
	private categoria: VideoCategoriaEnum;
	
	@Column({type: 'int'})
	private tipo: VideoTipoEnum;
	
	@Column({type: 'varchar', length: 255})
	private arquivo: string;
	
	//#region [ID]
	public getId() {
		return this.id;
	}
	
	//#endregion
	
	//#region [TITULO ORIGINAL]
	public getTituloOriginal(): string {
		return this.tituloOriginal;
	}
	
	public setTituloOriginal(tituloOriginal: string) {
		this.tituloOriginal = tituloOriginal;
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
	
	//#region [CATEGORIA]
	public getCategoria(): VideoCategoriaEnum {
		return this.categoria;
	}
	
	public setCategoria(categoria: VideoCategoriaEnum) {
		this.categoria = categoria;
	}
	
	//#endregion
	
	//#region [TIPO]
	public getTipo(): VideoTipoEnum {
		return this.tipo;
	}
	
	public setTipo(tipo: VideoTipoEnum) {
		this.tipo = tipo;
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
