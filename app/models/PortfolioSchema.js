var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PortfolioSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	trades: [{
		type: Schema.Types.ObjectId,
		ref: 'Trade'
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
