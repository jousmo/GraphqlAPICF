'use strict'

const mongoose = require('../db')

const courseSchema = new mongoose.Schema({
  title: String,
  views: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Course', courseSchema)
