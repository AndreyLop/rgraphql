import gql from "graphql-tag";

export const CURRENT_USER = gql`
  query {
    user {
      id
      email
    }
  }
`;
