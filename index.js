'use strict'

require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./lib/types')
const resolvers = require('./lib/resolvers')
const context = require('./lib/auth')

const server = new ApolloServer({ typeDefs, resolvers, context })

server.listen().then(async ({ url }) => {
  console.log(`Server running in: ${url}`)
})
