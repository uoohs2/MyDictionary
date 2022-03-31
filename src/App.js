import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import Add from "./Add";
import Modify from "./Modify";

function App() {
  return (
    <>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/add">
        <Add />
      </Route>
      <Route path="/modify/:voca">
        <Modify />
      </Route>
    </>
  );
}

export default App;
