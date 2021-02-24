import "reflect-metadata";
import { createConnection } from "typeorm";
import { Express } from "express";
import * as fs from "fs";
import * as path from "path";

createConnection().then(async () => {
	const customExpress = require("./config/custom-express");
	const api: Express = customExpress();
	
	const server = api.listen(3000, async () => {
		if (!fs.existsSync(path.join(__dirname, `../_arquivos`))) {
			fs.mkdirSync(path.join(__dirname, `../_arquivos`));
		}
		
		if (!fs.existsSync(path.join(__dirname, `../_uploads`))) {
			fs.mkdirSync(path.join(__dirname, `../_uploads`));
		}
		
		console.log("Servidor LocalStreaming iniciado na porta 3000.");
		console.log("Abra http://localhost:3000 para visualizar a documentação.");
	});
	server.setTimeout(10800 * 1000);
}).catch(error => console.log(error));
