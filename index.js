'use strict'

require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./lib/types')
const resolvers = require('./lib/resolvers')

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(async ({ url }) => {
  console.log(`Server running in: ${url}`)
})
