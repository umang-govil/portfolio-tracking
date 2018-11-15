var Trade = require('../models/TradeSchema');
var Stock = require('../models/StockSchema');
var Portfolio = require('../models/PortfolioSchema');

var express = require('express');

var api = express.Router();
var mongoose = require('mongoose');

api.addStock = function(req, res) {
	var stock = new Stock({
		name: req.body.stockName,
		description: req.body.description
	});

	stock.save(function(err) {
		if (err) {
			res.status(500).send({
				success: false,
				data: err
			})
		} else {
			res.status(200).json({
				success: true,
				message: 'Stock added successfully'
			});
		}
	})
}

api.addTrade = function(req, res) {
	Stock.findOne({
		name: req.body.stockName
	}, function(err, stock) {
		if (err) {
			res.status(500).send({
				success: false,
				data: err
			});
		} else if (!stock) {
			res.status(404).send({
				success: false,
				message: 'Stock not listed in the Database'
			});
		} else {
			Portfolio.findOne({
				name: req.body.portfolioName
			}, function(err, portfolio) {
				if (err) {
					res.status(500).send({
						success: false,
						data: err
					});
				} else if (!portfolio) {
					res.status(404).send({
						success: false,
						message: 'Portfolio not listed in the Database'
					});
				} else {
					var trade = new Trade({
						stockName: req.body.stockName,
						portfolioName: req.body.portfolioName,
						price: req.body.price,
						quantity: req.body.quantity,
						tradeType: req.body.tradeType,
						date: new Date()
					});
					trade.save(function(err, data) {
						if (err) {
							res.status(500).send({
								success: false,
								data: err
							});
						} else {
							portfolio.trades.push(data._id);

							portfolio.save(function(err) {
								if (err) throw err;
							});

							res.status(200).json({
								success: true,
								message: 'Trade added successfully'
							});
						}
					});
				}
			});
		}
	});
};

api.updateTrade = function(req, res) {
	var tradeId = req.params.tradeId;
	Trade.findOne({
		_id: tradeId
	}, function(err, trade) {
		if (err) {
			res.status(500).send({
				success: false,
				data: err
			});
		} else if (!trade) {
			res.status(404).send({
				success: false,
				message: 'Trade Not Found'
			});
		} else {
			trade.stockName = req.body.stockName;
			tarde.portfolioName = req.body.portfolioName;
			trade.price = req.body.price;
			trade.quantity = req.body.quantity;
			trade.tradeType = req.body.tradeType;
			trade.save(function(err) {
				if (err) {
					res.status(500).send({
						success: false,
						data: err
					});
				} else {
					res.status(200).json({
						success: true,
						message: 'Trade updated successfully'
					});
				}
			});
		}
	});
};

api.removeTrade = function(req, res) {
	Trade.findOneAndDelete({
		_id: req.params.tradeId
	}, function(err, data) {
		if (err) {
			res.status(500).send({
				success: false,
				data: err
			});
		} else {
			Portfolio.updateOne({
				name: data.portfolioName
			}, {
				$pull: {
					trades: req.params.tradeId
				}
			}, function(err, portfolio) {
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
					res.status(200).send({
						success: true,
						message: 'Trade removed successfully'
					});
				}
			})
		}
	});
};

module.exports = api;
