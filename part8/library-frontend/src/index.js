import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from "@apollo/react-hooks"
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)