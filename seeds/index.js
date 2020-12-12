const mongoose = require('mongoose');
const Campground = require('../models/campgrounds')
const { places, descriptors } = require('./seedsHelper')
const cities = require('./cities');

//Connecting mongoose database

mongoose.connect('mongodb://127.0.0.1:27017/mycampdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', () => console.log(error));
db.once('open', () => console.log('databse is connected'));

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDb = async() => {
    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const randomCity = Math.floor(Math.random() * 1000);
        const cityData = new Campground({
            location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        });
        await cityData.save()
    }
}

seedDb().then(() => mongoose.connection.close());