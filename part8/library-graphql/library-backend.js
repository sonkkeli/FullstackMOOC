const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typedefs').typeDefs
const resolvers = require('./graphql/resolvers').resolvers
require('dotenv').config()

mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
