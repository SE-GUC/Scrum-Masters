import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import "bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Navigationbar from "./Compnents/navigationbar";
import AllCompanies from "./Compnents/allCompanies";

import CompanyForm from "./Compnents/CompanyForm";
import CompanyUpdate from "./Compnents/CompanyUpdate";

import AllUnassignedCompanies from './Compnents/unassignedCompanies'

import Home from "./Compnents/Home";
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


          <Route exact path="/companyform" component={CompanyForm} />

          <Route exact path="/CompanyUpdate" component={CompanyUpdate} />

          <Route exact path="/unassignedCompanies" component={AllUnassignedCompanies} />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
