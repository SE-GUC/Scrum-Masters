import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import "bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Navigationbar from "./Compnents/navigationbar";
import AllCompanies from "./Compnents/allCompanies";
import CompanyUpdate from "./Compnents/CompanyUpdate";
import Home from "./Compnents/Home";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigationbar />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/allCompanies" component={AllCompanies} />
          <Route exact path="/CompanyUpdate" component={CompanyUpdate} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;