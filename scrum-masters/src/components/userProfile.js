import React, { Component } from "react";
import { ListGroup, Col, Row, Form } from "react-bootstrap";

import App from "../App";

class userProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    type: "",
    flag: false,
    companies: [],
    companiesname: [],
    notifications: [],

    userID: this.props.match.params.user_id
  };

  getProfileDetails = () => {
    console.log(this.state);
    App.api("get", "/user/" + this.state.userID)
      .then(userDetails => {
        this.setState({ firstName: userDetails.data.firstName });
        this.setState({ lastName: userDetails.data.lastName });
        this.setState({ email: userDetails.data.email });
        this.setState({ gender: userDetails.data.gender });
        this.setState({ type: userDetails.data.type });
        this.setState({ companies: userDetails.data.companies });
        this.setState({ notifications: userDetails.data.notifications });
        this.setState({ flag: true });
        this.getCompaniesname();
      })
      .catch(err => {
        console.log(err);
      });
  };
  getCompaniesname = () => {
    for (var i = 0; i < this.state.companies.length; i++) {
      App.api("get", "/company/" + this.state.companies[i])
        .then(companies => {
          this.setState({
            companiesname: this.state.companiesname.concat(
              companies.data.company_name_english
            )
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div className="company-view">
        <span
          style={{
            fontSize: 30,
            fontWeight: "italic",
            color: "steelblue ",
            paddingTop: "10px"
          }}
          className="badge"
        >
          {this.state.firstName + " " + this.state.lastName}
        </span>

        <Form className="m-4">
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control plaintext readOnly value={this.state.email} />
          </Form.Group>
          <Form.Group controlId="englishname">
            <Form.Label>gender:</Form.Label>
            <Form.Control plaintext readOnly value={this.state.gender} />
          </Form.Group>
          <Form.Group controlId="englishname">
            <Form.Label>Type:</Form.Label>
            <Form.Control plaintext readOnly value={this.state.type} />
          </Form.Group>
          <Form.Group controlId="englishname">
            <Form.Label>Companies Name:</Form.Label>
            <Form.Control
              plaintext
              readOnly
              value={this.state.companiesname.join("   -   ")}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
  componentDidMount = () => {
    this.getProfileDetails();
  };
}

export default userProfile;
