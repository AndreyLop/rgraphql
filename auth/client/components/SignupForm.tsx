import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { AuthForm } from "../components/AuthForm";
import { SIGNUP } from "../mutations/signup";
import { CURRENT_USER } from "../queries/currentUser";

export const SignupForm = () => {
  const [handler] = useMutation(SIGNUP, {
    refetchQueries: [{ query: CURRENT_USER }],
    awaitRefetchQueries: true // By derfault mutation is not waiting for refetchQueries to end for mutation complete, now it will
  });

  return (
    <>
      <h1>Sign Up</h1>
      <AuthForm handler={handler} />
    </>
  );
};
