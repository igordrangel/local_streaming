import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorsHelper } from "./errors/errors.helper";

export class BaseController {
	
	public static async control(req: Request, res: Response, fn: (req: Request, res: Response) => void, fnCatch?: (e: Error) => void) {
		if (await this.verifyErrorResquest(req, res)) {
			try {
				await fn(req, res);
			} catch (e) {
				if (fnCatch) {
					await fnCatch(e);
				}
				ErrorsHelper.sendError(res, e);
			}
		}
	}
	
	public static async verifyErrorResquest(req: Request, res: Response): Promise<boolean> {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(422).send({error: true, message: errors.array()});
			return false;
		} else {
			return true;
		}
	}
}
