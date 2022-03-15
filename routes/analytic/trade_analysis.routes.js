const {
	stockMarket,
} = require("../../controllers/analytic/trade_analysis_controller");
const router = require("express").Router();
const auth = require("../../middlewares/auth_verifier");

//@StockMarket List Route GET api/v1/trade-analysis
//@description: get list of all stock that match the specified market
//@access Private
router.get("/stock", stockMarket);

module.exports = router;
