import { EntityRepository, In, Not, Repository } from "typeorm";
import { Video } from "../../entity/videos/video";
import { VideoInterface } from "../../../interfaces/video/video.interface";
import * as fs from "fs";
import * as path from "path";
import { koala } from "koala-utils";
import { DbConnectionFactory } from "../../../factory/db-connection.factory";

@EntityRepository(Video)
export class VideoRepositorio extends Repository<Video> {
	
	public buscar(params: any) {
		const filter: any[] = [];
		Object.keys(params).forEach((indexParams) => {
			if (indexParams === 'titulo') {
				filter.push({
					tituloOriginal: In(koala(params[indexParams]).string().split(' ').getValue())
				}, {
					titulo: In(koala(params[indexParams]).string().split(' ').getValue())
				});
			} else {
				if (!!params[indexParams]) {
					filter.push({
						indexParams: params[indexParams]
					});
				}
			}
		});
		return this.find({
			where: filter
		});
	}
	
	public cadastrar(dadosVideo: VideoInterface) {
		return new Promise<Video>((async (resolve, reject) => {
			const queryRunner = await DbConnectionFactory.getQueryRunner();
			await queryRunner.startTransaction();
			try {
				const video = new Video();
				video.setTituloOriginal(dadosVideo.tituloOriginal);
				await this.verificarExistencia(video);
				if (dadosVideo.titulo)
					video.setTitulo(dadosVideo.titulo);
				video.setArquivo(dadosVideo.arquivo);
				video.setCategoria(dadosVideo.categoria);
				video.setTipo(dadosVideo.tipo);
				
				dadosVideo.ext = dadosVideo.arquivo.filename.split('.')[1];
				
				await queryRunner.manager.insert(Video, video).catch(e => reject(e));
				await this.saveVideo(video.getId().toString(), video.getArquivo(), dadosVideo.ext, dadosVideo.arquivo.base64);
				await queryRunner.commitTransaction();
				resolve(video);
			} catch (e) {
				await queryRunner.rollbackTransaction();
				reject(e);
			}
		}));
	}
	
	public async editar(id: number, dadosVideo: VideoInterface) {
		return new Promise<Video>((async (resolve, reject) => {
			try {
				const video = await this.findOne(id);
				video.setTituloOriginal(dadosVideo.tituloOriginal);
				await this.verificarExistencia(video);
				if (dadosVideo.titulo)
					video.setTitulo(dadosVideo.titulo);
				video.setCategoria(dadosVideo.categoria);
				video.setTipo(dadosVideo.tipo);
				
				await this.update(id, video).catch(e => reject(e));
				resolve(video);
			} catch (e) {
				reject(e);
			}
		}));
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
}
