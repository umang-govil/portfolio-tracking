var Trade = require('../models/TradeSchema');
var Stock = require('../models/StockSchema');
var Portfolio = require('../models/PortfolioSchema');

var express = require('express');

var api = express.Router();
var mongoose = require('mongoose');

function calHoldings(portfolio) {
	var m = new Map();

	portfolio.trades.forEach(function(trade) {
		if (trade.tradeType == 'BUY') {

			if (m.has(trade.stockName)) {
				m.get(trade.stockName).effPrice += (trade.quantity * trade.price);
				m.get(trade.stockName).buyQuantity += trade.quantity;
				m.get(trade.stockName).effQuantity += trade.quantity;
			} else {
				m.set(trade.stockName, {
					'effPrice': (trade.quantity * trade.price),
					'effQuantity': trade.quantity,
					'buyQuantity': trade.quantity
				});
			}
		} else {
			if (m.has(trade.stockName)) {
				m.get(trade.stockName).effQuantity -= trade.quantity;
			} else {
				m.set(trade.stockName, {
					'effPrice': 0,
					'effQuantity': -trade.quantity,
					'buyQuantity': 0
				});
			}
		}
	});
	var holdingsArr = [];
	m.forEach(function(value, key) {
		holdingsArr.push({
			stockName: key,
			price: (value.effPrice / value.buyQuantity),
			quantity: value.effQuantity
		});
	});
	return holdingsArr;
};

api.createPortfolio = function(req, res) {
	var portfolio = new Portfolio({
		name: req.body.name
	});
	portfolio.save(function(err) {
		if (err) {
			res.status(500).send({
				success: false,
				data: err
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Portfolio created successfully'
			});
		}
	});
};

api.getPortfolio = function(req, res) {
	Portfolio.find({}).populate('trades').exec(function(err, portfolio) {
		if (err) {
			res.status(500).send({
				success: false,
				data: err
			});
		} else if (!portfolio) {
			res.status(404).send({
				success: false,
				message: 'Portfolio not Found'
			});
		} else {
			res.status(200).json({
				success: true,
				data: portfolio
			});
		}
	});
};

api.getHoldings = function(req, res) {
	Portfolio.find({}).populate('trades').exec(function(err, portfolio) {
		if (err) {
			res.status(500).send({
				success: false,
				data: err
			});
		} else if (!portfolio) {
			res.status(404).send({
				success: false,
				message: 'Portfolio not Found'
			});
		} else {

			var holdingsArr = calHoldings(portfolio[0]);

			res.status(200).json({
				success: true,
				data: holdingsArr
			});
		}
	});
};

api.getCumulativeReturns = function(req, res) {
	console.log("hi");
	Portfolio.find({}).populate('trades').exec(function(err, portfolio) {
		if (err) {
			res.status(500).send({
				success: false,
				data: err
			});
		} else if (!portfolio) {
			res.status(404).send({
				success: false,
				message: 'Portfolio not Found'
			});
		} else {
			var cumulativeReturn = 0;
			portfolio[0].trades.forEach(function(trade) {
				if (trade.tradeType == "BUY") {
					cumulativeReturn -= trade.price * trade.quantity;
				} else {
					cumulativeReturn += trade.price * trade.quantity;
				}
			});
			var holdings = calHoldings(portfolio[0]);
			console.log(cumulativeReturn);

			holdings.forEach(function(holding) {
				cumulativeReturn += holding.quantity * 100;
			});
			var type;
			if (cumulativeReturn > 0) {
				type = "Profit";
			} else if (cumulativeReturn < 0) {
				type = "Loss";
			} else {
				type = "None";
			}
			res.status(200).json({
				success: true,
				data: {
					type: type,
					cumulativeReturn: Math.abs(cumulativeReturn)
				}
			});
		}
	});
};

module.exports = api;
