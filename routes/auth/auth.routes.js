const { loginUser } = require("../../controllers/auth/auth_controller");
const router = require("express").Router();

//@Login Route POST api/v1/login
//@description: Users login route
//@access public
router.post("/login", loginUser);



module.exports = router