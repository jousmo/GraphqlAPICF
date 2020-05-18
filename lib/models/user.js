'use strict'

const mongoose = require('../db')

const userSchema = new mongoose.Schema({
  email: String,
  hashedPassword: {
    type: String
  },
  token: String,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
})

module.exports = mongoose.model('User', userSchema)
