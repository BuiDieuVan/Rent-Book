const {OfferSchema} = require('./offer.collection')
const express = require('express');
const route = express.Router;

route.post('/book/offer',controller.addOffer);