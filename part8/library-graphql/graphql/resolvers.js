const { ApolloServer, UserInputError, gql } = require('apollo-server')
const Author = require('../models/author')
const Book = require('../models/book')

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
    allAuthors: async () => await Author.find({})
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
    addBook: async (root, args) => {    
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

    editAuthor: async (root, args) => {
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