import React from "react";
import { Form, Field } from "react-final-form";
import { MutationFunctionOptions, ExecutionResult } from "react-apollo";
import { FORM_ERROR } from "final-form";

type LoginData = {
  email: string;
  password: string;
};

type Props = {
  handler: (
    options?:
      | MutationFunctionOptions<LoginData, Record<string, any>>
      | undefined
  ) => Promise<ExecutionResult<any>>;
  errorMessage?: string;
};

export const AuthForm: React.FC<Props> = ({ handler, errorMessage }) => {
  const handleSubmit = async (data: LoginData) => {
    const { email, password } = data;
    try {
      await handler({ variables: { email, password } });
    } catch (e) {
      return { [FORM_ERROR]: "GraphQL Error" };
    }
  };

  const requiredA = (value: string) => {
    if (!value) {
      return "This field is required";
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      render={props => {
        return (
          <div className="row">
            <form onSubmit={props.handleSubmit} className="col s4">
              <div className="input-field">
                <Field
                  name="email"
                  component="input"
                  placeholder="Email"
                  validate={requiredA}
                />
              </div>
              <div className="input-field">
                <Field
                  name="password"
                  validate={requiredA}
                  render={props => {
                    const { error, touched, submitError } = props.meta;
                    return (
                      <div>
                        <input
                          type="password"
                          {...props.input}
                          placeholder="Password"
                        />
                        {(error || submitError) && touched && (
                          <span>{error || submitError}</span>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
              {props.submitError && <div>{errorMessage}</div>}
              <button className="btn" type="submit" disabled={props.submitting}>
                Submit
              </button>
            </form>
          </div>
        );
      }}
    />
  );
};
