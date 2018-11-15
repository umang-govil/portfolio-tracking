var Trade = require('../models/TradeSchema');
var Stock = require('../models/StockSchema');
var Portfolio = require('../models/PortfolioSchema');

var express = require('express');

var api = express.Router();
var mongoose = require('mongoose');

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

module.exports = api;
