import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video";

@Entity({name: "local_streaming_videos_arquivos"})
export class VideoArquivo {
	@PrimaryGeneratedColumn()
	private id: number;
	@ManyToOne(() => Video, video => video.getArquivos)
	@JoinColumn({name: 'id_video', referencedColumnName: 'id'})
	private video: Video;
	@Column({type: 'varchar', length: 100})
	private filename: string;
	@Column({type: 'varchar', length: 10})
	private type: string;
	
	public getId(): number {
		return this.id;
	}
	
	public getVideo(): Video {
		return this.video;
	}
	
	public setVideo(video: Video) {
		this.video = video;
	}
	
	public getFilename(): string {
		return this.filename;
	}
	
	public setFilename(filename: string) {
		this.filename = filename;
	}
	
	public getType(): string {
		return this.type;
	}
	
	public setType(type: string) {
		this.type = type;
	}
}
