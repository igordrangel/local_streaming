import { EntityRepository, Not } from "typeorm";
import { Video } from "../../entity/videos/video";
import { VideoInterface } from "../../../interfaces/video/video.interface";
import * as fs from "fs";
import * as path from "path";
import { RepositoryBase } from "../../../shared/RepositoryBase";
import { VideoFilterInterface } from "../../../interfaces/video/video-filter.interface";

@EntityRepository(Video)
export class VideoRepositorio extends RepositoryBase<Video> {
	
	constructor() {
		super(Video);
	}
	
	public async buscar(params: VideoFilterInterface) {
		return await this.search()
		                 .or([
			                 {collumName: 'tituloOriginal', comparator: "like", value: params.titulo},
			                 {collumName: 'titulo', comparator: "like", value: params.titulo}
		                 ])
		                 .and({collumName: 'categoria', comparator: "=", value: params.categoria})
		                 .and({collumName: 'tipo', comparator: "=", value: params.tipo})
		                 .getData();
	}
	
	public enviar(dadosVideo: VideoInterface) {
		return new Promise<Video>((async (resolve, reject) => {
			await this.beginTransaction();
			try {
				let video = new Video();
				if (dadosVideo.id) {
					video = await this.findOne(dadosVideo.id);
				}
				video.setTituloOriginal(dadosVideo.tituloOriginal);
				await this.verificarExistencia(video);
				if (dadosVideo.titulo)
					video.setTitulo(dadosVideo.titulo);
				video.setCategoria(dadosVideo.categoria);
				video.setTipo(dadosVideo.tipo);
				
				await this.send(video);
				
				if (dadosVideo.arquivos) {
					for (let arquivo of dadosVideo.arquivos.values()) {
						dadosVideo.ext = arquivo.filename.split('.')[1];
						await this.saveVideo(video.getId().toString(), video.addArquivo(arquivo).filename, dadosVideo.ext, arquivo.base64);
					}
				} else {
					dadosVideo.ext = dadosVideo.arquivo.filename.split('.')[1];
					await this.saveVideo(video.getId().toString(), video.addArquivo(dadosVideo.arquivo).filename, dadosVideo.ext, dadosVideo.arquivo.base64);
				}
				
				await this.send(video);
				await this.commit();
				resolve(video);
			} catch (e) {
				await this.rollback();
				reject(e);
			}
		}));
	}
	
	public async excluir(id: number) {
		await this.beginTransaction();
		try {
			await this.delete(id);
			await this.removeVideo(id.toString());
			await this.commit();
		} catch (e) {
			await this.rollback();
			throw e;
		}
	}
	
	private async verificarExistencia(video: Video) {
		const qtd = await this.count({
			where: {
				id: Not(video.getId()),
				tituloOriginal: video.getTituloOriginal()
			}
		});
		
		if (qtd > 0) {
			throw new TypeError("Já existe um usuário cadastro com este E-mail e Usuário!");
		}
	}
	
	private async saveVideo(dirname: string, filename: string, extensao: string, base64: string) {
		return new Promise<void>(async (resolve, reject) => {
			await fs.mkdirSync(path.join(__dirname, `../../../../_arquivos/${dirname}`));
			await fs.writeFileSync(
				path.join(__dirname, `../../../../_arquivos/${dirname}/${filename}.${extensao}`),
				base64,
				{flag: 'w', encoding: "base64"}
			);
			resolve();
		})
	}
	
	private async removeVideo(dirname: string) {
		await fs.rmdirSync(path.join(__dirname, `../../../../_arquivos/${dirname}`), {recursive: true});
	}
}
