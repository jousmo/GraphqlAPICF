'use strict'

require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./lib/types/course')
const resolvers = require('./lib/resolvers/course')

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
  console.log(`Server running in: ${url}`)
})
