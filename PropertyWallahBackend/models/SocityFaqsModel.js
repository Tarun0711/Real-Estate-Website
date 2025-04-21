const mongoose = require("mongoose");

const SocietyFAQSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    society: { type: Schema.Types.ObjectId, ref: 'Society', required: true }
}, { timestamps: true });

module.exports = mongoose.model('SocietyFAQ', SocietyFAQSchema);
