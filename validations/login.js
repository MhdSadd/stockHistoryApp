const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateLoginData = (data) => {
	let errors = {};
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.email) ? data.password : "";

	if (!validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}
	if (validator.isEmpty(data.email)) {
		errors.email = "Email is required to login";
	}

	if (validator.isEmpty(data.password)) {
		errors.password = "Password is required to login";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
