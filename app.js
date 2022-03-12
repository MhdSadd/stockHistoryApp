require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routers = require("./routes/index.routes");
const connectDB = require("./configs/db");
const app = express();

// DB connect
connectDB();

// morgan init
app.use(logger("dev"));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
routers(app);

// catch error and forward to error handler
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

// error handler
app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			status: error.status || 500,
			message: error.message || "Internal Server Error",
		},
	});
});

module.exports = app;
