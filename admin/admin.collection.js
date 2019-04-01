const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const AdminSchema = new Schema(
    {
        name:{type:String,required:true},
        hash_password:{type:String,required:true},
        email:{type:String,trim:true,required:true},
        first_name:String,
        last_name:String,
    });
    // comparePasswprd
    AdminSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password,this.hash_password);
    }
    //Export function to create "AdminSchema" model class
    module.exports = mongoose.model('Admin',AdminSchema)
    