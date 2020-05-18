'use strict'

module.exports = `
  type User {
    id: ID!
    email: String!
    hashedPassword: String
    token: String
    courses: [Course]
  }

  extend type Query {
    "Return Array List Of Users"
    getUsers(page: ID, limit: ID = 1): [User]
    "Return One User by ID"
    getUser(id: ID!): User
  }

  input UserInput {
    email: String!
    hashedPassword: String
    token: String
  }

  extend type Mutation {
    "SignUp User"
    signUp(input: UserInput!): User
    "LogIn User"
    logIn(input: UserInput!): User
    "SignOut User"
    signOut: Boolean
  }
`
