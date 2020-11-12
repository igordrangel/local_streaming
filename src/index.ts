import "reflect-metadata";
import { getConnectionManager, getConnectionOptions } from "typeorm";
import { Express } from "express";
import { DB_CONNECTION_NAME } from "./factory/db-connection.factory";

const customExpress = require("./config/custom-express");
const app: Express = customExpress();

const server = app.listen(3000, async () => {
	const connectionManager = getConnectionManager();
	const connectionOptions = await getConnectionOptions(DB_CONNECTION_NAME);
	await connectionManager.create(connectionOptions).connect();
	console.log('Servidor Iniciado!');
});
server.setTimeout(10800 * 1000);
