const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//book schema definition
const Book = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    pages: { type: Number, required: true, min: 1 },
    price:{type:Number, required:true},
    createdAt: { type: Date, default: Date.now },
    
  },
  {
    versionKey: false
  },
);

// Sets the createdAt parameter equal to the current time
Book.pre('save', next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('book', Book);