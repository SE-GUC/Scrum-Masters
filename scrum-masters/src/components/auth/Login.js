import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {}
  
  static logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userType");
  }

  login = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.setState({ errors: {} });
    axios
      .post("/api/user/login", userData)
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
        this.setState({ errors: err.response.data });
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Card style={{ width: "28rem", marginTop: "5rem" }} className="mx-auto">
        <Card.Body>
          <Card.Title>Login to your account</Card.Title>
          <Card.Text>
            <Form onSubmit={this.login}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="textarea"
                  placeholder="Enter your email"
                  value={this.state.username}
                  onChange={this.onChange}
                  isInvalid={this.state.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  Incorrect email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={this.state.pasword}
                  onChange={this.onChange}
                  isInvalid={this.state.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  Incorrect password
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary default" type="submit">
                Login
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Login;
