const homeRoutes = require("../routes/home.routes")
const userRoutes = require("../routes/user/user.routes");
const authRoutes = require("../routes/auth/auth.routes");
const tradeAnalysisRoutes = require("../routes/analytic/trade_analysis.routes");

const routers = (app) => {
	app.use("/api/v1/", homeRoutes)
	app.use("/api/v1/user", userRoutes);
	app.use("/api/v1/auth", authRoutes);
	app.use("/api/v1/trade-analysis", tradeAnalysisRoutes);
};

module.exports = routers;
