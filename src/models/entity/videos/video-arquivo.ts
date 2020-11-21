import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Video from "./video";

@Entity({name: "local_streaming_videos_arquivos", engine: 'InnoDb'})
export default class VideoArquivo {
	@PrimaryGeneratedColumn()
	id: number;
	
	@ManyToOne(type => Video, arquivos => VideoArquivo)
	video: Video;
	
	@Column({type: 'varchar', length: 100})
	filename: string;
	
	@Column({type: 'varchar', length: 10})
	type: string;
}
