const Book = require('../book/book.model')


/* POST */
module.exports.postBook =(req,res,next) =>{
    // create a new Book
    const Book = new newBook(req.body);
    //save into DB
    Book.save((err,book) =>{
        if(err) {
            res.send(err,book) 
        }
        else{
            res.json({
                data:book,
                message:'Book success added!!'
            })
        }
    });
}