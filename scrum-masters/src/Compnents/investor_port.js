import React, { Component } from "react";
//import logo from './logo.svg';

import image from "../1.jpg";
import "../App.css";
import "bootstrap";

import {
  Badge,
  Button,
  ListGroup,
  Jumbotron,
  ButtonGroup,
  Alert
} from "react-bootstrap";

const axios = require("axios");

axios.defaults.adapter = require("axios/lib/adapters/http");

class Investor extends Component {
  state = {
    count: 0,
    company: [],
    id: "5ca7904ae79c412a704bfd7d",
    name: ""
  };

  showCompnies = () => {
    console.log("mostafa");
    axios
      .get(
        "http://localhost:3001/api/company/userCreatedApplications/" +
          this.state.id
      )
      .then(companies => {
        this.setState({ company: companies.data });
        this.setState({ count: this.state.count + 1 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  rendercompanies = () => {
    if (this.state.count % 2 === 0) return null;
    else if (this.state.company.length === 0)
      return (
        <Badge style={{ fontSize: 15 }} variant="danger">
          No Companies
        </Badge>
      );
    else {
      return (
        <div>
          <Alert variant="primary">
            <Alert.Heading>All Companies</Alert.Heading>
          </Alert>
          <ul>
            {this.state.company.map(companies => (
              <li key={companies._id}>
                <ListGroup.Item action variant="light">
                  {" "}
                  <strong style={{ color: "steelblue" }}>
                    Company Name:
                  </strong>{" "}
                  {companies.company_name_english} <br />
                  <strong style={{ color: "steelblue" }}>Assigned:</strong>
                  {companies.assigned_status ? <p>YES ✔</p> : <p>Not Yet</p>}
                </ListGroup.Item>{" "}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  getinvstorname = () => {
    axios
      .get("http://localhost:3001/api/user/" + this.state.id)
      .then(inv => {
        this.setState({ name: inv.data.firstName + " " + inv.data.lastName });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    this.getinvstorname();
    return (
      <div>
        <Jumbotron className="uptext">
          <h1>{this.state.name}</h1>
          <p>
            <Button variant="primary">Show Profile</Button>
          </p>
        </Jumbotron>
        <ButtonGroup className="m-2">
          <Button onClick={this.showCompnies}>My Companies</Button>
          <a href="/companyform">
            <Button type="button" class="btn btn-info">
              Application Form
            </Button>
          </a>

          <Button>Button2</Button>
          <Button>Button3</Button>
        </ButtonGroup>
        <br />
        {this.rendercompanies()}
        <img src={image} className="img" />
      </div>
    );
  }
}
export default Investor;
