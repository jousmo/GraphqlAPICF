'use strict'

const Course = require('../models/course')

module.exports = {
  Query: {
    async getCourses (root, args) {
      const { page, limit } = args

      try {
        let courses = Course.find()
        if (page !== undefined) {
          courses = courses.limit(+limit).skip((+page - 1) * +limit)
        }
        return await courses
      } catch (err) {
        console.log(err)
      }
    },

    async getCourse (root, args) {
      const { id } = args
      try {
        const course = await Course.findById(id)
        return course
      } catch (err) {
        console.log(err)
      }
    }
  },
  Mutation: {
    async createCourse (root, args) {
      const { input } = args

      try {
        const course = new Course({ ...input })
        await course.save()
        return course
      } catch (err) {
        console.log(err)
      }
    },

    async editCourse (root, args) {
      const { id, input } = args

      try {
        const course = await Course.findByIdAndUpdate(id, input)
        return course
      } catch (err) {
        console.log(err)
      }
    },

    async deleteCourse (root, args) {
      const { id } = args

      try {
        await Course.findByIdAndRemove(id)
        return true
      } catch (err) {
        console.log(err)
      }
    }
  }
}
