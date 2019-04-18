const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var favouritesSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    },
    label: {
        type: String,
        default: ''
    },

    featured: {
        type: Boolean,
        default:false
    },
    uname: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Favourites = mongoose.model('favourite', favouritesSchema);
module.exports = Favourites;