import "reflect-metadata";
import { createConnection } from "typeorm";
import { Express } from "express";
import * as path from "path";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";

createConnection().then(async connection => {
	const customExpress = require("./config/custom-express");
	const api: Express = customExpress();
	
	const dirVideosPath = path.join(__dirname, '../_arquivos')
	if (!fs.existsSync(dirVideosPath)) {
		fs.mkdirSync(dirVideosPath);
	}
	
	const httpServer = http.createServer(api).listen(3001, async () => {
		console.log("Servidor LocalStreaming iniciado na porta 3001.");
		console.log("Abra http://localhost:3001 para visualizar a documentação.");
	});
	httpServer.setTimeout(10800 * 1000);
	
	const httpsServer = https.createServer({
		key: '',
		cert: ''
	}, api).listen(3000, async () => {
		console.log("Servidor LocalStreaming iniciado na porta 3000.");
		console.log("Abra https://localhost:3000 para visualizar a documentação.");
	});
	httpsServer.setTimeout(10800 * 1000);
}).catch(error => console.log(error));
