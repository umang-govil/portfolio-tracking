var express = require('express');

var trade = require('./trade');
var portfolio = require('./portfolio');

var api = express.Router();

api.post('/addTrade', trade.addTrade);
api.post('/addStock', trade.addStock);
api.put('/updateTrade/:tradeId', trade.updateTrade);
api.delete('/removeTrade/:tradeId', trade.removeTrade);

api.post('/createPortfolio', portfolio.createPortfolio);
api.get('/', portfolio.getPortfolio);

module.exports = api;
