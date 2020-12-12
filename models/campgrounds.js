const mongoose = require('mongoose');
const schema = mongoose.Schema;

const campgroundSchema = new schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    location: {
        type: String
    }

})

module.exports = mongoose.model('Campground', campgroundSchema)