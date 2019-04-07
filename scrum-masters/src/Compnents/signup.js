import React, { Component } from 'react';

import {
    Nav,
    Navbar,
    NavDropdown,
    Popover,
    Badge,
    Spinner,
    Tabs,
    ButtonToolbar,
    Button,
    ListGroup,
    Table,
    ButtonGroup,
    Row,
    Col,
    Grid,
    Panel,
    FormGroup,
    FormControl
  } from "react-bootstrap";
  const axios = require("axios");
  axios.defaults.adapter = require("axios/lib/adapters/http");
  class signup extends Component {
     constructor(props){
        super(props);
      
      this.state = {
      count: 0,
      User: [],
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      gender: "",
      "type": "investor",
      msg: ""
    }
}

    sign=()=>{
      console.log(this.state)
        var payload={   
            "firstName": this.state.first_name,
            "lastName":this.state.last_name,
            "email":this.state.email,
            "password":this.state.password,
            "gender":this.state.gender,
            "type":"investor"
            }
        axios.post('http://localhost:3001/api/user',payload)
        .then(users=>{
            this.setState({users:users.data, msg:"Success"})
          }).catch(err=>{
            this.setState({msg:err.response.data})
          })
             
        .catch(err => {
            console.log(err);
          });
        
    }

    render   ()  {
        return (
            <div>
                <span
                  style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
                  className="badge"
                >
                  Signup
                </span>
                <div>
                 Enter your First Name: <input type="text"
                   floatingLabelText="First Name"
                   onChange = {(e) => this.setState({first_name:e.target.value})}
             />
             Enter your Last Name: <input type="text"
             floatingLabelText="Last Name"
             onChange = {(e) => this.setState({last_name:e.target.value})}
             />
              <br/>
           Enter your Email: <input type="text"
             type="email"
             floatingLabelText="Email"
             onChange = {(e) => this.setState({email:e.target.value})}
             />
             <br/>
           Enter your Password: <input type="text"
             type = "password"
             floatingLabelText="Password"
             onChange = {(e) => this.setState({password:e.target.value})}
             />
           <br/>
           please specify your gender: <select type="text"
             type = "gender"
             floatingLabelText="Gender"
             onChange = {(e) => this.setState({gender:e.target.value})}>
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
             </select>
           <br/>
           <button primary={true} style={style} onClick={(event) => this.sign()}>Signup</button>
           <br/>
           {this.state.msg}
          </div>
         
      </div>
    );
 }
};
const style = {
  margin: 30,
};
export default signup;