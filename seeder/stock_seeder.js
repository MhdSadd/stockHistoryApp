require("dotenv").config();
const connectDB = require("../configs/db");
const csvToJson = require("convert-csv-to-json");
const { Stock } = require("../models/trade/stock");

connectDB();
const seedStocks = async () => {
	try {
		let stockData = csvToJson
			.fieldDelimiter(",")
			.formatValueByType()
			.getJsonFromCsv("TradeHistory.csv");
		stockData.map((stock) => {
			let priceInDollar = stock.Price / 100;
			return (stock.Price = priceInDollar);
		});
		await Stock.deleteMany();
		await Stock.insertMany(stockData);
		console.log(`Data seeded successfully`);
		process.exit();
	} catch (error) {
		console.log(`Data seeding failed ${error}`);
		process.exit(1);
	}
};
seedStocks();
