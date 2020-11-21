import { RepositoryBase } from "../../../shared/RepositoryBase";
import { koala } from "koala-utils";
import { VideoArquivoInterface } from "../../../interfaces/video/video-arquivo.interface";
import VideoArquivo from "../../entity/videos/video-arquivo";

export class VideoArquivoRepositorio extends RepositoryBase<VideoArquivo> {
	
	constructor() {
		super(VideoArquivo);
	}
	
	public enviar(arquivo: VideoArquivoInterface) {
		const videoArquivo = new VideoArquivo();
		videoArquivo.filename = koala('')
			.string()
			.random(35, true, true, true)
			.concat(`.${arquivo.filename.split('.')[1]}`)
			.getValue();
		videoArquivo.type = arquivo.type;
		return videoArquivo;
	}
}
