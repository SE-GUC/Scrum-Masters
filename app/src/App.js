import React, { Component } from 'react';
import './App.css';
const axios = require("axios");


class App extends Component {

  constructor(porps)
  {
    super(porps);
    this.state={
      msg:"",
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      gender:"",
      type:""

    }
   
  }

  createaccount=()=>
  {
    axios
      .post("http://localhost:3001/api/user",{
        "firstName":this.state.firstname,
        "lastName":this.state.lastname,
        "password":this.state.password,
        "email":this.state.email,
        "type":this.state.type,
        "gender":this.state.gender

      }).then(res=>{
        //this.setState({msg:res.data.data.msg})
      })
      .catch(err => {
        console.log(err);
        //this.setState({msg:res.data.data.msg})
        
      })

  }

  render() {
    return (
       <div className="box">
       <dev className="box-header">
        Create account


        <div className="input-goroup">
          <label htmlFor="first name"> First name</label>
          <input type="text" name="firstname" placeholder="Enter your first name" value = {this.state.firstname} onChange={(e) => {this.setState({firstname: e.target.value})}}/>
        </div>


        <div className="input-goroup">
          <label htmlFor="last name"> Last name</label>
          <input type="text" name="lastname" placeholder="Enter your last name "value = {this.state.lastname} onChange={(e) => {this.setState({lastname: e.target.value})}}/>
        </div>

        <div className="input-goroup">
          <label htmlFor="email"> Email</label>
          <input type="text" name="email" placeholder="email"value = {this.state.email} onChange={(e) => {this.setState({email: e.target.value})}}/>
        </div>

        <div className="input-goroup">
          <label htmlFor="password"> Password</label>
          <input type="text" name="password" placeholder="password"value = {this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
        </div>

        
        <div className="input-goroup">
          <label htmlFor="type"> User type</label>
          <input type="text" name="usertype" placeholder="reviewer or lawyer"value = {this.state.usertype} onChange={(e) => {this.setState({usertype: e.target.value})}}/>
        </div>

        <div className="input-goroup">
          <label htmlFor="gender">Gender</label>
          <input type="text" name="gender" placeholder="male or female"value = {this.state.gender} onChange={(e) => {this.setState({gender: e.target.value})}}/>
        </div>
        
         
          <button type="button" className="create lawyer" onClick={this.createaccount.bind(this)}>Create</button>
        
        
        </dev>
        </div>       
      );
    }
}

export default App;
