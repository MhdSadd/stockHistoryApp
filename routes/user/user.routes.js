const { createNewUser } = require("../../controllers/user/user_controller");
const router = require("express").Router();

//@Register Route POST api/v1/user
//@description: register new user
//@access public
router.post("/register", createNewUser);





module.exports = router
