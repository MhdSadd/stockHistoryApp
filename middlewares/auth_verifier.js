const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		console.log("token:::", token);
		if (!token)
			return res.status(403).json({ msg: "Session expired or invalid token" });

		const decoded = jwt.verify(token, process.env.JWTsecret);

		req.user = decoded.user;
		req.token = token;
		next();
	} catch {
		return res.status(401).json({
			message: "Unauthorized, you need to log in",
		});
	}
};

module.exports = verifyToken;
