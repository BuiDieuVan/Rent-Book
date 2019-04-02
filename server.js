require('dotenv').config();
const express = require('express');
const route =express.Router();
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const config = require('./config/dev.json');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

const userRoutes = require('./user/user.route');
const adminRoutes = require('./admin/admin.route');
const bookRoutes = require('./book/book.route');

mongoose.connect(config.MONGO_URI, {useNewUrlParser: true});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(expressValidator());


app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore-VanVan!"}));
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/book',bookRoutes)
// app.use('/book', bookRoutes);

// app.use('/apidoc', express.static('build'));




app.listen(port);
console.log("Listening on port " + port);

