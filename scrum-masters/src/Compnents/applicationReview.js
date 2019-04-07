import React, { Component } from "react";
//import logo from './logo.svg';
import Navigationbar from "./navigationbar";
import {
  Nav,
  Navbar,
  NavDropdown,
  Popover,
  Badge,
  Spinner,
  Tabs,
  ButtonToolbar,
  Button,
  ListGroup,
  Table,
  ButtonGroup,
  Row,
  Col,
  Grid,
  Panel,
  FormGroup,
  FormControl
} from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class applicationReview extends Component{
  state = {
    count:0,
  };

  reviewApplication = () => {
    axios
      .put("http://localhost:3001/api/company") //TO ALTER REVIEWED/UNVREVIEWED STATUS
      .then()
      .catch(err => {
        console.log(err);
      })
  }

  renderApplication = () => {
    if(this.state.count === 0 ) return null;
    else {
      return (
        <ul>
          {this.state.company.map(application => (
            <li key={application._id}>
              <ListGroup.Item action href="#link1" action variant="secondary">
                {" "}
                <strong style={{ color: "steelblue" }}>
                  Application and review :
                </strong>{" "}
                {application.x}
              </ListGroup.Item>{" "}
            </li>
          ))}
        </ul>
      )
    }
  }

  //Supposed to have list of application to choose from
  render() {
    return (
      <div>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Applications
        </span>
        <br />
        <Button
          onClick={this.reviewApplication}
          className=" m-2"
          variant="outline-secondary"
        >
          Review application
        </Button>
        {this.renderApplication()}
        <input
          type="text"
          value={this.state.value}
          //onChange={this.reviewApplication}
          />
      </div>
    )
  }
}

export default applicationReview;