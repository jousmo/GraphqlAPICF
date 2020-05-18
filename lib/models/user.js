'use strict'

const mongoose = require('../db')
const bcryp = require('bcrypt')

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

userSchema.virtual('password')

userSchema.pre('validate', async function () {
  try {
    const hash = await bcryp.hash(this.password, 10)
    this.hashedPassword = hash
  } catch (err) {
    console.error(err)
    return new Error('Not hash created.')
  }
})

userSchema.statics.auth = async function ({ email, password }) {
  const user = await this.findOne({ email })
  if (!user) return new Error('Email not found.')

  const compare = await bcryp.compare(password, user.hashedPassword)
  if (!compare) return new Error('Email or password are wrong.')

  return user
}

module.exports = mongoose.model('User', userSchema)
