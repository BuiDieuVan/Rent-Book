
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    //schema :cau truc cua 1 collection
    name:{type:String, default:'unknown',unique:true},
    email: {type: String, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique: true},
    password: {type: String, required: true},    
    
})
// => chuyen tu Schema sang Model
 const User = mongoose.model('User',UserSchema);
 
 const insertUser = async (name,email,password) =>{
    try {
    	//Mã hoá password trước khi lưu vào DB
	    const encryptedPassword = await bcrypt.hash(password, 10)//saltRounds = 10
        const newUser = new User
        newUser.name = name
        newUser.email = email
        newUser.password = encryptedPassword        
        await newUser.save()
    } catch(error) {
        
        if (error.code === 11000) {
        	throw "Tên hoặc email đã tồn tại!!"
        }
        
    }
}
module.exports = {User, insertUser}
