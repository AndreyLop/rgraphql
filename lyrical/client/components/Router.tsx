import React from "react";
import { HashRouter, Route, Switch, Link } from "react-router-dom";

import { SongList } from "./SongList";
import { SongCreate } from "./SongCreate";

export const Router = () => {
  return (
    <HashRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Songs</Link>
            </li>
            <li>
              <Link to="/song/new">Add Song</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/song/new" component={SongCreate} />
        <Route exact path="/" component={SongList} />
      </Switch>
    </HashRouter>
  );
};
