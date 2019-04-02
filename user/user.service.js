const Q = require('q');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.collection');

module.exports = {
    register: async (params) =>{
        let {name, email, password} = params;
            try {
                //Mã hoá password trước khi lưu vào DB
                const encryptedPassword = await bcrypt.hash(password, 10)//saltRounds = 10    
                await User.insert({
                    name: name,
                    email: email,
                    password: encryptedPassword
                }).then((user, err) => {
                    if (err) {
                        throw err;
                    }
                    return user;
                })
            } catch(error) {
                
                if (error.code === 11000) {
                    throw "Tên hoặc email đã tồn tại!!"
                }
                
            }
    },

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
