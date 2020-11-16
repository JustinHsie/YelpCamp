const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const CampgroundSchema = new mongoose.Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);