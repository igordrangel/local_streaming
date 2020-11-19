import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { koala } from "koala-utils";
import { VideoTipoEnum } from "../../../enums/video/video-tipo.enum";
import { VideoCategoriaEnum } from "../../../enums/video/video-categoria.enum";
import { VideoArquivoInterface } from "../../../interfaces/video/video-arquivo.interface";
import { VideoArquivo } from "./video-arquivo";

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
	
	@OneToMany(type => VideoArquivo, arquivo => arquivo.video, {
		cascade: ['insert', "update"]
	})
	private _arquivos: VideoArquivo[];
	
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
	
	//#region [ARQUIVOS]
	get arquivos(): VideoArquivo[] {
		return this._arquivos;
	}
	
	public addArquivo(arquivo: VideoArquivoInterface): VideoArquivo {
		if (!this._arquivos) this._arquivos = [];
		const videoArquivo = new VideoArquivo();
		videoArquivo.filename = koala('')
			.string()
			.random(35, true, true, true)
			.concat(`.${arquivo.filename.split('.')[1]}`)
			.getValue();
		videoArquivo.type = arquivo.type;
		this._arquivos.push(videoArquivo);
		return videoArquivo;
	}
	
	//#endregion
}
