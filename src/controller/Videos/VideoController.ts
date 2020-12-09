import * as fs from "fs";
import * as path from "path";

import { Express, Request, Response } from "express";
import { ResponseInterface } from "../../config/interfaces/response.interface";
import Video from "../../entity/Video/Video";
import VideoRepository from "../../repository/Video/VideoRepository";
import { BaseController } from "../../config/BaseController";
import { getCustomRepository } from "typeorm";

module.exports = (api: Express) => {
	/**
	 * @api {get} /videos Buscar Videos.
	 * @apiDescription Buscar Videos.
	 * @apiGroup Video
	 *
	 * @apiErrorExample {json} Error-Response:
	 *     HTTP/2 4XX | 5XX
	 *     {
	 *       "error": "true",
	 *       "message": "..."
	 *     }
	 * @apiSuccessExample {json} Success-Response:
	 *     HTTP/2 200 OK
	 *     [
	 *      {
	 *        titulo?: string,
	 *        tituloOriginal: string,
	 *        categoria: VideoCategoriaEnum,
	 *        tipo: VideoTipoEnum,
	 *        arquivo: string
	 *      }
	 *     ]
	 * @apiVersion 1.0.0
	 */
	api.get("/videos", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const query = req.query;
		const params = {} as Video;
		Object.assign(params, query);
		res.status(200).send(await getCustomRepository(VideoRepository).buscar(params));
	}));
	
	api.get("/video/:id", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const {id} = req.params;
		res.status(200).send(await getCustomRepository(VideoRepository).getPorId(parseInt(id)));
	}));
	
	/**
	 * @api {get} /video/:filename Visualizar Video.
	 * @apiDescription Visualizar video.
	 * @apiGroup Video
	 *
	 * @apiErrorExample {json} Error-Response:
	 *     HTTP/2 4XX | 5XX
	 *     {
	 *       "error": "true",
	 *       "message": "..."
	 *     }
	 * @apiSuccessExample {json} Success-Response:
	 *     HTTP/2 206 OK
	 *
	 * @apiVersion 1.0.0
	 */
	api.get("/video/:id/:filename", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const {id, filename} = req.params;
		const file = path.join(__dirname, `../../../_arquivos/${id}/${filename.replace('.vtt', '.srt')}`);
		if (filename.indexOf('.vtt') >= 0) {
			const subsrt = require('subsrt');
			fs.stat(file, (err, stats) => {
				if (err) {
					return res.status(404).send({
						error: true,
						message: "Esta legenda não existe"
					} as ResponseInterface);
				}
				res.set({
					'Content-Type': 'text/html',
					'charset': 'utf-8'
				})
				const srt = fs.readFileSync(file).toString('utf8');
				res.status(200).send(subsrt.convert(srt, {format: 'vtt'}));
			});
		} else {
			fs.stat(file, (err, stats) => {
				if (err) {
					return res.status(404).send({
						error: true,
						message: "Este vídeo não existe"
					} as ResponseInterface);
				}
				res.set({
					'Content-Type': 'video/mp4'
				});
				const video = fs.readFileSync(file).toString('utf8');
				res.status(200).send(video);
			});
		}
	}));
	
	/**
	 * @api {post} /video Incluir Video.
	 * @apiDescription Incluir novo video.
	 * @apiGroup Video
	 *
	 * @apiParam {VideoArquivoInterface} arquivo Arquivo do video {filename: string; type: string; base64: string;}.
	 * @apiParam {string} ext Extensão do video.
	 *
	 * @apiErrorExample {json} Error-Response:
	 *     HTTP/2 4XX | 5XX
	 *     {
	 *       "error": "true",
	 *       "message": "..."
	 *     }
	 * @apiSuccessExample {json} Success-Response:
	 *     HTTP/2 200 OK
	 *     {
	 *       "error": false,
	 *       "message": "Video incluído com sucesso!"
	 *     }
	 *
	 * @apiVersion 1.0.0
	 */
	api.post("/video", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const video = req.body as Video;
		res.status(200).send({
			error: false,
			message: "Video incluído com sucesso!",
			data: await getCustomRepository(VideoRepository).enviar(video)
		} as ResponseInterface);
	}));
	
	/**
	 * @api {put} /video Editar Video.
	 * @apiDescription Editar video.
	 * @apiGroup Video
	 *
	 * @apiParam {Int} id
	 * @apiParam {String} tituloOriginal Título Original do Video.
	 * @apiParam {String} titulo Titulo Personalizado do Video.
	 * @apiParam {TipoVideoEnum} tipo Tipo do Video [1 = Filme, 2 = Série].
	 * @apiParam {CategoriaVideoEnum} categoria Categoria do Video.
	 *
	 * @apiErrorExample {json} Error-Response:
	 *     HTTP/2 4XX | 5XX
	 *     {
	 *       "error": "true",
	 *       "message": "..."
	 *     }
	 * @apiSuccessExample {json} Success-Response:
	 *     HTTP/2 200 OK
	 *     {
	 *       "error": false,
	 *       "message": "Video atualizado com sucesso!"
	 *     }
	 *
	 * @apiVersion 1.0.0
	 */
	api.put("/video/:id", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const video = req.body as Video;
		const {id} = req.params;
		res.status(200).send({
			error: false,
			message: "Video atualizado com sucesso!",
			data: await getCustomRepository(VideoRepository).enviar(video, parseInt(id))
		} as ResponseInterface);
	}));
	
	/**
	 * @api {delete} /video/:id Excluir Video.
	 * @apiDescription Excluir video.
	 * @apiGroup Video
	 *
	 * @apiErrorExample {json} Error-Response:
	 *     HTTP/2 4XX | 5XX
	 *     {
	 *       "error": "true",
	 *       "message": "..."
	 *     }
	 * @apiSuccessExample {json} Success-Response:
	 *     HTTP/2 200 OK
	 *     {
	 *       "error": false,
	 *       "message": "Video removido com sucesso!"
	 *     }
	 *
	 * @apiVersion 1.0.0
	 */
	api.delete("/video/:id", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const {id} = req.params;
		await getCustomRepository(VideoRepository).excluir(parseInt(id));
		res.status(200).send({
			error: false,
			message: "Video removido com sucesso!"
		} as ResponseInterface);
	}));
}
