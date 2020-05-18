'use strict'

const mongoose = require('../db')

const courseSchema = new mongoose.Schema({
  title: String,
  views: Number
})

module.exports = mongoose.model('Course', courseSchema)
