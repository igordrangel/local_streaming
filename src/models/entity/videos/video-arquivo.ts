import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video";

@Entity({name: "local_streaming_videos_arquivos"})
export class VideoArquivo {
	@PrimaryGeneratedColumn()
	private _id: number;
	
	get id() {
		return this._id;
	}
	
	@ManyToOne(type => Video, video => video.arquivos)
	@JoinColumn({name: 'id_video'})
	private _video: Video;
	
	get video(): Video {
		return this._video;
	}
	
	set video(value: Video) {
		this._video = value;
	}
	
	@Column({type: 'varchar', length: 100})
	private _filename: string;
	
	get filename(): string {
		return this._filename;
	}
	
	set filename(value: string) {
		this._filename = value;
	}
	
	@Column({type: 'varchar', length: 10})
	private _type: string;
	
	get type(): string {
		return this._type;
	}
	
	set type(value: string) {
		this._type = value;
	}
}
