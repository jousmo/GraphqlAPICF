'use strict'

require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./lib/types')
const resolvers = require('./lib/resolvers')

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({ schema })

server.listen().then(async ({ url }) => {
  console.log(`Server running in: ${url}`)
})
