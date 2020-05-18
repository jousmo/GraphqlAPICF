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
  { id: 2, title: 'Vue JS Yeha', views: 500 },
  { id: 3, title: 'Angular JS Yeha', views: 100 }
]

// Definicion Schema
const schema = buildSchema(`
  type Course {
    id: ID!
    title: String!
    views: Int
  }

  type Query {
    "Return Array List Of Courses"
    getCourses(page: ID, limit: ID = 1): [Course]
    "Return One Course by ID"
    getCourse(id: ID!): Course
  }

  input CourseInput {
    title: String!
    views: Int
  }

  input CourseEditInput {
    title: String
    views: Int
  }

  type Mutation {
    "Create One Course"
    createCourse(input: CourseInput!): Course
    "Edit One Course By ID"
    editCourse(id: ID!, input: CourseEditInput!): Course
    "Delete One Course By ID"
    deleteCourse(id: ID!): Boolean
  }
`)

// Definimos los resolvers de mi Schema
const resolvers = {
  getCourses (args) {
    const { page, limit } = args
    if (page) {
      const pageCourse = courses.slice(((page - 1) * limit), (page * limit))
      return pageCourse
    }

    return courses
  },

  getCourse (args) {
    const { id } = args
    const course = courses.find(course => course.id === +id)
    return course
  },

  createCourse (args) {
    const { input } = args

    const id = courses.length + 1
    const newCourse = { id, ...input }
    courses.push(newCourse)
    return newCourse
  },

  editCourse (args) {
    const { id, input } = args
    const index = courses.findIndex(course => course.id === +id)
    const course = courses[index]
    const updatedCourse = Object.assign(course, { ...input })
    courses[index] = updatedCourse
    return updatedCourse
  },

  deleteCourse (args) {
    const { id } = args
    const index = courses.findIndex(course => course.id === +id)

    if (index !== -1) {
      courses.splice(index, 1)
      return true
    }
    return false
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
