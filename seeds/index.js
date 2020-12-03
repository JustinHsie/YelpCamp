const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fbed19fab0528f974b317c2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit obcaecati explicabo at dicta quis, eaque cupiditate nesciunt pariatur culpa unde ea itaque eveniet assumenda cumque qui nobis, animi fugiat quam? ',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dmuj4nmyi/image/upload/v1606864018/YelpCamp/uqpq2vjhbcbespdpiujc.jpg',
                  filename: 'YelpCamp/uqpq2vjhbcbespdpiujc'
                },
                {
                  url: 'https://res.cloudinary.com/dmuj4nmyi/image/upload/v1606864027/YelpCamp/wvspyioei4f4ihdbkzmb.jpg',
                  filename: 'YelpCamp/wvspyioei4f4ihdbkzmb'
                }
              ]
        })
        await camp.save();
    }
}
seedDb().then(() => {
    mongoose.connection.close();
});