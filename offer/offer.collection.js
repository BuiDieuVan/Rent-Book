const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    email:String,
    name: String,
    price:Number,
    summary: String,// gioi thieu ve sach
    status: String,
    featured:Boolean // Nổi bật;
});
module.exports = mongoose.model('Offer', OfferSchema);
