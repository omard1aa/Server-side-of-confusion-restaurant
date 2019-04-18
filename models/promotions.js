const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency');
const Currency = mongoose.Types.Currency;
const promoSchema = new Schema({
    "name": {
        type: String,
        unique: true,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "label": {
        type: String,
        default: ''
    },
    "description": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "featured": {
        type: Boolean,
        required: true
    }
});

var Promotions = mongoose.model('Promotion', promoSchema)
module.exports = Promotions;
