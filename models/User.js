const mongoose = require('mongoose')
const Schema = mongoose.Schema

// creating schema

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    pwd: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: Number, required: true },
    age: { type: Number, default: 18 },
    gender: { type: String, required: true },
    skills: { type: Array }
  },
  {
    timestamps: true
  }
)

// exporting model
module.exports = User = mongoose.model('users', UserSchema)
