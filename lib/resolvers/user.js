'use strict'

const User = require('../models/user')
const Course = require('../models/course')

module.exports = {
  Query: {
    async getUsers (root, args) {
      const { page, limit } = args

      try {
        let users = User.find()
        if (page !== undefined) {
          users = users.limit(+limit).skip((+page - 1) * +limit)
        }
        return await users
      } catch (err) {
        console.error(err)
      }
    },

    async getUser (root, args) {
      const { id } = args
      try {
        const user = await User.findById(id)
        return user
      } catch (err) {
        console.error(err)
      }
    }
  },

  Mutation: {
    async signUp (root, args) {
      const { input } = args

      try {
        const user = new User(input)
        await user.save()
        return user
      } catch (err) {
        console.error(err)
      }
    },

    async logIn (root, args) {
    },

    async signOut (root, args) {

    }
  },

  User: {
    async courses (root) {
      const { id } = root

      try {
        const courses = await Course.find({ user: id })
        return courses
      } catch (err) {
        console.error(err)
      }
    }
  }
}
