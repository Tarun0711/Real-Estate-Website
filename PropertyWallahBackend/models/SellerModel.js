const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerContactSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SellerContact', SellerContactSchema);
