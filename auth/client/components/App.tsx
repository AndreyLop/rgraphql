import React, { createContext, useState } from "react";
import { Header } from "./Header";

export const AuthContext = createContext({});

export const App: React.FC = ({ children }) => {
  const [authenticated, setAuthentication] = useState(false);

  const authenticate = () => setAuthentication(true);
  const unauthenticate = () => setAuthentication(false);

  const user = {
    authenticated,
    authenticate,
    unauthenticate
  };

  return (
    <AuthContext.Provider value={user}>
      <Header />
      {children}
    </AuthContext.Provider>
  );
};
