// const BookService = require('./book.service');
const Book = require('./book.model');
const pick = require('lodash');
const ValidationError = require('validation-error')

/**
 * @api {Post} /v1/store/book 1.Create
 * @apiName Create
 * @apiGroup Book
 * @apiDescription Create a new Book
 * @apiVersion 1.0.0
 * @apiParams (Headers) {application/json} Content-Type Content type header
 * @apiScuccesExample {JSON} Response :HTTP/1.1 200 OK1
 */


module.exports.create = async (req, res) =>{
    // // validate
    ValidationError('title', 'Title is required');
    ValidationError('author','author is required');
    ValidationError('year','year is not required');
    ValidationError('pages','pages is not required');
    ValidationError('price','price is not required');

    // create
    const body = pick(req.body,['title','author','year','pages','price']);
      Book.create(body)
      .then(book =>{
        return res.ok(book);
      })
      .catch(err =>{
        return res.send(err);
      })
    }


module.exports.find = async(req,res) =>{
  //validator
 const params = req.body;
 Book.find(params)
 .then(books =>{
   return res.ok(books);
 })
 .catch(err =>{
   return res.send(err);
 });


}