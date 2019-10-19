const { ApolloServer, UserInputError, gql } = require('apollo-server')
const Author = require('../models/author')
const Book = require('../models/book')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(await Book.find({}))
      let books = []
      if (!args.author && !args.genre){
        books = await Book.find({}).populate('author', { name: 1, born: 1, id: 1 })
      }
      return books
      // else if(args.author && args.genre) {
      //   return books.filter(b => b.genres.includes(args.genre) && b.author === args.author)
      // } else if (!args.author) {
      //   return books.filter(b => b.genres.includes(args.genre))
      // } else {
      //   return books.filter(b => b.author === args.author)
      // }
    },
    allAuthors: async () => await Author.find({})
  },
  Book: {
    author: root => {
      return {
        name: root.name,
        born: root.born,
        id: root.id
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log('lisätään', args)      
      var author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          author = await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const newBook = new Book({ ...args, author })
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
      console.log(root)
      return await Book.find({ author: root.id }).length
    }
  }
}

module.exports = { resolvers }