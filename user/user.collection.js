const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    //schema :cau truc cua 1 collection
    name:{type:String, default:'unknown',unique:true},
    email: {type: String, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique: true},
    password: {type: String, required: true},    
    
})
// => chuyen tu Schema sang Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
