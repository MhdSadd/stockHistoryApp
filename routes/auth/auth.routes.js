const { loginUser, currentUser  } = require("../../controllers/auth/auth_controller");
const router = require("express").Router();

//@Login Route POST api/v1/login
//@description: Users login route
//@access public
router.post("/login", loginUser);

//@Current user Route GET api/v1/user
//@description: Current user
//@access private
router.post("/current", currentUser);



module.exports = router