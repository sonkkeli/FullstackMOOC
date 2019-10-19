import { gql } from 'apollo-boost'

export const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    genres
    id
    author{
      name      
    }
  }
}
`

export const FIND_AUTHOR = gql`
query findAuthor( $name: String!){
findAuthor( name: $name) {
    name
    born
    id
    bookCount
  }
}
`

export const ADD_BOOK = gql`
mutation addBook( $title: String!, $author: String!, $published: Int!, $genres: [String!]! ) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    id
    author {
      name
    }
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor( $name: String!, $born: Int! ) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
    born
    bookCount
  }
}
`