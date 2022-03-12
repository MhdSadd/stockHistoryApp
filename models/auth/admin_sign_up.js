const { Schema, model } = require("mongoose");
const adminSchema = new Schema(
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
			type: Number,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: true,
		}
	},
	{ timestamps: true }
);

module.exports = { Admin: model("admin", adminSchema) };
