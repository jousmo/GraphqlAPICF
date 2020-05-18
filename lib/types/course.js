'use strict'

module.exports = `
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
`
