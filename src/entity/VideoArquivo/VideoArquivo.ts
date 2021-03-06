import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Video from "../Video/Video";

@Entity()
export default class VideoArquivo {
	@PrimaryGeneratedColumn("increment")
	id: number;
	
	@Column({length: 150, nullable: false})
	titulo: string;
	
	@Column({nullable: true})
	temporada?: number = null;
	
	@Column({length: 100, nullable: false})
	filename: string;
	
	@Column({length: 50, nullable: false})
	type: string;
	
	@Column({length: 100, nullable: true})
	legendaFilename: string;
	
	@Column({nullable: false, default: false})
	current: boolean = false;
	
	@ManyToOne(type => Video, arquivos => VideoArquivo, {
		eager: true,
		cascade: true,
		onDelete: 'CASCADE'
	})
	video: Video;
	
	tmpFilename: string;
	
	legendaBase64: string;
}
