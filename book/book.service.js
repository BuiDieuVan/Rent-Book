const Q = require('q');
const _ = require('lodash');
const Book = require('./book.model');

module.exports = {
    create: async (params) => {
        let {title, author, year, pages, price} = params;
        await Book.create({
            title: title,
            author: author,
            year: year,
            pages: pages,
            price: price
        }).then((book, err) => {
            if (err) {
                throw err;
            }
            return book;
        })

    }
}

module.exports ={
    find: async(params) =>{
       return await Book.find(params);
    }
}