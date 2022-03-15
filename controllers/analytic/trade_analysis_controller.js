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
				return Number(pOT.dpdT);
			});

			//::::::: Calculate gross profit and Loss::::::::::
			let profits = profitOverTime
				.filter((profit) => profit > 0)
				.map((str) => {
					return Number(str);
				});

			let losses = profitOverTime
				.filter((loss) => loss <= 0)
				.map((str) => {
					return Number(str);
				});

			const totalProfit = profits.reduce((acc, curr) => acc + curr).toFixed(2);
			const totalLoss = losses.reduce((acc, curr) => acc + curr).toFixed(2);

			res.status(200).json({
				market: query,
				grossProfit: Number(totalProfit),
				grossLoss: Number(totalLoss),
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

// list all market type
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
