import { VideoCategoriaEnum } from "../../enums/video/video-categoria.enum";
import { VideoTipoEnum } from "../../enums/video/video-tipo.enum";

export interface VideoInterface {
	id?: number;
	tituloOriginal: string;
	titulo?: string;
	categoria: VideoCategoriaEnum;
	tipo: VideoTipoEnum;
	arquivo: string;
	ext: string;
}
