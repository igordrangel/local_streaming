import * as fs from "fs";
import * as path from "path";
import { EntityRepository, Repository } from "typeorm";
import VideoArquivo from "../../entity/VideoArquivo/VideoArquivo";

@EntityRepository(VideoArquivo)
export default class VideoArquivoRepository extends Repository<VideoArquivo> {
	
	public enviar(arquivos: VideoArquivo[]) {
		return new Promise<VideoArquivo[]>((async (resolve, reject) => {
			try {
				for (let arquivo of arquivos.values()) {
					await this.save(arquivo);
					await this.saveVideo(arquivo.video.id.toString(), arquivo.filename, arquivo.base64);
				}
				resolve(arquivos);
			} catch (e) {
				reject(e);
			}
		}));
	}
	
	private async saveVideo(dirname: string, filename: string, base64: string) {
		return new Promise<void>(async (resolve, reject) => {
			await fs.mkdirSync(path.join(__dirname, `../../../_arquivos/${dirname}`));
			await fs.writeFileSync(
				path.join(__dirname, `../../../_arquivos/${dirname}/${filename}`),
				base64,
				{flag: 'w', encoding: "base64"}
			);
			resolve();
		})
	}
}
