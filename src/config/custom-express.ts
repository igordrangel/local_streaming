import { Express } from "express";

const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const cors = require('cors');
const timeout = require('connect-timeout');

module.exports = () => {
	const app: Express = express();
	app.use(cors({origin: "*"}));
	app.use(express.static('src/doc'));
	app.use(express.json({limit: '100gb'}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	consign({extensions: ['.js']}).include('dist/controller').into(app);
	app.use(timeout('1800s'));
	return app;
};
