import React, { Component } from "react";
import "./App.css";
import "bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Navigationbar from "./components/navigationbar";
import AllCompanies from "./components/allCompanies";
import ApplicationReview from "./components/applicationReview";
import SignUp from "./components/signup";
import CompanyForm from "./components/CompanyForm";
import CompanyUpdate from "./components/CompanyUpdate";
import AllUnassignedCompanies from './components/unassignedCompanies'

import Home from "./components/Home";
import admin_create from "./components/admin_create";
import lawyerAssignedApplications from "./components/lawyerAssignedApplications";
import reviewerAssignedApplications from "./components/reviewerAssignedApplications.js";
import userCreatedApplications from "./components/userCreatedApplications";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigationbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/allCompanies" component={AllCompanies} />
          <Route exact path="/applicationReview" component={ApplicationReview} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/companyform" component={CompanyForm} />
          <Route exact path="/CompanyUpdate" component={CompanyUpdate} />
          <Route exact path="/unassignedCompanies" component={AllUnassignedCompanies} />
          <Route exact path="/admin_create" component={admin_create} />
          <Route exact path="/lawyerAssignedApplication" component={lawyerAssignedApplications} />
          <Route exact path="/reviewerAssignedApplication" component={reviewerAssignedApplications} />
          <Route exact path="/userCreatedApplication" component={userCreatedApplications} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
