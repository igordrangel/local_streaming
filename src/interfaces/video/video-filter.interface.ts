import { VideoCategoriaEnum } from "../../enums/video/video-categoria.enum";
import { VideoTipoEnum } from "../../enums/video/video-tipo.enum";

export interface VideoFilterInterface {
	titulo: string;
	categoria: VideoCategoriaEnum;
	tipo: VideoTipoEnum;
}
