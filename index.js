'use strict'

require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()
const port = process.env.port || 3001
const isDev = process.env.NODE_ENV !== 'production'

const courses = [
  { id: 1, title: 'React JS Yeha', views: 1000 },
  { id: 2, title: 'Vue JS Yeha', views: 500 }
]

// Definicion Schema
const schema = buildSchema(`
  type Course {
    id: ID!
    title: String!
    views: Int!
  }

  type Query {
    "Return Array List Of Courses"
    getCourses: [Course]
    "Return One Course by ID"
    getCourse(id: ID!): Course
  }

  type Mutation {
    "Create One Course"
    createCourse(title: String!, views: Int!): Course
  }
`)

// Definimos los resolvers de mi Schema
const resolvers = {
  getCourses () {
    return courses
  },

  getCourse (args) {
    const { id } = args
    const course = courses.find(course => course.id === +id)
    return course
  },

  createCourse (args) {
    const { title, views } = args

    const id = courses.length + 1
    const newCourse = { id, title, views }
    courses.push(newCourse)
    return newCourse
  }
}

// Creamos el API Grahpql
app.use('/api', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(port, () => {
  isDev ? console.log(`Now browse to localhost:${port}/api`) : console.log('Server Running...')
})
