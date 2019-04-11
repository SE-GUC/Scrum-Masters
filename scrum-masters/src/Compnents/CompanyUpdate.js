import React, { Component } from "react";
import { Badge, Button, Form, Col } from "react-bootstrap";

const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class CompanyUpdate extends Component {
  id = "5c94c25663abc339cc17b93b";
  state = {
    company: [],
    company_type: "",
    organizational_rule: "",
    legal_form: "",
    company_name_arabic: "",
    company_name_english: "",
    hq_governorate: "",
    hq_city: "",
    hq_address: "",
    hq_fax: "",
    hq_telephone: "",
    capital_currency: "",
    capital: "",
    investor_name: "",
    nationality: "",
    investor_id_type: "",
    investor_id_number: "",
    investor_birth_date: "",
    investor_address: "",
    investor_type: "",
    investor_email: "",
    investor_telephone: "",
    investor_fax: "",
    investor_gender: ""
  };

  getCompany = () => {
    axios
      .get("http://localhost:3001/api/company/5c94c25663abc339cc17b93b")
      .then(companyy => {
        this.setState({
          company_type: companyy.data.company_type,
          organizational_rule: companyy.dataorganizational_rule,
          legal_form: companyy.datalegal_form,
          company_name_arabic: companyy.datacompany_name_arabic,
          company_name_english: companyy.data.company_name_english,
          hq_governorate: companyy.datahq_governorate,
          hq_city: companyy.data.hq_city,
          hq_address: companyy.data.hq_address,
          hq_fax: companyy.data.hq_fax,
          hq_telephone: companyy.data.hq_telephone,
          capital_currency: companyy.data.capital_currency,
          capital: companyy.data.capital,
          investor_name: companyy.data.investor_name,
          nationality: companyy.data.nationality,
          investor_id_type: companyy.data.investor_id_type,
          investor_id_number: companyy.data.investor_id_number,
          investor_birth_date: companyy.data.investor_birth_date,
          investor_address: companyy.data.investor_address,
          investor_type: companyy.data.investor_type,
          investor_email: companyy.data.investor_email,
          investor_telephone: companyy.data.investor_telephone,
          investor_fax: companyy.data.investor_fax,
          investor_gender : companyy.data.investor_gender
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleSubmit = (e, id) => {
    console.log(this.state);
    axios
      .put("http://localhost:3001/api/company/5c94c25663abc339cc17b93b", {
        'company_type': this.state.company_type,
        'organizational_rule': this.state.organizational_rule,
        'legal_form': this.state.legal_form,
        'company_name_arabic': this.state.company_name_arabic,
        'company_name_english': this.state.company_name_english,
        'hq_governorate': this.state.hq_governorate,
        'hq_city': this.state.hq_city,
        'hq_address': this.state.hq_address,
        'hq_fax': this.state.hq_fax,
        'hq_telephone': this.state.hq_telephone,
        'capital_currency': this.state.capital_currency,
        'capital': this.state.capital,
        'investor_name': this.state.investor_name,
        'nationality': this.state.nationality,
        'investor_id_type': this.state.investor_id_type,
        'investor_id_number': this.state.investor_id_number,
        'investor_birth_date': this.state.investor_birth_date,
        'investor_address': this.state.investor_address,
        'investor_type': this.state.investor_type,
        'investor_email': this.state.investor_email,
        'investor_telephone': this.state.investor_telephone,
        'investor_fax': this.state.investor_fax,
        'investor_gender': this.state.investor_gender
      })
      .then(console.log("Succeed"))
      .catch(err => console.log(err));
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
  componentDidMount(){
    this.getCompany();
  }
  render() {
    return (
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
                defaultValue={this.state.company_name_arabic}
                onChange={e => {
                  this.setState({ company_name_arabic: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Company name in English</Form.Label>
              <Form.Control
                type="textarea"
                defaultValue={this.state.company_name_english}
                onChange={e => {
                  this.setState({ company_name_english: e.target.value });
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="rule">
            <Form.Label>Select The Organizational Rule </Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.organizational_rule}
              onChange={e => {
                this.setState({ organizational_rule: e.target.value });
              }}
            >
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
              <Form.Control
                as="select"
                defaultValue={this.state.hq_governorate}
                onChange={e => {
                  this.setState({ hq_governorate: e.target.value });
                }}
              >
                <option />
                <option>hq_governorate1</option>
                <option>hq_governorate2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="hqcity">
              <Form.Label>Select The Company HeadQuarters city </Form.Label>
              <Form.Control
                as="select"
                defaultValue={this.state.hq_city}
                onChange={e => {
                  this.setState({ hq_city: e.target.value });
                }}
              >
                <option />
                <option>hq_city1</option>
                <option>hq_city2</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="hqaddress">
            <Form.Label>Update the HQ address</Form.Label>
            <Form.Control
              type="textarea"
              defaultValue={this.state.hq_address}
              onChange={e => {
                this.setState({ hq_address: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="hqtelephone">
            <Form.Label>Update the HQ telephone</Form.Label>
            <Form.Control
              type="textarea"
              defaultValue={this.state.hq_telephone}
              onChange={e => {
                this.setState({ hq_telephone: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="hqfax">
            <Form.Label>Update the HQ fax</Form.Label>
            <Form.Control
              type = "textarea"
              defaultValue={this.state.hq_fax}
              onChange ={e => {
                this.setState({ hq_fax : e.target.value });
                console.log(this.state.hq_fax)
              }}
            />
          </Form.Group>
          <Form.Group controlId="cc">
            <Form.Label>Change the capital currency</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.capital_currency}
              onChange={e => {
                this.setState({ capital_currency: e.target.value });
              }}
            >
              <option />
              <option>hq_city1</option>
              <option>hq_city2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="capital">
            <Form.Label>Change the capital</Form.Label>
            <Form.Control
              type="textarea"
              defaultValue={this.state.capital}
              onChange={e => {
                this.setState({ capital: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="in">
            <Form.Label>Update the investor's Name</Form.Label>
            <Form.Control
              type="textarea"
              defaultValue={this.state.investor_name}
              onChange={e => {
                this.setState({ investor_name: e.target.value });
                console.log(e.target.value + " "+ this.state.investor_name);
              }}
            />
          </Form.Group>
          <Form.Group controlId="cac">
            <Form.Label>Change the investor type</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.investor_type}
              onChange={e => {
                this.setState({ investor_type: e.target.value });
              }}
            >
              <option />
              <option>type1</option>
              <option>type2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="ig">
            <Form.Label>Change the investor gender</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.investor_gender}
              onChange={e => {
                this.setState({ investor_gender: e.target.value });
              }}
            >
              <option />
              <option>Male</option>
              <option>Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="nat">
            <Form.Label>Change the nationality</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.nationality}
              onChange={e => {
                this.setState({ nationality: e.target.value });
              }}
            >
              <option />
              <option>Egyptian</option>
              <option>German</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="iit">
            <Form.Label>Change the investor id type</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.investor_id_type}
              onChange={e => {
                this.setState({ investor_id_type: e.target.value });
              }}
            >
              <option />
              <option>id_type1</option>
              <option>id_type2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="iin">
            <Form.Label>Update the investor's ID number</Form.Label>
            <Form.Control
              type="textarea"
              defaultValue={this.state.investor_id_type}
              onChange={e => {
                this.setState({ investor_id_type: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="idd">
            <Form.Label>Update the investor's birthdate</Form.Label>
            <Form.Control
              type="Date"
              defaultValue={this.state.investor_birth_date}
              onChange={e => {
                this.setState({ investor_birth_date: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="ia">
            <Form.Label>Update the investor's address</Form.Label>
            <Form.Control
              type="textarea"
              defaultValue={this.state.investor_address}
              onChange={e => {
                this.setState({ investor_address: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="it">
            <Form.Label>Update the investor's telephone</Form.Label>
            <Form.Control
              type="textarea"
              defaultValue={this.state.investor_telephone}
              onChange={e => {
                this.setState({ investor_telephone: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="if">
            <Form.Label>Update the investor's fax</Form.Label>
            <Form.Control
              type="textarea"
              defaultValue={this.state.investor_fax}
              onChange={e => {
                this.setState({ investor_fax: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="ie">
            <Form.Label>Update the investor's email</Form.Label>
            <Form.Control
              type="textarea"
              defaultValue={this.state.investor_email}
              onChange={e => {
                this.setState({ investor_email: e.target.value });
              }}
            />
          </Form.Group>
          <Button onClick={this.handleSubmit} variant="primary">
            Submit
          </Button>
          <br />
          {this.check()}
        </Form>
      </div>
    );
  }
}

export default CompanyUpdate;
