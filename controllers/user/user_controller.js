const assert = require("assert");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//import models
const { Admin } = require("../../models/auth/admin_sign_up");
const { User } = require("../../models/auth/user_sign_up");

const validateRegisterData = require("../../validations/register");


//::::::::::::::Create User::::::::::::::::
const createNewUser = async (req, res) => {
	try {
		// console.log(req.body);
		// validate user data
		const { errors, isValid } = validateRegisterData(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		let { first_name, last_name, email, gender, phone, password } = req.body;
		// check if user already exist
		await User.findOne({ email: email }).then((user) => {
			if (user) {
				return res.status(400).json({
					success: false,
					msg: "Email already exist",
				});
			}

			// Create new user instance
			const newUser = new User({
				first_name,
				last_name,
				email,
				gender,
				phone,
				password,
			});

			// validate gender before proceeding
			let error = newUser.validateSync();
			// console.log(error);
			if (error) {
				assert.equal(
					error.errors["gender"].message,
					`${gender} is not a valid gender type`
				);
			}

			// Hash Password before save
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					await newUser
						.save()
						.then(async (user) => {
							res.status(201).json({
								msg: "User registered successfully",
								user,
							});
						})
						.catch((err) =>
							res.status(500).json({
								msg: "User registration failed",
								err,
							})
						);
				});
			});
		});
	} catch (error) {
		return res.status(500).json({
			msg: "User registration failed",
			error: error.expected ? error.expected : error.message,
		});
	}
};

module.exports = {
	createNewUser,
	index
};
