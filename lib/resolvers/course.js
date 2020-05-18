'use strict'

const Course = require('../models/course')
const User = require('../models/user')

module.exports = {
  Query: {
    async getCourses (root, args) {
      const { page, limit } = args

      try {
        let courses = Course.find().populate('user')
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
      const { input, user } = args
      try {
        const findUser = await User.findById(user)
        const course = new Course({ ...input, user })
        await course.save()
        findUser.courses.push(course)
        await findUser.save()
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
