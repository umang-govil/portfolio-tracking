var express = require('express');

var trade = require('./trade');

var api = express.Router();

api.post('/addTrade', trade.addTrade);
api.post('/addStock', trade.addStock);

module.exports = api;
