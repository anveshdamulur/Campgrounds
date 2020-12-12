const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { title } = require('process');
const Campground = require('./models/campgrounds');
const { urlencoded } = require('express');

const app = express();

const port = 3000;
//Connecting mongoose database

mongoose.connect('mongodb://127.0.0.1:27017/mycampdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', () => console.log(error));
db.once('open', () => console.log('databse is connected'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('models', path.join(__dirname, 'models'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('method'))
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('Campground/index', { campgrounds });
})
app.get('/campgrounds/new', (req, res) => {
    res.render('Campground/new');
})
app.post('/campgrounds', async(req, res) => {
    const result = new Campground(req.body.campground);
    await result.save();
    res.redirect('/campgrounds')
})
app.get('/campgrounds/:id', async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('Campground/show', { campground });
})
app.get('/campgrounds/:id/edit', async(req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render('Campground/edit', { camp });
})
app.put('/campgrounds/:id', async(req, res) => {
    // res.send('edited successfully')
    const id = req.params.id;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`); // res.redirect('/campgrounds);
})
app.delete('/campgrounds/:id', async(req, res) => {
    const id = req.params.id;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.listen(port, () => {
    console.log('server is listining port number ')
})