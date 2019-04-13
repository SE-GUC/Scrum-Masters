import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class userProfile extends Component {
    state = {
        firstName:"",
        lastName:"",
        email:"",
        gender:"",
        type:"",
        companies:[],
        notifications:[],
        
        userID:"5ca0cfc493ce191cd4a5f8de"
    };

    getProfileDetails = () => {
        axios
            .get("http://localhost:3001/api/user/"+this.state.userID)
            .then(userDetails => {
                this.setState({firstName: userDetails.data.firstName});
                this.setState({lastName: userDetails.data.lastName});
                this.setState({email: userDetails.data.email});
                this.setState({gender: userDetails.data.gender});
                this.setState({type: userDetails.data.type});
                this.setState({companies: userDetails.data.companies});
                this.setState({notifications: userDetails.data.notifications});
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
    
            <span
              style={{ fontSize: 20, fontWeight: "italic", color: "steelgray " }}
              className="Profile Details"
            >
              <ListGroup variant="flush">
                <ListGroup.Item><b>First Name</b>   {this.state.firstName}</ListGroup.Item>
                <ListGroup.Item><b>Last Name</b>   {this.state.lastName}</ListGroup.Item>               
                <ListGroup.Item><b>Email</b>   {this.state.email}</ListGroup.Item>
                <ListGroup.Item><b>Gender</b>   {this.state.gender}</ListGroup.Item>
                <ListGroup.Item><b>Account Type</b>   {this.state.type}</ListGroup.Item>
                <ListGroup.Item><b>Companies</b>   {this.state.companies}</ListGroup.Item>
                <ListGroup.Item><b>Notificaitons</b>   {this.state.notifications}</ListGroup.Item>
              </ListGroup>
             </span>
          </div>
        );
      }

      UNSAFE_componentWillMount() {
        this.getProfileDetails();
      }
}

export default userProfile