const { Schema, model } = require("mongoose");

const stockSchema = new Schema({
	Market: {
		type: String,
		required: true,
	},
	Direction: {
		type: String,
		enum: ["BUY", "SELL"],
		required: true,
	},
	Quantity: {
		type: Number,
		required: true,
	},
	Price: {
		type: Number,
		required: true,
	},
	Consideration: {
		type: Number,
		required: true,
	},
	Date: {
		type: String,
		required: true,
	},
});

module.exports = { Stock: model("stock", stockSchema) };
