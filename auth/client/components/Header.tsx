import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../components/App";
import { CURRENT_USER } from "../queries/currentUser";
import { LOGOUT } from "../mutations/logout";

interface UserData {
  user: {
    id: string;
    email: string;
  };
}

export const Header: React.FC = () => {
  const history = useHistory();
  const context = useContext<any>(AuthContext);

  const { loading, error, data } = useQuery<UserData>(CURRENT_USER);

  const [logout] = useMutation(LOGOUT, {
    refetchQueries: () => [{ query: CURRENT_USER }]
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    if (data && data.user) {
      context.authenticate();
      history.push("/dashboard");
    } else {
      context.unauthenticate();
    }
  }, [data && data.user]);

  const renderButtons = () => {
    if (loading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>Error {error}</div>;
    }

    if (data && data.user) {
      return (
        <li>
          <a onClick={handleClick}>Logout</a>
        </li>
      );
    }

    return (
      <>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </>
    );
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Home
        </Link>
        <ul className="right">{renderButtons()}</ul>
      </div>
    </nav>
  );
};
