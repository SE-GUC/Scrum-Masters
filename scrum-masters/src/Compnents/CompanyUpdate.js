import React, { Component } from "react";
//import CreateCompany from 'api/company'
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
    id = '5ca8e9465c3ff610702e3068'
    state = {
        company_type: '',
        organizational_rule: '',
        legal_form: '',
        company_name_arabic: '',
        company_name_english: '',
        hq_governorate: '',
        hq_city: '',
        hq_address: '',
        hq_fax : '',
        hq_telephone : '',
        capital_currency: '',
        capital: '',
        investor_name: '',
        nationality: '',
        investor_id_type: '',
        investor_id_number: '',
        investor_birth_date: '',
        investor_address: '',
        investor_type : '',
        investor_email : '',
        investor_telephone : '',
        investor_fax : ''
    };
    getCompany = (id) => {
    axios.get("http://localhost:3001/api/company/:"+id)
    .then(companyy => {
        this.setState({ 
            company_type: companyy.company_type,
            organizational_rule: companyy.organizational_rule,
            legal_form: companyy.legal_form,
            company_name_arabic: companyy.company_name_arabic,
            company_name_english: companyy.company_name_english,
            hq_governorate: companyy.hq_governorate,
            hq_city: companyy.hq_city,
            hq_address: companyy.hq_address,
            hq_fax : companyy.hq_fax,
            hq_telephone : companyy.hq_telephone,
            capital_currency: companyy.capital_currency,
            capital: companyy.capital,
            investor_name: companyy.investor_name,
            nationality: companyy.nationality,
            investor_id_type: companyy.investor_id_type,
            investor_id_number: companyy.investor_id_number,
            investor_birth_date: companyy.investor_birth_date,
            investor_address: companyy.investor_address,
            investor_type : companyy.investor_type,
            investor_email : companyy.investor_email,
            investor_telephone : companyy.investor_telephone,
            investor_fax : companyy.investor_fax
        });
    })
    .catch(err => {
        console.log(err)
    })
    }
    handleSubmit = (e , id) => {
        axios.put("http://localhost:3001/api/company/:"+id ,{
            company_type: this.state.company_type,
            organizational_rule: this.state.organizational_rule,
            legal_form: this.state.legal_form,
            company_name_arabic: this.state.company_name_arabic,
            company_name_english: this.state.company_name_english,
            hq_governorate: this.state.hq_governorate,
            hq_city: this.state.hq_city,
            hq_address: this.state.hq_address,
            hq_fax : this.state.hq_fax,
            hq_telephone : this.state.hq_telephone,
            capital_currency: this.state.capital_currency,
            capital: this.state.capital,
            investor_name: this.state.investor_name,
            nationality: this.state.nationality,
            investor_id_type: this.state.investor_id_type,
            investor_id_number: this.state.investor_id_number,
            investor_birth_date: this.state.investor_birth_date,
            investor_address: this.state.investor_address,
            investor_type : this.state.investor_type,
            investor_email : this.state.investor_email,
            investor_telephone : this.state.investor_telephone,
            investor_fax : this.state.investor_fax

          } );
    }

    render(){
        const id = '5ca8e9465c3ff610702e3068'
        return(
            <div>
              {this.getCompany(id)}
              <form onSubmit = {this.handleSubmit(id)}>
              <input name = 'Company Name English' value={this.state.company_name_english} onChange={(e) => {this.setState({company_name_english: e.target.value})}} />
              <input name = 'Company Name Arabic' value={this.state.company_name_arabic} onChange={(e) => {this.setState({company_name_arabic: e.target.value})}} />
              <br></br>
              <select name = 'Headquarters governorate' value = {this.state.hq_governorate} onChange={(e) => {this.setState({hq_governorate: e.target.value})}}>
                  <option value = 'hq_governorate1'>hq_governorate1</option>
                  <option value = 'hq_governorate2'>hq_governorate2</option>
              </select>
              <br></br>  
              <select name = 'Organizational rule' value = {this.state.organizational_rule} onChange={(e) => {this.setState({organizational_rule: e.target.value})}}>
                  <option value = 'hq_governorate1'>organizational_rule1</option>
                  <option value = 'hq_governorate2'>organizational_rule2</option>
              </select>
              <br></br>
              <select name = 'Headquarters city' value = {this.state.hq_city} onChange={(e) => {this.setState({hq_city: e.target.value})}}>
                  <option value = 'hq_governorate1'>hq_city1</option>
                  <option value = 'hq_governorate2'>hq_city2</option>
              </select>  
              <br></br>
              <input name = 'Headquarters address' value={this.state.hq_address} onChange={(e) => {this.setState({hq_address: e.target.value})}} />
              <br></br>
              <input name = 'Headquarters telephone' value={this.state.hq_telephone} onChange={(e) => {this.setState({hq_telephone: e.target.value})}} />
              <br></br>
              <input name = 'Headquarters fax' value={this.state.hq_fax} onChange={(e) => {this.setState({hq_fax: e.target.value})}} />
              <br></br>
              <select name = 'Capital currency' value = {this.state.capital_currency} onChange={(e) => {this.setState({capital_currency: e.target.value})}}>
                  <option value = 'EGP'>EGP</option>
                  <option value = 'Euro'>Euro</option>
              </select>  
              <br></br>
              <input name = 'capital' value={this.state.capital} onChange={(e) => {this.setState({capital: e.target.value})}} />
              <br></br>
              <input name = 'Investor Name' value={this.state.investor_name} onChange={(e) => {this.setState({investor_name: e.target.value})}} />
              <br></br>
              <select name = 'Investor type' value = {this.state.investor_type} onChange={(e) => {this.setState({investor_type: e.target.value})}}>
                  <option value = 'type1'>type1</option>
                  <option value = 'type2'>type2</option>
              </select>  
              <br></br>
              <select name = 'Investor gender' value = {this.state.investor_gender} onChange={(e) => {this.setState({investor_gender: e.target.value})}}>
                  <option value = 'Male'>Male</option>
                  <option value = 'Female'>Female</option>
              </select> 
              <br></br>
              <select name = 'Nationality' value = {this.state.nationality} onChange={(e) => {this.setState({nationality: e.target.value})}}>
                  <option value = 'Egyptian'>Egyptian</option>
                  <option value = 'German'>German</option>
              </select>  
              <br></br>
              <select name = 'Investor ID type' value = {this.state.investor_id_type} onChange={(e) => {this.setState({investor_id_type: e.target.value})}}>
                  <option value = 'id_type1'>id_type1</option>
                  <option value = 'id_type2'>id_type2</option>
              </select>   
              <br></br>
              <input name = 'Investor ID number' value={this.state.investor_id_number} onChange={(e) => {this.setState({investor_id_number: e.target.value})}} />
              <br></br>
              <input name = 'Investor Birthdate' value={this.state.investor_birth_date} onChange={(e) => {this.setState({investor_birth_date: e.target.value})}} />
              <br></br>
              <input name = 'Investor Address' value={this.state.investor_address} onChange={(e) => {this.setState({investor_address: e.target.value})}} />
              <br></br>
              <input name = 'Investor telephone' value={this.state.investor_telephone} onChange={(e) => {this.setState({investor_telephone: e.target.value})}} />
              <br></br>
              <input name = 'Investor fax' value={this.state.investor_fax} onChange={(e) => {this.setState({investor_fax: e.target.value})}} />
              <br></br>
              <input name = 'Investor Email' value={this.state.investor_email} onChange={(e) => {this.setState({investor_email: e.target.value})}} />
              </form>


              
            </div>
        )
    }
    
}

export default Company