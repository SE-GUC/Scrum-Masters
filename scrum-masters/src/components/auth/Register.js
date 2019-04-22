import React, { Component } from "react";
import { Jumbotron, Form, Col, Row, Button, Alert } from "react-bootstrap";

import App from "../../App";

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
    this.setState({msg:""})
    var payload = {
      firstName: this.state.first_name,
      lastName: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      type: this.state.type
    };
    App.api("post", "/user/register", payload)
      .then(users => {
        //Login with new account
        App.api("post", "/user/login", { email: this.state.email, password: this.state.password })
          .then(login => {
            localStorage.setItem("userId", login.data.user.id);
            localStorage.setItem("userEmail", login.data.user.email);
            localStorage.setItem("userType", login.data.user.type);
            if (this.props.onLogin) {
              this.props.onLogin();
            }
            this.props.history.push("/");
          })
          .catch(err => {
            this.props.history.push("/login");
          });
      })
      .catch(err => {
        console.log(err.response.data)
        if (err.response.data.email) this.setState({ msg: err.response.data.email });
        else if (err.response.data.error) this.setState({ msg: err.response.data.error });
        else this.setState({ msg: err.response.data });
      })

      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div style={{ paddingLeft: "250px", paddingRight: "250px", paddingTop: "50px" }}>
        <Jumbotron>
          <div
            style={{
              fontSize: 30,
              fontWeight: "italic",
              color: "black",
              textAlign: "center"
            }}
          >
            Sign Up
          </div>
          
          <Alert variant="danger" show={this.state.msg} style={{ marginTop: "10px" }}>
            {this.state.msg}
          </Alert>

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
