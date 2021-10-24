import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProcessPage, CreateProcess, WarehousePage, CreateWarehouse } from "./";

const Container = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ProcessPage} />
          <Route path="/create-process" component={CreateProcess} />
          <Route exact path="/warehouse" component={WarehousePage} />
          <Route exact path="/create-warehouse" component={CreateWarehouse} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Container;
