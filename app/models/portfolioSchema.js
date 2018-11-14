var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
	trades: [{
		type: Schema.Types.ObjectId,
		ref: 'Trade'
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
