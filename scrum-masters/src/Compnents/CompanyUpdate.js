import React, { Component } from "react";
import { Badge, Button, Form, Col } from "react-bootstrap";

const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class CompanyUpdate extends Component{
    id = '5ca8e9465c3ff610702e3068'
    state = {
        company : [],
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
    };
    check = () => {
        if (this.state.company.length === 0)
          return (
            <Badge style={{ fontSize: 15 }} variant="Danger">
              {this.state.error}
            </Badge>
          );
        else
          return (
            <Badge style={{ fontSize: 15 }} variant="primary">
              YOUR FORM IS SUBMITED
            </Badge>
          );
      };

    render(){
        const id = '5ca8e9465c3ff610702e3068'
        return(
        <div>
        
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
        Company Update
        </span>
        <Form className=" m-4">
            <Form.Row>
            <Form.Group as={Col} controlId="arabicname">
              <Form.Label>Company name in Arabic</Form.Label>
              <Form.Control
                type="textarea"
                defaultValue = {this.state.company_name_arabic}
                onChange={(e) => {this.setState({company_name_arabic: e.target.value})}}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Company name in English</Form.Label>
              <Form.Control
                type="textarea"
                defaultValue = {this.state.company_name_english}
                onChange={(e) => {this.setState({company_name_english: e.target.value})}}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="rule">
            <Form.Label>Select The Organizational Rule </Form.Label>
            <Form.Control as="select"  defaultValue = {this.state.organizational_rule} onChange={(e) =>{this.setState({organizational_rule: e.target.value})}}>
              <option />
              <option>organizational_rule1</option>
              <option>organizational_rule2</option>
            </Form.Control>
            </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="hqgov">
              <Form.Label>
                Select The Company HeadQuarters Governement{" "}
              </Form.Label>
              <Form.Control as="select" defaultValue = {this.state.hq_governorate} onChange={(e) => {this.setState({hq_governorate: e.target.value})}}>
                <option />
                <option>hq_governorate1</option>
                <option>hq_governorate2</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="hqcity">
              <Form.Label>Select The Company HeadQuarters city </Form.Label>
              <Form.Control as="select" defaultValue = {this.state.hq_city} onChange={(e) => {this.setState({hq_city : e.target.value})}}>
                <option />
                <option>hq_city1</option>
                <option>hq_city2</option>
              </Form.Control>
            </Form.Group>
          
        </Form.Row>
        <Form.Group as = {Col} controlId = "hqaddress">
            <Form.Label>Update the HQ address</Form.Label>
            <Form.Control 
            type = "textarea"
            defaultValue = {this.state.hq_address}
            onChange = {(e)=> {this.setState({hq_address :e.target.value})}}
            />
        </Form.Group>
        <Form.Group as ={Col} controlId = "hqtelephone">
            <Form.Label>Update the HQ telephone</Form.Label>

            <Form.control

            type = "textarea"
            defaultValue = {this.state.hq_telephone}
            onChange = {(e) => {this.setState({hq_telephone :e.target.value})}}
            />
        </Form.Group>
        <Form.Group as = {Col} ControlId = "hqfax">
            <Form.Label>Update the HQ fax</Form.Label>
            <Form.Control
            type = "textarea"
            defaultValue = {this.state.hq_fax}
            onChange = {(e) => {this.setState({hq_fax : e.target.value})}}
            />
        </Form.Group>
        <Form.Group as = {Col} controlId = "cc">
            <Form.Label>Change the capital currency</Form.Label>
            <Form.Control as="select" defaultValue = {this.state.capital_currency} onChange = {(e) => {this.setState({capital_currency :e.target.value})}}>
            <option/>
            <option>hq_city1</option>
            <option>hq_city2</option>

            </Form.Control>
        </Form.Group>
        <Form.Group as = {Col} controlId = "capital">
            <Form.Label>Change the capital</Form.Label>
            <Form.Control
            type = "textarea"
            defaultValue = {this.state.capital}
            onChange = {(e) => {this.setState({capital : e.target.value})}}/>

        </Form.Group>
        <Form.Group as ={Col} controlId = "in">
            <Form.Label>Update the investor's Name</Form.Label>
            <Form.Control
            type = "textarea"
            defaultValue = {this.state.investor_name}
            onChange = {(e) => {this.setState({investor_name : e.target.value})}}/>

        </Form.Group>
        <Form.Group as = {Col} controlId = "cac">
            <Form.Label>Change the investor type</Form.Label>
            <Form.Control as="select" defaultValue = {this.state.investor_type} onChange = {(e) => {this.setState({investor_type :e.target.value})}}>
            <option/>
            <option>type1</option>
            <option>type2</option>

            </Form.Control>
        </Form.Group>
        <Form.Group as = {Col} controlId = "ig">
            <Form.Label>Change the investor gender</Form.Label>
            <Form.Control as="select" defaultValue = {this.state.investor_gender} onChange = {(e) => {this.setState({investor_gender :e.target.value})}}>
            <option/>
            <option>Male</option>
            <option>Female</option>

            </Form.Control>
        </Form.Group>
        <Form.Group as = {Col} controlId = "nat">
            <Form.Label>Change the nationality</Form.Label>
            <Form.Control as="select" defaultValue = {this.state.nationality} onChange = {(e) => {this.setState({nationality :e.target.value})}}>
            <option/>
            <option>Egyptian</option>
            <option>German</option>

            </Form.Control>
        </Form.Group>
        
        <Form.Group as = {Col} controlId = "iit">
            <Form.Label>Change the investor id type</Form.Label>
            <Form.Control as="select" defaultValue = {this.state.investor_id_type} onChange = {(e) => {this.setState({investor_id_type :e.target.value})}}>
            <option/>
            <option>id_type1</option>
            <option>id_type2</option>

            </Form.Control>
        </Form.Group>
        <Form.Group as ={Col} controlId = "iin">
            <Form.Label>Update the investor's ID number</Form.Label>
            <Form.Control
            type = "textarea"
            defaultValue = {this.state.investor_id_type}
            onChange = {(e) => {this.setState({investor_id_type : e.target.value})}}/>

        </Form.Group>
        <Form.Group as ={Col} controlId = "idd">
            <Form.Label>Update the investor's birthdate</Form.Label>
            <Form.Control
            type = "Date"
            defaultValue = {this.state.investor_birth_date}
            onChange = {(e) => {this.setState({investor_birth_date : e.target.value})}}/>

        </Form.Group>
        <Form.Group as ={Col} controlId = "ia">
            <Form.Label>Update the investor's address</Form.Label>
            <Form.Control
            type = "Date"
            defaultValue = {this.state.investor_address}
            onChange = {(e) => {this.setState({investor_address : e.target.value})}}/>

        </Form.Group><Form.Group as ={Col} controlId = "it">
            <Form.Label>Update the investor's telephone</Form.Label>
            <Form.Control
            type = "Date"
            defaultValue = {this.state.investor_telephone}
            onChange = {(e) => {this.setState({investor_telephone: e.target.value})}}/>

        </Form.Group><Form.Group as ={Col} controlId = "if">
            <Form.Label>Update the investor's fax</Form.Label>
            <Form.Control
            type = "Date"
            defaultValue = {this.state.investor_fax}
            onChange = {(e) => {this.setState({investor_fax : e.target.value})}}/>

        </Form.Group><Form.Group as ={Col} controlId = "ie">
            <Form.Label>Update the investor's email</Form.Label>
            <Form.Control
            type = "Date"
            defaultValue = {this.state.investor_email}
            onChange = {(e) => {this.setState({investor_email: e.target.value})}}/>

        </Form.Group>
        <Button onClick={this.handleSubmit(id)} variant="primary">
            Submit
          </Button>
          <br />
          {this.check()}
        </Form>
        
        </div>
        )
    }
    
}

export default CompanyUpdate;