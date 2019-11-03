import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { AuthForm } from "./AuthForm";
import { LOGIN } from "../mutations/login";
import { CURRENT_USER } from "../queries/currentUser";

export const LoginForm: React.FC = () => {
  const [login, { error }] = useMutation(LOGIN, {
    refetchQueries: [{ query: CURRENT_USER }],
    awaitRefetchQueries: true // By derfault mutation is not waiting for refetchQueries to end for mutation complete, now it will
  });
  const errorMessage = error && error.graphQLErrors[0].message;
  return (
    <>
      <h1>Login</h1>
      <AuthForm handler={login} errorMessage={errorMessage} />
    </>
  );
};
