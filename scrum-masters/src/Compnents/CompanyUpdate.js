import React, { Component } from "react";
import CreateCompany from 'api/company'
//import logo from './logo.svg';
import Navigationbar from "./navigationbar";
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

class Company extends Component{
    
    state = {
        company : []
    };
    getCompany = () => {
    axios.get("http://localhost:3001/api/company/:id")
    .then(companyy => {
        this.setState({ company:companyy});
    })
    .catch(err => {
        console.log(err)
    })
    }


    render(){
        return(
            <div>
              {this.getCompany()}
              <input name = 'Company Name English' value={this.state.company.company_name_english} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <input name = 'Company Name Arabic' value={this.state.company.company_name_arabic} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <select name = 'Headquarters governorate' value = {this.state.hq_governorate}>
                  <option value = 'hq_governorate1'>hq_governorate1</option>
                  <option value = 'hq_governorate2'>hq_governorate2</option>
              </select>  
              <select name = 'Organizational rule' value = {this.state.organizational_rule}>
                  <option value = 'hq_governorate1'>organizational_rule1</option>
                  <option value = 'hq_governorate2'>organizational_rule2</option>
              </select>
              <select name = 'Headquarters city' value = {this.state.hq_city}>
                  <option value = 'hq_governorate1'>hq_city1</option>
                  <option value = 'hq_governorate2'>hq_city2</option>
              </select>  
              <input name = 'Headquarters address' value={this.state.company.hq_address} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <input name = 'Headquarters telephone' value={this.state.company.hq_telephone} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <input name = 'Headquarters fax' value={this.state.company.hq_fax} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <select name = 'Capital currency' value = {this.state.capital_currency}>
                  <option value = 'EGP'>EGP</option>
                  <option value = 'Euro'>Euro</option>
              </select>  
              <input name = 'capital' value={this.state.company.capital} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <input name = 'Investor Name' value={this.state.company.investor_name} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <select name = 'Investor type' value = {this.state.investor_type}>
                  <option value = 'type1'>type1</option>
                  <option value = 'type2'>type2</option>
              </select>  
              <select name = 'Investor gender' value = {this.state.investor_gender}>
                  <option value = 'Male'>Male</option>
                  <option value = 'Female'>Female</option>
              </select> 
              <select name = 'Nationality' value = {this.state.nationality}>
                  <option value = 'Egyptian'>Egyptian</option>
                  <option value = 'German'>German</option>
              </select>  
              <select name = 'Investor ID type' value = {this.state.investor_id_type}>
                  <option value = 'id_type1'>id_type1</option>
                  <option value = 'id_type2'>id_type2</option>
              </select>   
              <input name = 'Investor ID number' value={this.state.company.investor_id_number} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <input name = 'Investor Birthdate' value={this.state.company.investor_birth_date} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <input name = 'Investor Address' value={this.state.company.investor_address} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <input name = 'Investor telephone' value={this.state.company.investor_telephone} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <input name = 'Investor fax' value={this.state.company.investor_fax} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              <input name = 'Investor Email' value={this.state.company.investor_email} onChange={(e) => {this.setState({inputVal: e.target.value})}} />
              


              
            </div>
        )
    }
    
}

export default Company