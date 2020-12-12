import * as fs from "fs";
import * as path from "path";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import VideoArquivo from "../../entity/VideoArquivo/VideoArquivo";
import { koala } from "koala-utils";
import VideoRepository from "./VideoRepository";
import { execSync } from "child_process";

@EntityRepository(VideoArquivo)
export default class VideoArquivoRepository extends Repository<VideoArquivo> {
	
	public enviar(arquivo: VideoArquivo, id?: number, idVideo?: number) {
		return new Promise<VideoArquivo>((async (resolve, reject) => {
			try {
				let arquivoBd = null;
				if (idVideo) {
					arquivo.video = await getCustomRepository(VideoRepository).findOne(idVideo);
				}
				if (id) {
					arquivoBd = await this.findOne(id);
					if (arquivo.filename && arquivoBd.filename !== arquivo.filename) {
						await this.removeFile(arquivoBd.video.id.toString(), arquivoBd.filename);
					}
					if (arquivo.legendaFilename && arquivoBd.filename !== arquivo.legendaFilename) {
						await this.removeFile(arquivoBd.video.id.toString(), arquivoBd.legendaFilename);
					}
					arquivo = koala(arquivoBd).object().merge(arquivo).getValue();
				}
				if (arquivo.tmpFilename) {
					arquivo.filename = await this.saveVideo(
						arquivo.video.id.toString(),
						arquivo.tmpFilename,
						arquivo.filename
					);
				}
				if (arquivo.legendaBase64) {
					const arrFilename = arquivo.filename.split('.');
					arquivo.legendaFilename = arrFilename[0] + '.srt';
					await this.saveFile(arquivo.video.id.toString(), arquivo.legendaFilename, arquivo.legendaBase64);
				}
				await this.save(arquivo);
				resolve(arquivo);
			} catch (e) {
				reject(e);
			}
		}));
	}
	
	public async excluir(id: number) {
		try {
			const arquivo = await this.findOne(id);
			await this.removeFile(arquivo.video.id.toString(), arquivo.filename);
			if (arquivo.legendaFilename)
				await this.removeFile(arquivo.video.id.toString(), arquivo.legendaFilename);
			await this.delete(id);
		} catch (e) {
			throw e;
		}
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
	
	private async saveVideo(dirname: string, tmpFilename: string, filename: string) {
		if (fs.existsSync(path.join(__dirname, `../../../_uploads/${tmpFilename}`))) {
			if (!await fs.existsSync(path.join(__dirname, `../../../_arquivos/${dirname}`))) {
				await fs.mkdirSync(path.join(__dirname, `../../../_arquivos/${dirname}`));
			}
			const filePath = path.join(__dirname, `../../../_arquivos/${dirname}/${filename}`);
			fs.renameSync(
				path.join(__dirname, `../../../_uploads/${tmpFilename}`),
				filePath
			);
			return (await koala(filename)
				.string()
				.split('.')
				.pipeAsync(async klFilename => {
					const arrFilename = klFilename.getValue();
					const ext = arrFilename[arrFilename.length - 1];
					
					arrFilename[arrFilename.length - 1] = 'mp4';
					const newName = koala(arrFilename).array<string>().toString('.').getValue();
					
					const currentPath = path.join(__dirname, `../../../_arquivos/${dirname}/${filename}`);
					const newPath = path.join(__dirname, `../../../_arquivos/${dirname}/${newName}`);
					if (ext !== 'mp4') {
						await execSync(`ffmpeg -i "${currentPath}" -crf 0 -preset veryfast "${newPath}"`);
					}
					filename = newName;
					
					return [filename];
				}))
				.toString()
				.getValue();
		}
	}
	
	private async removeFile(dirname: string, filename: string) {
		if (await fs.existsSync(path.join(__dirname, `../../../_arquivos/${dirname}/${filename}`))) {
			await fs.unlinkSync(path.join(__dirname, `../../../_arquivos/${dirname}/${filename}`));
		}
	}
}
