import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProcessPage, CreateProcess } from "./";

const Container = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ProcessPage} />
          <Route exact path="/create-process" component={CreateProcess} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Container;
