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

    usersVisited: [String],

    reviews: [String],
    
    dateCreated: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Place', PlaceSchema);
