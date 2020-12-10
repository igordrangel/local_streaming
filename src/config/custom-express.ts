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
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cors({origin: "http://192.168.18.162:3000"}));
	consign({extensions: ['.js']}).include('dist/controller').into(app);
	app.use(timeout('1800s'));
	return app;
};
