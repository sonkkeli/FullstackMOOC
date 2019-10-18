const { ApolloServer, gql } = require('apollo-server')
var books = require('./dummydata').books
var authors = require('./dummydata').authors

const typeDefs = gql`
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
  }

  type Author {
    name: String!
    id: ID!
    born: Int!
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
    authorCount: () => authors.length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
