'use strict'

const mongoose = require('mongoose')

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT
} = process.env

const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err) => {
  console.error('Could not connect do db', mongoUrl, err)
  process.exit(1)
})
db.once('open', () => {
  console.log('Connect db', mongoUrl)
})

module.exports = mongoose
