import { Express, Request, Response } from "express";
import { BaseController } from "../../config/BaseController";
import { getCustomRepository } from "typeorm";
import { ResponseInterface } from "../../config/interfaces/response.interface";
import VideoArquivo from "../../entity/VideoArquivo/VideoArquivo";
import VideoArquivoRepository from "../../repository/Video/VideoArquivoRepository";

module.exports = (api: Express) => {
	
	/**
	 * @api {post} /video/:id/arquivo Incluir Arquivo.
	 * @apiDescription Incluir novo arquivo.
	 * @apiGroup VideoArquivo
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
	api.post("/video/:id/arquivo", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const arquivo = req.body as VideoArquivo;
		const {id} = req.params;
		res.status(200).send({
			error: false,
			message: "Arquivo incluído com sucesso!",
			data: await getCustomRepository(VideoArquivoRepository).enviar(arquivo, null, parseInt(id))
		} as ResponseInterface);
	}));
	
	/**
	 * @api {put} /video/arquivo/:id Editar Arquivo.
	 * @apiDescription Editar arquivo.
	 * @apiGroup VideoArquivo
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
	api.put("/video/arquivo/:id", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const arquivo = req.body as VideoArquivo;
		const {id} = req.params;
		res.status(200).send({
			error: false,
			message: "Arquivo atualizado com sucesso!",
			data: await getCustomRepository(VideoArquivoRepository).enviar(arquivo, parseInt(id))
		} as ResponseInterface);
	}));
	
	/**
	 * @api {delete} /video/arquivo/:id Excluir Arquivo.
	 * @apiDescription Excluir Arquivo.
	 * @apiGroup VideoArquivo
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
	api.delete("/video/arquivo/:id", async (req: Request, res: Response) => await BaseController.control(req, res, async (req, res) => {
		const {id} = req.params;
		await getCustomRepository(VideoArquivoRepository).excluir(parseInt(id));
		res.status(200).send({
			error: false,
			message: "Video removido com sucesso!"
		} as ResponseInterface);
	}));
}
