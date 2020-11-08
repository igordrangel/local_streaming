import * as jwt from "jsonwebtoken";
import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../../entity/usuarios/usuario";
import { AuthenticationInterface } from "../../../interfaces/authentication.interface";
import { TokenInterface } from "../../../interfaces/token.interface";

@EntityRepository(Usuario)
export class UsuarioRepositorio extends Repository<Usuario> {
	
	public autenticar(auth: AuthenticationInterface): Promise<TokenInterface> {
		try {
			return this.findOne({
				where: {
					login: auth.login,
					senha: auth.senha
				}
			}).then(usuario => {
				if (usuario) {
					const token = jwt.sign({
						id: usuario.id,
						login: usuario.login
					}, process.env.SECRET, {
						expiresIn: 86400
					});
					
					return {auth: true, token: token} as TokenInterface;
				}
			}).catch(e => {
				throw e;
			});
		} catch (e) {
			throw e;
		}
	}
}
