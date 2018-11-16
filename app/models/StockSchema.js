var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StockSchema = new Schema({
	name: {
		type: String,
		index: {
			unique: true
		},
		required: true
	},
	description: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Stock', StockSchema);
