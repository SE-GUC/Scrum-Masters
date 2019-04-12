import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
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
      msg:""

    }
   
  }

  createaccount=(e)=>
  {
    e.preventDefault()
    const data={
      "firstName":this.state.firstName,
      "lastName":this.state.lastName,
      "password":this.state.password,
      "email":this.state.email,
      "type":this.state.type,
      "gender":this.state.gender

    }
    axios
      .post("http://localhost:3001/api/user/register",data)
      .then(res=>{
        this.setState({msg:res.data.msg})

      })
      .catch(err => {
        this.setState({msg:"Some error happend"})
      })

  }



render() {
  return (
    <Card style={{ width: '45rem',height:'30rem' ,marginTop: '5rem' }} className="mx-auto">
        <Card.Body>
          <Card.Title>Crete account</Card.Title>
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
                create
              </Button>
             </Form>
             <Form.Label>{this.state.msg}</Form.Label>

          </Card.Text>
        </Card.Body>
      </Card>
     
    );
  }
}

export default admin_create;
