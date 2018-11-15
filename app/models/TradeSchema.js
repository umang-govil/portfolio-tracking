var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TradeSchema = new Schema({
	stockName: {
		type: String,
		required: true
	},
	portfolioName: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	tradeType: {
		type: String,
		required: true
	},
	date: {
		type: Date
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Trade', TradeSchema);
