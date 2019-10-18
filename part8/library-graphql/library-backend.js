const { ApolloServer, gql } = require('apollo-server')
var books = require('./dummydata').books
var authors = require('./dummydata').authors

const typeDefs = gql`
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre){
        return books
      } else if(args.author && args.genre) {
        return books.filter(b => b.genres.includes(args.genre) && b.author === args.author)
      } else if (!args.author) {
        return books.filter(b => b.genres.includes(args.genre))
      } else {
        return books.filter(b => b.author === args.author)
      }
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => {
      return books.filter(b => b.author === root.name).length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
