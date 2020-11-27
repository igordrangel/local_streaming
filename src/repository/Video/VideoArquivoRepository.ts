import * as fs from "fs";
import * as path from "path";
import { EntityRepository, Repository } from "typeorm";
import VideoArquivo from "../../entity/VideoArquivo/VideoArquivo";
import { koala } from "koala-utils";

@EntityRepository(VideoArquivo)
export default class VideoArquivoRepository extends Repository<VideoArquivo> {
	
	public enviar(arquivos: VideoArquivo[]) {
		return new Promise<VideoArquivo[]>((async (resolve, reject) => {
			try {
				for (let arquivo of arquivos.values()) {
					let arquivoBd = null;
					if (arquivo.id) {
						arquivoBd = await this.findOne(arquivo.id);
						if (arquivo.filename && arquivoBd.filename !== arquivo.filename) {
							await this.removeFile(arquivo.video.id.toString(), arquivoBd.filename);
						}
						if (arquivo.legendaFilename && arquivoBd.filename !== arquivo.legendaFilename) {
							await this.removeFile(arquivo.video.id.toString(), arquivoBd.legendaFilename);
						}
						arquivo = koala(arquivoBd).object().merge(arquivo).getValue();
					}
					await this.save(arquivo);
					if (arquivo.base64) {
						await this.saveFile(arquivo.video.id.toString(), arquivo.filename, arquivo.base64);
					}
					if (arquivo.legendaBase64) {
						await this.saveFile(arquivo.video.id.toString(), arquivo.legendaFilename, arquivo.legendaBase64);
					}
				}
				resolve(arquivos);
			} catch (e) {
				reject(e);
			}
		}));
	}
	
	private async saveFile(dirname: string, filename: string, base64: string) {
		return new Promise<void>(async (resolve, reject) => {
			if (!await fs.existsSync(path.join(__dirname, `../../../_arquivos/${dirname}`))) {
				await fs.mkdirSync(path.join(__dirname, `../../../_arquivos/${dirname}`));
			}
			await fs.writeFileSync(
				path.join(__dirname, `../../../_arquivos/${dirname}/${filename}`),
				base64,
				{flag: 'w', encoding: "base64"}
			);
			resolve();
		})
	}
	
	private async removeFile(dirname: string, filename: string) {
		if (await fs.existsSync(path.join(__dirname, `../../../_arquivos/${dirname}/${filename}`))) {
			await fs.rmdirSync(path.join(__dirname, `../../../_arquivos/${dirname}/${filename}`), {recursive: true});
		}
	}
}
