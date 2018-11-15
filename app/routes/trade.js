var Trade = require('../models/TradeSchema');
var Stock = require('../models/StockSchema');

var express = require('express');

var api = express.Router();
var mongoose = require('mongoose');

api.addStock = function(req, res) {
	var stock = new Stock({
		name: req.body.stockName
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
			var trade = new Trade({
				stockName: req.body.stockName,
				price: req.body.price,
				quantity: req.body.quantity,
				tradeType: req.body.type,
				date: new Date()
			});
			trade.save(function(err, data) {
				if (err) {
					res.status(500).send({
						success: false,
						data: err
					});
				} else {
					stock.trades.push(data._id);

					stock.save(function(err) {
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
};

module.exports = api;
