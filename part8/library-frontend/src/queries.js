import { gql } from 'apollo-boost'

export const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    author {
      name
    }
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
      born
      id
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