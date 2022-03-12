const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("WELCOME TO TRADE HISTORY APP API SERVICE");
});

module.exports = router;
