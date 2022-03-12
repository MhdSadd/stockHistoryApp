const { Stock } = require("../../models/trade/stock");

//::::::::::::::Stock Markets:::::::::::
const stockMarket = async (req, res) => {
	const query = req.params.query;
	// console.log(query);
	await Stock.find({ Market: query })
		.then((stock) => {
			if (stock.length === 0)
				return res.status(404).json({
					message: "No stock available under the search market",
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

			res.status(200).json({
				market: query,
				sum_dpdT: profitOverTime,
				stock: stockData,
			});
		})
		.catch((err) => {
			res.status(404).json({
				message: "No stock available under the search market",
				error: err,
			});
		});
};

module.exports = {
	stockMarket,
};
