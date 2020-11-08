import { Express } from "express";

const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");
const cors = require('cors');
const timeout = require('connect-timeout');

module.exports = () => {
	const app: Express = express();
	app.use(express.static('dist/src/doc'));
	app.use(bodyParser.json());
	app.use(cors({origin: "*"}));
	consign({extensions: ['.js']}).include('dist/src/controllers').into(app);
	consign({extensions: ['.js']}).include('dist/src/middleware/authentication.js').into(app);
	app.use(timeout('1800s'));
	return app;
};
