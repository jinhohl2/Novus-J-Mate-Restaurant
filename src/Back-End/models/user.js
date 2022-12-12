var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    address: {
        type: [Number],
        required: true
    },
    placesVisited: [String],

    reviews: [String],

    uniqueVisits: {
        type: [Number],
        default: new Array(12).fill(0)
    },
    lastClickOn: Date,
    dateCreated: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User', UserSchema);
