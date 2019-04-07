import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
     constructor(probs){
        super(props);
      
      this.state = {
      count: 0,
      User: [],
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      "type": "investor"
    }
}

    sign=()=>{
        var payload={
            "first_name": this.state.first_name,
            "last_name":this.state.last_name,
            "email":this.state.email,
            "password":this.state.password,
            "gender":this.state.gender
            }
        axios.post('http://localhost:3000/api/user',payload)
        .then(users=>{
            // users.data ===payload m3rfsh eza ynf3 a3mlha keda wala la2 l moustafa
            this.setState({users:users.data})
            
          })
            // if(users.data.code == 200){
            // console.log("registration successfull");
            // var loginscreen=[];
            // loginscreen.push(<Login parentContext={this}/>);
            // var loginmessage = "Not Registered yet.Go to registration";
            // this.props.setState({loginscreen:loginscreen,
            // loginmessage:loginmessage,
            // buttonLabel:"Register",
            // isLogin:true
             
        .catch(err => {
            console.log(err);
          });
        
    }

    render   ()  {
        return (
            <div>
              
                <div>
                <AppBar
                   title="SignUp"
                 />
                 <TextField
                   hintText="Enter your First Name"
                   floatingLabelText="First Name"
                   onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
             <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
              <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
             <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <TextField
             type = "gender"
             hintText="please specify your gender"
             floatingLabelText="Gender"
             onChange = {(event,newValue) => this.setState({gender:newValue})}
             />
           <br/>
           <RaisedButton label="Sign" primary={true} style={style} onClick={(event) => this.handleClick(this.sign())}/>
          </div>
         
      </div>
    );
 }
};
const style = {
  margin: 30,
};
export default signup;