import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VideoTipoEnum } from "../../../enums/video/video-tipo.enum";
import { VideoCategoriaEnum } from "../../../enums/video/video-categoria.enum";
import VideoArquivo from "./video-arquivo";

@Entity({name: "local_streaming_videos", engine: 'InnoDb'})
export default class Video {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column({type: 'varchar', length: 150})
	tituloOriginal: string;
	
	@Column({type: 'varchar', length: 150, nullable: true})
	titulo?: string = null;
	
	@Column({type: 'int'})
	categoria: VideoCategoriaEnum;
	
	@Column({type: 'int'})
	tipo: VideoTipoEnum;
	
	@OneToMany(type => VideoArquivo, video => Video, {
		cascade: true,
		eager: true
	})
	videoArquivos: VideoArquivo[];
}
