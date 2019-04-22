import React, { Component, Redirect } from "react";
import "./App.css";
import "bootstrap";

import { BrowserRouter, Route } from "react-router-dom";

import investor from "./components/investorPortal/investor_port";
import Navigationbar from "./components/layout/navigationbar";
import Home from "./components/layout/Home";
import Footer from "./components/layout/footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AllCompanies from "./components/allCompanies";
import ApplicationReview from "./components/applicationReview";
import CompanyForm from "./components/CompanyForm";
import CompanyUpdate from "./components/CompanyUpdate";
import CompanyView from "./components/CompanyView";

import admin_create from "./components/admin_create";
import lawyerAssignedApplications from "./components/lawyerAssignedApplications";
import reviewerAssignedApplications from "./components/reviewerAssignedApplications.js";
import userCreatedApplications from "./components/userCreatedApplications";
import electronicJournals from "./components/electronicJournal/electronicJournals";
import ContractView from "./components/electronicJournal/ContractView";
import userProfile from "./components/userProfile";
import notifications from "./components/Notifications"

const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class App extends Component {
  getHomeTarget() {
    if (!localStorage.getItem("userType")) return Home;
    else if (localStorage.getItem("userType") === "investor") return investor;
    else return AllCompanies;
  }
  
  static api(func, url, body = {}) {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    } else {
      delete(axios.defaults.headers.common['Authorization']);
    }
    return axios[func]("http://localhost:3001/api" + url, body);
  }
  
  componentDidMount() {
    if (localStorage.getItem("userId")) {
      App.api("get", "/user/" + localStorage.getItem("userId"))
        .catch(err => {
          if (err.response.status === 401) { //unauthorized
            Login.logout();
            this.refs.router.history.push("/login");
          }
        });
    }
  }
  
  render() {
    return (
      <BrowserRouter ref="router">
        <div>
          <Navigationbar />

          <Route
            exact
            path="/"
            component={this.getHomeTarget()}
          />
          <div className="App">
            <Route exact path="/allCompanies" component={AllCompanies} />
            <Route
              path="/applicationReview/:company_id"
              component={ApplicationReview}
            />
            <Route
              exact
              path="/register"
              render={props => (
                <Register onLogin={() => this.forceUpdate()} {...props} />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login onLogin={() => this.forceUpdate()} {...props} />
              )}
            />
            <Route exact path="/companyform" component={CompanyForm} />
            <Route
              path="/CompanyUpdate/:company_id"
              component={CompanyUpdate}
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
            <Route
              exact
              path="/electronicJournal"
              component={electronicJournals}
            />
            <Route path="/electronicJournal/:ej_id" component={ContractView} />
            <Route path="/userProfile/:user_id" component={userProfile} />
            <Route path="/company/:company_id" component={CompanyView} />
            <Route path="/notifications" component={notifications} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
