const { Stock } = require("../../models/trade/stock");

//::::::::::::::Stock Markets:::::::::::
const stockMarket = async (req, res) => {
	const query = req.query.query;

	// console.log(query);
	await Stock.find({ Market: query })
		.then((stock) => {
			if (stock.length === 0)
				return res.status(404).json({
					msg: "No stock available under the search market",
					success: false,
					stock,
				});

			// return only selected properties
			let stockData = stock.map((stock) => {
				return {
					Date: stock.Date,
					Quantity: stock.Quantity,
					Price: stock.Price,
					Consideration: stock.Consideration,
					Direction: stock.Direction,
				};
			});

			// if (stock.Direction === "BUY") {}
			// Get the profit or loss on each stock bought based on price on the next buy action
			stockData.map(
				(a, b) => (
					(a.dpdT = (
						-(a.Price - stock[b - 1]?.Price || 0) * a.Quantity
					).toFixed(2)),
					a
				)
			);

			let profitOverTime = stockData.map((pOT) => {
				return pOT.dpdT;
			});
			// let totalProfit = profitOverTime.map((profit) => {
			// 	if (profit < 0 || profit === 0) {
			// 		return profit +=
			// 	}
			// });
			res.status(200).json({
				market: query,
				sum_dpdT: profitOverTime,
				stock: stockData,
			});
		})
		.catch((err) => {
			res.status(404).json({
				msg: "No stock available under the search market",
				success: false,
				error: err,
			});
		});
};

const categories = async (req, res) => {
	Stock.find({}).then((categories) => {
		if (!categories.length > 0)
			return res.status(404).json({
				msg: "No category found",
				success: false,
				categories,
			});
		let allMarkets = categories.map((category) => {
			return category.Market;
		});
		let uniqueMarket = allMarkets.filter((element, index) => {
			return allMarkets.indexOf(element) === index;
		});
		res.status(200).json({
			success: true,
			categories: uniqueMarket.slice(0, 11),
		});
	});
};

module.exports = {
	stockMarket,
	categories,
};
