import React, { Component } from "react";
//import logo from './logo.svg';

import image from "../1.jpg";
import invimage from "../investor.jpg";
import form from "../form.jpg";
import "../App.css";
import "bootstrap";

import {
  Badge,
  Button,
  ListGroup,
  Jumbotron,
  ButtonGroup,
  Card,
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
        <div>
          <h1 class="text-center">{this.state.name}</h1>
          <Button class=" btn pull-right" variant="primary">
            My Profile
          </Button>
          <img src={invimage} className="img2" />
        </div>
        <Button onClick={this.showCompnies} block>
          My Companies
        </Button>
        {this.rendercompanies()}
        <br />
        <br />
        <Jumbotron className="m-4 " style={{ width: "60rem" }}>
          <div class="row mx-md-n5">
            <Card
              style={{ width: "25rem" }}
              class="col px-md-5"
              className="m-5"
            >
              <Card.Img variant="top" src={form} />
              <Card.Body>
                <Card.Title>Company Application </Card.Title>
                <Card.Text>
                  Fill The Company Form And start the process Of Publishing Your
                  New Company
                </Card.Text>
                <a href="/companyform">
                  <Button type="button" class="btn btn-info">
                    Application Form
                  </Button>
                </a>
              </Card.Body>
            </Card>
            <Card
              style={{ width: "25rem" }}
              class="col px-ms-5"
              className="m-4"
            >
              <Card.Img variant="top" src={form} />
              <Card.Body>
                <Card.Title>Company Application </Card.Title>
                <Card.Text>
                  Fill The Company Form And start the process Of Publishing Your
                  New Company
                </Card.Text>
                <Button>Button2</Button>
              </Card.Body>
            </Card>
          </div>
        </Jumbotron>
        <br />
        <img src={image} className="img" />
      </div>
    );
  }
}
export default Investor;
