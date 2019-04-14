import React, { Component } from 'react';
import { Card, Button, Form,Nav } from "react-bootstrap";

const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http")

  class Register extends Component {
     constructor(props){
        super(props);
      
        this.state = {
           
           
           first_name: "",
           last_name: "",
           email: "",
           password: "",
           gender: "",
           type: "investor",
           msg: "",
           errors:{},
           isRegistered: false,
        }
}
componentDidMount() {

}
register = (e) => {
  e.preventDefault()
  const inv={   
    "firstName": this.state.first_name,
    "lastName":this.state.last_name,
    "email":this.state.email,
    "password":this.state.password,
    "gender":this.state.gender,
    "type":"investor",
    
    };
    //this.setState({ errors: {} });
    axios
      .post("http://localhost:3001/api/user/register", inv)
      .then(users => {
        this.props.history.push("/");
        this.setState({msg:users.data.msg});
        
        this.setState({ isRegistered: true });
        
      })
     
      .catch(err => {
        this.setState({ msg: err.response.data });
      });
  };
  first_nameChange = e => {
    this.setState({ first_name: e.target.value });
  };
  last_nameChange = e => {
    this.setState({ last_name: e.target.value });
  };
  emailChange = e => {
    this.setState({ email: e.target.value });
  };
  passwordChange = e => {
    this.setState({ password: e.target.value });
  };
  genderChange = e => {
    this.setState({ gender: e.target.value });
  };

    

    render   ()  {
      return (
        
                        
              <Card style={{  width: "28rem", marginTop: "5rem" ,color: "steelblue " }}
              className="mx-auto"
                >
        
                
                <Card.Body>
          <Card.Title>Register</Card.Title>
          <Card.Text>
          <Form >
          <Form.Group controlId="first name">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            name="firstname"
            type="textarea"
            placeholder="Enter your First Name"
            value={this.state.first_name}
            onChange={this.first_nameChange}
             />
          </Form.Group>
          <Form.Group controlId="last name">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            name="lastname"
            type="textarea"
            placeholder="Enter your Last Name"
            value={this.state.last_name}
            onChange={this.last_nameChange}
             />
          </Form.Group>
          <Form.Group  controlId="gender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control 
              name="gender"
              as="select" 
              placeholder="Specify your gender"
              value={this.state.gender}
              onChange={this.genderChange}>
                <option/>
                <option>male</option>
                <option>female</option>
                <option>Others</option>
              </Form.Control>
            </Form.Group>
          
          <Form.Group 
          controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="textarea"
            placeholder="Enter your email"
            value={this.state.email}
            onChange={this.emailChange}
            isInvalid={this.state.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            Incorrect email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group 
        controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={this.state.pasword}
                  onChange={this.passwordChange}
                  isInvalid={this.state.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  Incorrect password
                </Form.Control.Feedback>

              </Form.Group>
              <Button onClick={this.register.bind(this)} variant="primary default" type="submit" >
                Register
                
              </Button>
             
              
              {this.state.msg}
              
        </Form>
          </Card.Text>
        </Card.Body>
      </Card>
                  
                  
                  );
                }
              }
export default Register;