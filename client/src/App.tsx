import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Page from "./pages/Page";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/page" component={Page} exact />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
