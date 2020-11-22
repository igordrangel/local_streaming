import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Video from "../Video/Video";

@Entity()
export default class VideoArquivo {
	@PrimaryGeneratedColumn("increment")
	id: number;
	
	@Column({length: 100, nullable: false})
	filename: string;
	
	@Column({length: 10, nullable: false})
	type: string;
	
	@ManyToOne(type => Video, arquivos => VideoArquivo, {
		eager: true,
		cascade: true,
		onDelete: 'CASCADE'
	})
	video: Video;
	
	base64: string;
}
