'use strict'

const courses = [
  { id: 1, title: 'React JS Yeha', views: 1000 },
  { id: 2, title: 'Vue JS Yeha', views: 500 },
  { id: 3, title: 'Angular JS Yeha', views: 100 }
]

module.exports = {
  Query: {
    getCourses (root, args) {
      const { page, limit } = args
      if (page) {
        const pageCourse = courses.slice(((page - 1) * limit), (page * limit))
        return pageCourse
      }

      return courses
    },

    getCourse (root, args) {
      const { id } = args
      const course = courses.find(course => course.id === +id)
      return course
    }
  },
  Mutation: {
    createCourse (root, args) {
      const { input } = args

      const id = courses.length + 1
      const newCourse = { id, ...input }
      courses.push(newCourse)
      return newCourse
    },

    editCourse (root, args) {
      const { id, input } = args
      const index = courses.findIndex(course => course.id === +id)
      const course = courses[index]
      const updatedCourse = Object.assign(course, { ...input })
      courses[index] = updatedCourse
      return updatedCourse
    },

    deleteCourse (root, args) {
      const { id } = args
      const index = courses.findIndex(course => course.id === +id)

      if (index !== -1) {
        courses.splice(index, 1)
        return true
      }
      return false
    }
  }
}
