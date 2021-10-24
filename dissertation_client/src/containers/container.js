import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ProcessPage,
  CreateProcess,
  WarehousePage,
  CreateWarehouse,
  DistributorPage,
  CreateDistributor,
  StationPage,
  CreateStation,
  PersonPage,
  CreateObjectInjection,
} from "./";

const Container = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ProcessPage} />
          <Route path="/create-process" component={CreateProcess} />
          <Route exact path="/warehouse" component={WarehousePage} />
          <Route exact path="/create-warehouse" component={CreateWarehouse} />
          <Route exact path="/distributor" component={DistributorPage} />
          <Route exact path="/station" component={StationPage} />
          <Route exact path="/create-station" component={CreateStation} />
          <Route exact path="/person" component={PersonPage} />
          <Route exact path="/create-person" component={CreateObjectInjection} />
          <Route
            exact
            path="/create-distributor"
            component={CreateDistributor}
          />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Container;
