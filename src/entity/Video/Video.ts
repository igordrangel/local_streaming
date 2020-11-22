import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VideoCategoriaEnum } from "./VideoCategoriaEnum";
import { VideoTipoEnum } from "./VideoTipoEnum";
import VideoArquivo from "../VideoArquivo/VideoArquivo";

@Entity()
export default class Video {
	@PrimaryGeneratedColumn("increment")
	id: number;
	
	@Column({length: 150, nullable: false})
	tituloOriginal: string;
	
	@Column({length: 150, nullable: true})
	titulo?: string = null;
	
	@Column({nullable: true})
	categoria: VideoCategoriaEnum;
	
	@Column({nullable: true})
	tipo: VideoTipoEnum;
	
	@OneToMany(type => VideoArquivo, video => Video)
	arquivos: VideoArquivo[];
}
