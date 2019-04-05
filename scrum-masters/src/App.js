import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap';
import {Nav, Navbar, NavDropdown,NavItem ,Badge,Spinner,Tabs, ButtonToolbar, Button,ListGroup,Table, ButtonGroup, Row, Col, Grid, Panel, FormGroup, FormControl} from 'react-bootstrap'
const axios = require('axios')
axios.defaults.adapter = require('axios/lib/adapters/http')


class App extends Component {
  state ={
    count :0 ,
    company:[]
  }
  
 
  showCompnies=()=> {
    
    axios.get('http://localhost:3001/api/company')
   .then(companies=>{
     this.setState({company:companies.data})
     this.setState({count:this.state.count+1})
   })
   .catch(err=>{
     console.log(err)
     
   })
  

  }
  
  rendercompanies=()=>{
    if(this.state.count===0) return null 
    else if(this.state.company.length ===0) return <Badge style ={{fontSize:15}}variant="primary">No Companies</Badge>
    else{
     return <ul>{this.state.company.map(companies=><li key={companies._id}> <ListGroup.Item action href="#link1" action variant="light">{companies.company_name_english}</ListGroup.Item></li>)}</ul>
    }
  }
  
  render () {
    return (
     <div>
       <Navbar  bg="light" color ="skyblue" expand="lg">
  <Navbar.Brand href="#home">Sumerge</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Notifications</Nav.Link>
      <Nav.Link href="#link">Assigned Companies</Nav.Link>

      <NavDropdown title="" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Sign out</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Contact us</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
       <span style = {{fontSize:30,fontWeight:"italic",color:"skyblue"}} className ="badge">Companies</span> 
       <br></br>
       <Button onClick = {this.showCompnies} className=" m-2" variant="outline-secondary">Show Companies</Button>
       {this.rendercompanies()}
       
       
     
       </div>
       
       )
       
    
  }
  
//  getTheCompanies(){
 // <ul>{this.state.company.map(companies=><li key={companies._id}>{companies.company_name_english}</li>)}</ul>
//    axios.get('http://localhost:3001/api/company')
//    .then(companies=>{
//      console.log(companies.data)
//      return <ul>{companies.data.map(company=><li key={company._id}>{company.company_name_english}</li>)}</ul>
//    })
//    .catch(err=>{
//      console.log(err)
     
//    })
//  } 
// company(){
//   try{
//   return async companies=>{
//     companies = await axios.get('http://localhost:3001/api/company')
//     const res = companies.data
//     companies(res)
//   }
// }catch(e){
//   console.log(e)
// }
// }

 
}

export default App;
