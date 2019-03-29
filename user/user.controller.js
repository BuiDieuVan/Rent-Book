const userService = require('./user.service');
const insertUser = require('./user.collection');
const {userCollection,User} = require('./user.collection');

module.exports.register = async (req, res) =>{
	let {name, email, password} = req.body  
    try {
        await userCollection.insertUser(name, email, password)
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
// module.exports.register = function(req, res) {
// 	var User = new User(req.body);
// 	User.hash_password = bcrypt.hashSync(req.body.password, 10);
// 	User.save(function(err, user) {
// 	  if (err) {
// 		return res.status(400).send({
// 		  message: err
// 		});
// 	  } else {
// 		user.hash_password = undefined;
// 		return res.json(user);
// 	  }
// 	});
//   };

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
				data
			})
		}).catch(err => {
			res.status(401).json({
				errors: err
			})
		})
}