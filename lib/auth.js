'use strict'

const jwt = require('jsonwebtoken')
const User = require('./models/user')

module.exports = async ({ req }) => {
  let currenUser = null
  const token = req.headers.authorization
  if (!token) return {}

  const decodeInfo = jwt.verify(token, process.env.SECRET)
  if (decodeInfo) {
    currenUser = await User.findById(decodeInfo.id)
    if (!currenUser) return new Error('Invalid token')
  }

  return { token, currenUser }
}
