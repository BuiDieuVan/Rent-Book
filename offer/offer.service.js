const mongoose = require('mongoose');
const { OfferSchema } = require('./offer.collection')

module.exports = {
    addOffer: (req, res, next) => {
        if (errors) return errors;
        Offer.save()
            .then(offer => {
                return res.ok(offer);
            })
            .catch(err => {
                res.bad(err)
            })
    }
}