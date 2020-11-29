import "reflect-metadata";
import { createConnection } from "typeorm";
import { Express } from "express";
import * as path from "path";
import * as fs from "fs";

createConnection().then(async connection => {
	const customExpress = require("./config/custom-express");
	const api: Express = customExpress();
	const server = api.listen(80, async () => {
		const dirVideosPath = path.join(__dirname, '../_arquivos')
		if (!fs.existsSync(dirVideosPath)) {
			fs.mkdirSync(dirVideosPath);
		}
		console.log("Servidor LocalStreaming iniciado na porta 3000.");
		console.log("Abra http://localhost:3000 para visualizar a documentação.");
	});
	server.setTimeout(10800 * 1000);
}).catch(error => console.log(error));
