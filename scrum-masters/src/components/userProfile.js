import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class userProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    type: "",
    companies: [],
    notifications: [],

    userID: this.props.match.params.inv_id
  };

  getProfileDetails = () => {
    axios
      .get("http://localhost:3001/api/user/" + this.state.userID)
      .then(userDetails => {
        this.setState({ firstName: userDetails.data.firstName });
        this.setState({ lastName: userDetails.data.lastName });
        this.setState({ email: userDetails.data.email });
        this.setState({ gender: userDetails.data.gender });
        this.setState({ type: userDetails.data.type });
        this.setState({ companies: userDetails.data.companies });
        this.setState({ notifications: userDetails.data.notifications });
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
          User Profile
        </span>
        <li> First name: {this.state.firstName}</li>
        <li> Last name: {this.state.lastName}</li>
        <li> email: {this.state.email}</li>
        <li> gender: {this.state.gender}</li>
        <li>account type: {this.state.type}</li>
        <li>companies: {this.state.companies}</li>
        <li>notificaitons : {this.state.notifications}</li>
      </div>
    );
  }

  UNSAFE_componentWillMount() {
    this.getProfileDetails();
  }
}

export default userProfile;
