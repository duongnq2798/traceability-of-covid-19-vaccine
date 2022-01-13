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
  LogisticDetails,
  WarehouseDetails,
  DistributorDetails,
  StationDetails,
  PersonDetails,
  AdminPage,
  CreareAdmin,
  TempDashboard,
  QRCodeView
} from "./";

const Container = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ProcessPage} />
          <Route path="/create-process" component={CreateProcess} />
          <Route exact path="/warehouse" component={WarehousePage} />
          <Route exact path="/warehouse/:id" component={WarehouseDetails} />
          <Route exact path="/create-warehouse" component={CreateWarehouse} />
          <Route exact path="/distributor" component={DistributorPage} />
          <Route exact path="/distributor/:id" component={DistributorDetails} />
          <Route exact path="/station" component={StationPage} />
          <Route exact path="/station/:id" component={StationDetails} />
          <Route exact path="/create-station" component={CreateStation} />
          <Route exact path="/person" component={PersonPage} />
          <Route exact path="/person/:id" component={PersonDetails} />
          <Route exact path="/create-person" component={CreateObjectInjection} />
          <Route exact path="/logistic-details/:id" component={LogisticDetails} />
          <Route exact path="/manage-admin" component={AdminPage} />
          <Route
            exact
            path="/create-distributor"
            component={CreateDistributor}
          />
          <Route
            exact
            path="/create-admin"
            component={CreareAdmin}
          />
          <Route
            exact
            path="/temperature-dashboard"
            component={TempDashboard}
          />
          <Route
            exact
            path="/qrcode-view/:id"
            component={QRCodeView}
          />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Container;
