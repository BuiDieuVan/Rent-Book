const userService = require('./user.service');

module.exports.register = async (req, res) =>{
	req.checkBody('name', 'Name is required').trim().notEmpty();
	const errors = req.validationErrors();
	console.log(errors);
	if (errors) {
	  return res.json({
		status: 422,
		errors: errors
	  });
	}
    try {
        await userService.register(req.body).then((user, err) => {
			if (err) {
				throw err;
			}
			res.json({
				result: 'ok',
				message: 'User register succesfull',
				user: user
			})	
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
