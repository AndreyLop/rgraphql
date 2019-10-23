import gql from "graphql-tag";

// Here mutation has name AddSong its neede donly if you want to pass arguments to mutation/query
// They arte called qury variables
// Also notice String!
export const ADD_SONG = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;
