import "reflect-metadata";
import { createConnection } from "typeorm";
import { Express } from "express";

createConnection().then(async () => {
	const customExpress = require("./config/custom-express");
	const api: Express = customExpress();
	
	const server = api.listen(3000, async () => {
		console.log("Servidor LocalStreaming iniciado na porta 3000.");
		console.log("Abra http://localhost:3000 para visualizar a documentação.");
	});
	server.setTimeout(10800 * 1000);
}).catch(error => console.log(error));
