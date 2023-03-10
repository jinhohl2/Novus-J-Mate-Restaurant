var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        type: [Number],
        required: true
    },
    
    cuisine: {
        type: String,
        default: "N/A"
    },

    dishes: [String],

    usersVisited: [String],

    reviews: [String],
    
    imageUrl: String,

    websiteUrl: String,

    dateCreated: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Place', PlaceSchema);
