var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StockSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	trades: [{
		type: Schema.Types.ObjectId,
		ref: 'Trade',
		default: null
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('Stock', StockSchema);
