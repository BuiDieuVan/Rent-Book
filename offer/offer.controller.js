const _ = require('lodash');
const { OfferSchema } = require('./offer.collection');

/**
 * @api {POST} /v1/book/offer 1 Creat
 * @apiName creat
 * @apiGroup Offer
 * @apiDescription Creat new offer 
 * @apiVersion 1.0.0
 * 
 * @apiParam (Header) {application/json} Content-Type Content type header
 * 
 */
module.exports = {
    addOffer: (req, res, next) => {
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is required').isMongoId();
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('price', 'Price is required').notEmpty();
        req.checkBody('summary', 'Summary is required').notEmpty();
        req.checkBody('status', 'status is required ').notEmpty();
        req.checkBody('featured', 'featured is required').notEmpty();

        if (errors) return errors;
        const body = pick(req.body, ['email', 'name', 'price', 'summary', 'status', 'featured']);
        Offer.create(body)
            .then(offer => {
                return res.ok(offer);
            })
            .catch(err => {
                res.bad(err);
            })
    }
}



