import { Express } from "express";

const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const cors = require('cors');
const timeout = require('connect-timeout');

module.exports = () => {
	const app: Express = express();
	app.use(express.static('src/doc'));
	app.use(express.json({limit: '100gb'}));
	app.use(bodyParser.json());
	app.use(cors({origin: "*"}));
	//consign({extensions: ['.js']}).include('dist/controller').into(app);
	app.use(timeout('1800s'));
	return app;
};
