import "reflect-metadata";
import { getConnectionManager, getConnectionOptions } from "typeorm";
import { Express } from "express";
import { DB_CONNECTION_NAME } from "./factory/db-connection.factory";
import * as fs from "fs";
import * as path from "path";

const customExpress = require("./config/custom-express");
const app: Express = customExpress();

const server = app.listen(3000, async () => {
	const connectionManager = getConnectionManager();
	const connectionOptions = await getConnectionOptions(DB_CONNECTION_NAME);
	await connectionManager.create(connectionOptions).connect();
	const dirVideosPath = path.join(__dirname, '../_arquivos')
	if (!fs.existsSync(dirVideosPath)) {
		fs.mkdirSync(dirVideosPath);
	}
	console.log('Servidor Iniciado!');
});
server.setTimeout(10800 * 1000);
