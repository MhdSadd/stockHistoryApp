const assert = require("assert");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//import models
const { Admin } = require("../../models/auth/admin_sign_up");
const { User } = require("../../models/auth/user_sign_up");

const validateLoginData = require("../../validations/login");

//::::::::::::Login User:::::::::::::::::::::
const loginUser = (req, res) => {
	try {
		const { errors, isValid } = validateLoginData(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const { email, password } = req.body;

		// Find user by mail
		User.findOne({ email }).then((user) => {
			if (!user) {
				// check in admin collection
				Admin.findOne({ email }).then((user) => {
					if (!user) {
						errors.email = "No user with this email";
						return res.status(404).json(errors);
					}

					// Compare password to hashed password
					bcrypt.compare(password, user.password).then((isMatch) => {
						if (!isMatch) {
							return res.status(400).json({
								success: false,
								msg: "password incorrect",
							});
						}

						// generate token and send to user
						let token = jwt.sign({ user }, process.env.JWTsecret, {
							expiresIn: "1h",
						});

						res.status(200).json({
							success: true,
							msg: "Admin user logged in successfully",
							data: {
								token,
								user: {
									...user._doc,
								},
							},
						});
					});
				});
			} else {
				// Compare password to hashed password
				bcrypt.compare(password, user.password).then((isMatch) => {
					if (!isMatch) {
						return res.status(400).json({
							success: false,
							msg: "password incorrect",
						});
					}

					// generate token and send to user
					let token = jwt.sign({ user }, process.env.JWTsecret, {
						expiresIn: "1h",
					});

					res.status(200).json({
						success: true,
						msg: "User Logged in successfully",
						data: {
							token,
							user: {
								...user._doc,
							},
						},
					});
				});
			}
		});
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
};

const currentUser = (req, res) => {
	passport.authenticate("jwt", { session: false }),
		(req, res) => {
			res.json({
				email: req.user.email,
				first_name: req.user.first_name,
				last_name: req.user.last_name,
			});
		};
};

module.exports = {
	loginUser,
	currentUser,
};
