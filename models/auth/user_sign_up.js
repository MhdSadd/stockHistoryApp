const { Schema, model } = require("mongoose");
const userSchema = new Schema(
	{
		first_name: {
			type: String,
			require: true,
		},
		last_name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			required: true,
			immutable: true,
		},
		phone: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: ["male", "female"],
		},
		avatar: {
			type: String,
		},
		avatar_id: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = { User: model("user", userSchema) };
