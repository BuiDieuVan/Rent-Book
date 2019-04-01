const Q = require('q');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const {userCollection,User} = require('./user.collection');
// const User = require('./user.collection');

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
module.exports = {

    login: (userParams) => {
        let defer = Q['defer']();
        try {
            User.findOne({
                    email: userParams.email
                })
                .exec()
                .then(user => {
                    if (_.isEmpty(user)) {
                        return defer.reject("mail not found")
                    }
                    bcrypt.compare(userParams.password, user.password, (err, result) => {
                        if (err) {
                            return defer.reject("auth failed")
                        }
                        if (result) {
                            let accessToken = jwt.sign(
                                {
                                    email: user.email,
                                    userId: user._id,
                                    // role: user.role || 'none'
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: '30d'
                                }
                            );
                            return defer.resolve({
                                accessToken
                            })
                        } else {
                            return defer.reject("auth failed")
                        }
                    })
                })
                .catch(err => {
                    return defer.reject(err)
                })
        } catch (ex) {
            console.log(ex)
        }
        return defer.promise;
    }

}
