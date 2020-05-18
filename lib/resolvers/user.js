'use strict'

const User = require('../models/user')

module.exports = {
  Query: {
    async getUsers (root, args) {
      const { page, limit } = args

      try {
        let users = User.find().populate('courses')
        if (page !== undefined) {
          users = users.limit(+limit).skip((+page - 1) * +limit)
        }
        return await users
      } catch (err) {
        console.log(err)
      }
    },

    async getUser (root, args) {
      const { id } = args
      try {
        const user = await User.findById(id)
        return user
      } catch (err) {
        console.log(err)
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
        console.log(err)
      }
    },

    async logIn (root, args) {
    },

    async signOut (root, args) {

    }
  }
}
