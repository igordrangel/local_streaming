import { NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export class Authorization {
	public static verify(req: any, res: any, next: NextFunction) {
		if (req.headers['authorization']) {
			const token = req.headers['authorization'].replace(/Bearer /g, '');
			if (!token) return res.status(401).send({auth: false, message: 'Token não informado.'});
			
			jwt.verify(token, process.env.SECRET, function (err: any, decoded: any) {
				if (err) return res.status(500).send({auth: false, message: 'Token inválido ou vencido.'});
				req.userId = decoded.id;
				next();
			});
		} else {
			return res.status(401).send({auth: false, message: 'Token não informado.'});
		}
	}
}
