const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre){
        return await Book.find({}).populate('author')
      } else if (!args.author){
        return await Book.find( { genres: { $in: [ args.genre ] } } ).populate('author')
      } else if (!args.genre) {
        const books = await Book.find({}).populate('author')
        return books.filter(b => b.author.name === args.author)
      } else {
        const books = await Book.find({ genres: { $in: [ args.genre ] }}).populate('author')
        return books.filter(b => b.author.name === args.author)
      }
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Book: {
    author: root => {
      return {
        name: root.author.name,
        born: root.author.born,
        id: root.author.id
      }
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated")

      var authorObj = await Author.findOne({ name: args.author })
      if (!authorObj) {
        const newAuthor = new Author({ name: args.author })
        try {
          const savedAuthor = await newAuthor.save()
          authorObj = savedAuthor
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const newBook = new Book({ ...args, author: authorObj })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const book = await Book.findOne({ title: newBook.title }).populate('author')
      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated")

      const author = await Author.findOne({name: args.name})
      if (!author) return null
      author.born = args.setBornTo
      
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username })  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) throw new UserInputError("wrong credentials")
      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: { $in: [ root._id ] } })
      return books.length
    }
  }
}

module.exports = { resolvers }