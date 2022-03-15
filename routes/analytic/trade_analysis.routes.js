const {
	stockMarket,
	categories,
} = require("../../controllers/analytic/trade_analysis_controller");
const router = require("express").Router();
const auth = require("../../middlewares/auth_verifier");

//@StockMarket List Route GET api/v1/trade-analysis/stock
//@description: get list of all stock that match the specified market
//@access Private
router.get("/stock", stockMarket);

//@StockMarket List all market Route GET api/v1/trade-analysis/categories
//@description: get list of all market type traded
//@access Private
router.get("/categories", categories);
module.exports = router;
