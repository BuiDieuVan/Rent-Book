const userService = require('./user.service');

const {userCollection,User} = require('./user.collection');
const {insertUser}  = require('./user.collection');
// const Book = require('./book/book.models')

module.exports.register = async (req, res) =>{
	let {name, email, password} = req.body  
    try {
        await insertUser(name, email, password)
	  	res.json({
	  		result: 'ok',
	  		message: 'User register succesfull'
	  	})		
	} catch(error) {
		res.json({
            result: 'failed',
            message: `Error : ${error}`
        })
	}

}


module.exports.login = (req, res, next) => {
	let errors = [];
	let email = req.body.email || '',
		password = req.body.password || '';
	if (!email.length) {
		errors.push('Email is required!');
	}
	if (!password.length) {
		errors.push('Password is required!')
	}
	if (errors.length) {
		return res.status(401).json({
			errors: errors
		})
	}
	userService.login(req.body)
		.then(data => {
			res.json({
				message:"Honey,Do you want rent our StoreBook-VanVan!!!"
			})
		}).catch(err => {
			res.status(401).json({
				errors: err
			})
		})
}

// module.exports.list =(req,res,next) =>{
// 	const params = req.body;
// 	const quey = Book.find({})
// 		query.exec((err,books) =>{
// 			if(err) console.log(`Store-Book close!`)
// 			else res.json(books)
// 		})
// 	if(params.page){
// 		req.checkQuery('page','Page Invalid').isNumric();
// 	}
// 	if(params.page_size){
// 		req.checkQuery('page','Page size invalid').isNumric();
// 	}
// }
module.exports.list = (req,res) =>{
   const params = {
	   user: req.uer.id,
	   query: req.query
   }
   Book.list(params)
   .then(book =>{
	   return res.ok(book);
   })
   .catch(err=>{
	   return res.bad(err);
   })
}

