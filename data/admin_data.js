const bcrypt = require("bcryptjs"); //to hash password
const admin = [
	{
		first_name: "Ozo",
		last_name: "0",
		email: "admin@gmail.com",
		phone: 07035061222,
		password: bcrypt.hashSync("1234", 10),
		isAdmin: true
	},
];

module.exports = admin;
