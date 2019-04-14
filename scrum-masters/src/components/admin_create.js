import React, { Component } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import {Col } from 'react-bootstrap';


const axios = require("axios");


class admin_create extends Component {

  constructor(porps)
  {
    super(porps);
    this.state={
      errors:{},
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      gender:"",
      type:"",
      msg:"",
      error:""

    }
   
  }

  createaccount=(e)=>
  {
    e.preventDefault()
    this.setState({msg:"",error:""})
    const data={
      "firstName":this.state.firstName,
      "lastName":this.state.lastName,
      "password":this.state.password,
      "email":this.state.email,
      "type":this.state.type,
      "gender":this.state.gender

    }
    axios
      .post("/api/user/register",data)
      .then(res=>{
        this.setState({msg:"User created successfully",error:""})

      })
      .catch(err => {
        if (err.response.data.email) this.setState({ error: err.response.data.email });
        else if (err.response.data.error) this.setState({ error: err.response.data.error });
        else this.setState({ error: err.response.data });
      })

  }



render() {
  return (
    <Card style={{ width: '45rem', marginTop: '5rem' }} className="mx-auto">
        <Card.Body>
          <Card.Title>Create account</Card.Title>
          
          <Alert variant="success" show={this.state.msg} style={{ marginTop: "10px" }}>
            {this.state.msg}
          </Alert>
          
          <Alert variant="danger" show={this.state.error} style={{ marginTop: "10px" }}>
            {this.state.error}
          </Alert>
          
          <Card.Text>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                   placeholder="First name"
                   value={this.state.firstName}
                   onChange={(e) => {this.setState({firstName: e.target.value})}}/>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    name="lastName"
                    placeholder="Last name" 
                    value={this.state.lastName} 
                    onChange={(e) => {this.setState({lastName: e.target.value})}}/>
                    </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                 type="email"
                 name="email"
                 placeholder="Email"
                 value={this.state.email} 
                 onChange={(e) => {this.setState({email: e.target.value})}}
                 isInvalid={this.state.errors.email}/>
                <Form.Control.Feedback type="invalid">
                  Incorrect email
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                 type="password"
                 name="password"
                 placeholder="Choose strong password"
                 value={this.state.password} 
                 onChange={(e) => {this.setState({password: e.target.value})}}
                 isInvalid={this.state.errors.password}/>
                <Form.Control.Feedback type="invalid">
                  weak password
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Row>
                
              <Form.Group as={Col}>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                   as="select"
                   vlaue={this.state.gender}
                   onChange={(e) => {this.setState({gender: e.target.value})}}>
                    <option>..</option>
                    <option>male</option>
                    <option>female</option>
                  </Form.Control>
                </Form.Group>

                

                <Form.Group as={Col}>
                  <Form.Label>User type</Form.Label>
                  <Form.Control 
                   as="select"
                   value={this.state.usertype}
                   onChange={(e) => {this.setState({type: e.target.value})}}>
                    <option>..</option>
                    <option>lawyer</option>
                    <option>reviewer</option>
                  </Form.Control>
                </Form.Group>

                
              </Form.Row>

              <Button variant="primary" type="create" onClick={this.createaccount.bind(this)}>
                Create
              </Button>
             </Form>

          </Card.Text>
        </Card.Body>
      </Card>
     
    );
  }
}

export default admin_create;
