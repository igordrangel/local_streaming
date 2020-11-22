import Video from "../../entity/Video/Video";
import * as fs from "fs";
import * as path from "path";
import { EntityRepository, Repository } from "typeorm";
import FilterService from "../../helpers/Filter/FilterService";

@EntityRepository(Video)
export default class VideoRepository extends Repository<Video> {
	
	public buscar(params: Video) {
		return FilterService.search(Video)
		                    .or([
			                    {collumName: 'tituloOriginal', comparator: "like", value: params.titulo},
			                    {collumName: 'titulo', comparator: "like", value: params.titulo}
		                    ])
		                    .and({collumName: 'categoria', comparator: "=", value: params.categoria})
		                    .and({collumName: 'tipo', comparator: "=", value: params.tipo})
		                    .getData();
	}
	
	public enviar(video: Video) {
		return new Promise<Video>((async (resolve, reject) => {
			try {
				await this.save(video);
				resolve(video);
			} catch (e) {
				reject(e);
			}
		}));
	}
	
	public async excluir(id: number) {
		try {
			await this.delete(id);
			await this.removeVideo(id.toString());
		} catch (e) {
			throw e;
		}
	}
	
	private async removeVideo(dirname: string) {
		await fs.rmdirSync(path.join(__dirname, `../../../_arquivos/${dirname}`), {recursive: true});
	}
}
