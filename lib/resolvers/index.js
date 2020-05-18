'use strict'

const { merge } = require('lodash')
const resolversCourse = require('./course')
const resolversUser = require('./user')

module.exports = merge(resolversCourse, resolversUser)
