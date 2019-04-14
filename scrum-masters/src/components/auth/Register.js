import React, { Component } from "react";
import { Jumbotron, Form, Col, Row, Button } from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      User: [],
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      gender: "",
      type: "investor",
      msg: ""
    };
  }

  sign = () => {
    console.log(this.state);
    var payload = {
      firstName: this.state.first_name,
      lastName: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      type: this.state.type
    };
    axios
      .post("http://localhost:3001/api/user/register", payload)
      .then(users => {
        console.log(users.data);
        this.setState({ users: users.data, msg: "Success" });
      })
      .catch(err => {
        this.setState({ msg: err.response.data });
      })

      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div style={{ padding: "250px" }}>
        <Jumbotron>
          <span
            style={{
              fontSize: 30,
              fontWeight: "italic",
              color: "black",
              paddingLeft: "400px"
            }}
          >
            Sign Up
          </span>
          <br />

          <div>
            <Form className=" m-4">
              <Form.Row>
                <Form.Group as={Col} controlId="arabicname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="First Name"
                    onChange={e =>
                      this.setState({ first_name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="englishname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="Last Name"
                    onChange={e => this.setState({ last_name: e.target.value })}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="gender">
                  <Form.Label>gender </Form.Label>
                  <Form.Control
                    as="select"
                    onChange={e => this.setState({ gender: e.target.value })}
                  >
                    <option />
                    <option>male</option>
                    <option>female</option>
                    <option>others</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
            <Button onClick={event => this.sign()} variant="primary">
              Sign Up
            </Button>
            <br />
            {this.state.msg}
          </div>
        </Jumbotron>
      </div>
    );
  }
}
const style = {
  margin: 30
};
export default Register;
