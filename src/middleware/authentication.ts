import { Express, Request, Response } from "express";
import { AuthenticationInterface } from "../interfaces/authentication.interface";
import { UsuarioRepositorio } from "../models/repository/usuarios/usuario.repositorio";
import { check } from "express-validator";
import { BaseController } from "../controllers/base.controller";
import { DbConnectionFactory } from "../factory/db-connection.factory";

module.exports = (app: Express) => {
	/**
	 * @api {post} /login Autenticação na aplicação.
	 * @apiName PostLogin
	 * @apiGroup Login
	 *
	 * @apiParam {String} login Usuário.
	 * @apiParam {String} senha Senha.
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
	 *       "auth": true,
	 *       "token": "eyJhbGci..."
	 *     }
	 *
	 * @apiVersion 1.0.0
	 */
	app.post('/login', [
		check('login')
			.notEmpty().withMessage("login não informado."),
		check('senha')
			.notEmpty().withMessage("senha não informada."),
	], async (req: Request, res: Response) => await BaseController.control(req, res, async (req: Request, res: Response) => {
		const usuarioRepositorio = DbConnectionFactory.getConnection(UsuarioRepositorio);
		const token = await usuarioRepositorio.autenticar(req.body as AuthenticationInterface);
		
		if (token) {
			res.status(200).send(token);
		} else {
			throw new TypeError("Login ou Senha inválidos");
		}
	}));
};
