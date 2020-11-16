import { VideoCategoriaEnum } from "../../enums/video/video-categoria.enum";
import { VideoTipoEnum } from "../../enums/video/video-tipo.enum";
import { VideoArquivoInterface } from "./video-arquivo.interface";

export interface VideoInterface {
	id?: number;
	tituloOriginal: string;
	titulo?: string;
	categoria: VideoCategoriaEnum;
	tipo: VideoTipoEnum;
	arquivo: VideoArquivoInterface;
	ext: string;
}
