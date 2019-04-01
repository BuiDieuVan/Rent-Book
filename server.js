require('dotenv').config();
const express = require('express');
const route =express.Router();
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoute = require('./user/user.route')
const adminRoute = require('./admin/admin.route')
const port = process.env.PORT || 8080;
const controller = require('./user/user.controller')
// // const book = require('./app/routes/book.controller');
const config = require('./config/dev.json');
const mongoose = require('mongoose');
const book = require('./admin/admin.controller');

mongoose.connect(config.MONGO_URI, {useNewUrlParser: true});


// // if(config.util.getEnv('NODE_ENV') !== 'test') { app.use(morgan('combined')); });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));


app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore-VanVan!"}));
app.use('/register',controller.register)
app.use('/login',controller.login);

app.use('/book',book.postBook)

// app.use('/apidoc', express.static('build'));




app.listen(port);
console.log("Listening on port " + port);

