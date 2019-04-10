import React, { Component } from "react";
import "./App.css";
import "bootstrap";

import { BrowserRouter, Route } from "react-router-dom";
import Navigationbar from "./Compnents/navigationbar";

import ApplicationReview from "./Compnents/applicationReview";
import SignUp from "./Compnents/signup";
import CompanyForm from "./Compnents/CompanyForm";
import CompanyUpdate from "./Compnents/CompanyUpdate";
import AllUnassignedCompanies from "./Compnents/unassignedCompanies";
import investor from "./Compnents/investor_port";
import Home from "./Compnents/Home";
import admin_create from "./Compnents/admin_create";
import lawyerAssignedApplications from "./Compnents/lawyerAssignedApplications";
import reviewerAssignedApplications from "./Compnents/reviewerAssignedApplications.js";
import userCreatedApplications from "./Compnents/userCreatedApplications";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigationbar />
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/applicationReview"
            component={ApplicationReview}
          />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/companyform" component={CompanyForm} />
          <Route exact path="/CompanyUpdate" component={CompanyUpdate} />
          <Route
            exact
            path="/unassignedCompanies"
            component={AllUnassignedCompanies}
          />
          <Route exact path="/admin_create" component={admin_create} />
          <Route
            exact
            path="/lawyerAssignedApplication"
            component={lawyerAssignedApplications}
          />
          <Route
            exact
            path="/reviewerAssignedApplication"
            component={reviewerAssignedApplications}
          />
          <Route
            exact
            path="/userCreatedApplication"
            component={userCreatedApplications}
          />
          <Route exact path="/inv" component={investor} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
