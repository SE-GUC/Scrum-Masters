import React, { Component } from "react";

import App from "../App";

class signup extends Component {
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
      type: "investor"
    };
    App.api("post", "/user", payload)
      .then(users => {
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
      <div>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Signup
        </span>
        <div>
          <Form className=" m-4">
            <Form.Row>
              <Form.Group as={Col} controlId="arabicname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="First Name"
                  onChange={e => this.setState({ first_name: e.target.value })}
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
          </Form>
          Enter your First Name:{" "}
          <input
            type="text"
            floatingLabelText="First Name"
            onChange={e => this.setState({ first_name: e.target.value })}
          />
          Enter your Last Name:{" "}
          <input
            type="text"
            floatingLabelText="Last Name"
            onChange={e => this.setState({ last_name: e.target.value })}
          />
          <br />
          Enter your Email:{" "}
          <input
            type="email"
            floatingLabelText="Email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <br />
          Enter your Password:{" "}
          <input
            type="password"
            floatingLabelText="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <br />
          please specify your gender:{" "}
          <select
            type="gender"
            floatingLabelText="Gender"
            onChange={e => this.setState({ gender: e.target.value })}
          >
            <option value="" />
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          <button primary={true} style={style} onClick={event => this.sign()}>
            Signup
          </button>
          <br />
          {this.state.msg}
        </div>
      </div>
    );
  }
}
const style = {
  margin: 30
};
export default signup;
