import { EntityRepository, In, Not, Repository } from "typeorm";
import { Video } from "../../entity/videos/video";
import { VideoInterface } from "../../../interfaces/video/video.interface";
import * as fs from "fs";
import * as path from "path";
import { VideoFilterInterface } from "../../../interfaces/video/video-filter.interface";
import { koala } from "koala-utils";

@EntityRepository(Video)
export class VideoRepositorio extends Repository<Video> {
	
	public buscar(params: VideoFilterInterface) {
		return this.find({
			where: [{
				titulo: In(koala(params.titulo ?? '').string().split(' ').getValue()),
				categoria: params.categoria,
				tipo: params.tipo
			}, {
				tituloOriginal: In(koala(params.titulo ?? '').string().split(' ').getValue()),
				categoria: params.categoria,
				tipo: params.tipo
			}]
		})
	}
	
	public cadastrar(dadosVideo: VideoInterface) {
		return new Promise<Video>((async (resolve, reject) => {
			try {
				const video = new Video();
				video.setTituloOriginal(dadosVideo.tituloOriginal);
				await this.verificarExistencia(video);
				if (dadosVideo.titulo)
					video.setTitulo(dadosVideo.titulo);
				video.setArquivo();
				video.setCategoria(dadosVideo.categoria);
				video.setTipo(dadosVideo.tipo);
				
				await this.insert(video).catch(e => reject(e));
				await this.saveVideo(video.getArquivo(), dadosVideo.ext, dadosVideo.arquivo);
				resolve(video);
			} catch (e) {
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
	
	private async saveVideo(filename: string, extensao: string, base64: string) {
		return new Promise<void>(((resolve, reject) => {
			const filePath = path.join(__dirname, `../../../_arquivos/${filename}.${extensao}`);
			fs.writeFile(filePath, base64, {encoding: "base64"}, (err) => {
				if (err) reject(err);
				resolve();
			});
		}))
	}
}
