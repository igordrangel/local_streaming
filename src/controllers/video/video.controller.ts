import { Express, Request, Response } from "express";
import { check } from "express-validator";
import { BaseController } from "../base.controller";
import { DbConnectionFactory } from "../../factory/db-connection.factory";
import { ResponseInterface } from "../../interfaces/response.interface";
import { VideoInterface } from "../../interfaces/video/video.interface";
import { VideoRepositorio } from "../../models/repository/video/video.repositorio";
import * as fs from "fs";
import * as path from "path";

module.exports = (api: Express) => {
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
	api.get("/video/:filename", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const {filename} = req.params;
		const movieFile = path.join(__dirname, `../../../_arquivos/${filename}`);
		fs.stat(movieFile, (err, stats) => {
			if (err) {
				return res.status(404).send({
					error: true,
					message: "Este vídeo não existe"
				} as ResponseInterface);
			}
			const {range} = req.headers;
			const {size} = stats;
			const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
			const end = size - 1;
			const chunkSize = (end - start) + 1;
			res.set({
				'Content-Range': `bytes ${start}-${end}/${size}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunkSize,
				'Content-Type': 'video/mp4'
			});
			res.status(206);
			const stream = fs.createReadStream(movieFile, {start, end});
			stream.on('open', () => stream.pipe(res));
			stream.on('error', (streamErr) => res.end(streamErr));
		});
	}));
	
	/**
	 * @api {post} /video Incluir Video.
	 * @apiDescription Incluir novo video.
	 * @apiGroup Video
	 *
	 * @apiParam {String} tituloOriginal Título Original do Video.
	 * @apiParam {String} titulo Titulo Personalizado do Video.
	 * @apiParam {String} arquivo Arquivo do video em base64.
	 * @apiParam {String} ext Extensão do video.
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
	api.post("/video", [
		check("tituloOriginal").notEmpty().withMessage("Título Original não informado."),
		check("titulo").notEmpty().withMessage("Título não informado."),
		check("arquivo").notEmpty().withMessage("Arquivo não informado."),
		check("ext").notEmpty().withMessage("Extensão não informada.")
	], async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const dadosVideo = req.body as VideoInterface;
		const videoRepositorio = DbConnectionFactory.getRepository(VideoRepositorio);
		res.status(200).send({
			error: false,
			message: "Video incluído com sucesso!",
			data: await videoRepositorio.cadastrar(dadosVideo)
		} as ResponseInterface);
	}));
	
	/**
	 * @api {put} /video/:id Editar Video.
	 * @apiDescription Editar video.
	 * @apiGroup Video
	 *
	 * @apiParam {String} tituloOriginal Título Original do Video.
	 * @apiParam {String} titulo Titulo Personalizado do Video.
	 * @apiParam {String} Arquivo do video em base64.
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
	api.put("/video/:id", [
		check("tituloOriginal").notEmpty().withMessage("Título Original não informado."),
		check("titulo").notEmpty().withMessage("Título não informado."),
		check("arquivo").notEmpty().withMessage("Arquivo não informado.")
	], async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const dadosVideo = req.body as VideoInterface;
		const videoRepositorio = DbConnectionFactory.getRepository(VideoRepositorio);
		res.status(200).send({
			error: false,
			message: "Video atualizado com sucesso!",
			data: await videoRepositorio.editar(parseInt(req.get('id')), dadosVideo)
		} as ResponseInterface);
	}));
}