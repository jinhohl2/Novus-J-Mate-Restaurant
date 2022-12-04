var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        required: true
    },

    restaurantName: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },
    
    description: {
        type: String,
        default: ""
    },
    
    dateCreated: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
