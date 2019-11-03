import gql from "graphql-tag";

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;
