import React, { Component } from "react";
import { Badge, Button, Form, Col } from "react-bootstrap";
import BoardMembersEditor from "./BoardMembersEditor.js";

import App from "../App";

class CompanyForm extends Component {
  boardMembersEditor = React.createRef();
  
  state = {
    company: [],
    error: "",
    owner: localStorage.getItem("userId"),
    arabicname: "",
    englishname: "",
    orgrule: "",
    legalform: "",
    hqgov: "",
    hqcity: "",
    hqadd: "",
    hqtele: "",
    hqfax: "",
    currency: "",
    companycapital: 0,
    fullname: "",
    type: "",
    investortype: "",
    gender: "",
    nationality: "",
    idtype: "",
    bd: "",
    invaddress: "",
    natid: "",
    invtele: "",
    invfax: "",
    email: "",
    board_members: []
  };
  arabicnamechange = e => {
    this.setState({ arabicname: e.target.value });
  };
  englishnamechange = e => {
    this.setState({ englishname: e.target.value });
  };
  orgrulechange = e => {
    this.setState({ orgrule: e.target.value });
  };
  legalformchange = e => {
    this.setState({ legalform: e.target.value });
  };
  hqgovchange = e => {
    this.setState({ hqgov: e.target.value });
  };
  hqcitychange = e => {
    this.setState({ hqcity: e.target.value });
  };
  hqaddchange = e => {
    this.setState({ hqadd: e.target.value });
  };
  hqctelechange = e => {
    this.setState({ hqtele: e.target.value });
  };
  hqfaxchange = e => {
    this.setState({ hqfax: e.target.value });
  };
  currencychange = e => {
    this.setState({ currency: e.target.value });
  };
  companycapitalchange = e => {
    this.setState({ companycapital: e.target.value });
  };
  fullnamechange = e => {
    this.setState({ fullname: e.target.value });
  };
  companytypechange = e => {
    this.setState({ type: e.target.value });
  };
  invtypechange = e => {
    this.setState({ investortype: e.target.value });
  };
  genderchange = e => {
    this.setState({ gender: e.target.value });
  };
  nationalitychange = e => {
    this.setState({ nationality: e.target.value });
  };
  idtypechange = e => {
    this.setState({ idtype: e.target.value });
  };
  bdchange = e => {
    this.setState({ bd: e.target.value });
  };
  invaddresschange = e => {
    this.setState({ invaddress: e.target.value });
  };
  Idchange = e => {
    this.setState({ natid: e.target.value });
  };
  invtelechange = e => {
    this.setState({ invtele: e.target.value });
  };
  invfaxchange = e => {
    this.setState({ invfax: e.target.value });
  };
  invemailchange = e => {
    this.setState({ email: e.target.value });
  };
  createCompany = () => {
    const company = {
      owner: this.state.owner,
      company_type: this.state.type,
      organizational_rule: this.state.orgrule,
      legal_form: this.state.legalform,
      company_name_arabic: this.state.arabicname,
      company_name_english: this.state.englishname,
      hq_governorate: this.state.hqgov,
      hq_city: this.state.hqcity,
      hq_address: this.state.hqadd,
      capital_currency: this.state.currency,
      capital: this.state.companycapital,
      investor_name: this.state.fullname,
      nationality: this.state.nationality,
      investor_id_type: this.state.idtype,
      investor_id_number: this.state.natid,
      investor_birth_date: this.state.bd,
      investor_address: this.state.invaddress,
      hq_fax: this.state.hqfax,
      hq_telephone: this.state.hqtele,
      investor_type: this.state.investortype,
      investor_email: this.state.email,
      investor_telephone: this.state.invtele,
      investor_fax: this.state.invfax,
      investor_gender: this.state.gender
    };
    if (this.state.type === "ssc") {
      Object.assign(company, {
        investor_type: this.state.investortype,
        board_members: this.state.board_members
      });
    }

    App.api("post", "/company", company)
      .then(company => {
        this.setState({ company: [company] });
        this.props.history.push("/company/" + company.data._id);
      })
      .catch(err => {
        this.setState({ error: err.response.data });
      });
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
  render() {
    return (
      <div>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Company Form
        </span>
        <Form className=" m-4">
          <Form.Row>
            <Form.Group as={Col} controlId="arabicname">
              <Form.Label>Company name in Arabic</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter Company name in arabic"
                onChange={this.arabicnamechange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Company name in English</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter Company name in arabic"
                onChange={this.englishnamechange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="rule">
            <Form.Label>Select The Organizational Rule </Form.Label>
            <Form.Control as="select" onChange={this.orgrulechange}>
              <option />
              <option>organizational_rule1</option>
              <option>organizational_rule2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="legalform">
            <Form.Label>Select The Company Legal Form </Form.Label>
            <Form.Control as="select" onChange={this.legalformchange}>
              <option />
              <option>legal_form1</option>
              <option>legal_form2</option>
            </Form.Control>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="hqgov">
              <Form.Label>
                Select The Company HeadQuarters Governement{" "}
              </Form.Label>
              <Form.Control as="select" onChange={this.hqgovchange}>
                <option />
                <option>hq_governorate1</option>
                <option>hq_governorate2</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="hqcity">
              <Form.Label>Select The Company HeadQuarters city </Form.Label>
              <Form.Control as="select" onChange={this.hqcitychange}>
                <option />
                <option>hq_city1</option>
                <option>hq_city2</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="Head Quarters address">
            <Form.Label>Head Quarters address</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter The Company Head Quarters adderess"
              onChange={this.hqaddchange}
            />
          </Form.Group>
          <Form.Group controlId="Head Quarters telephone">
            <Form.Label>Head Quarters Telephone</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter The Company Head Quarters Telephone"
              onChange={this.hqctelechange}
            />
          </Form.Group>

          <Form.Group controlId="Head Quarters fax">
            <Form.Label>Head Quarters Fax</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter The Company Head Quarters fax"
              onChange={this.hqfaxchange}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="Currency">
              <Form.Label>select The Company Currency</Form.Label>
              <Form.Control as="select" onChange={this.currencychange}>
                <option />
                <option>EGP</option>
                <option>Euro</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="capital">
              <Form.Label>Company Capital</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter The Company Capital"
                onChange={this.companycapitalchange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="Investor">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter Your Full Name"
              onChange={this.fullnamechange}
            />
          </Form.Group>

          <Form.Group controlId="Type">
            <Form.Label>The Company Type</Form.Label>
            <Form.Control as="select" onChange={this.companytypechange}>
              <option />
              <option>ssc</option>
              <option>spc</option>
            </Form.Control>
          </Form.Group>
          {/* ----------------------------------- */}
          <Form.Group controlId="invType">
            <Form.Label>The Investor Type</Form.Label>
            <Form.Control as="select" onChange={this.invtypechange}>
              <option />
              <option>type1</option>
              <option>type2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>gender</Form.Label>
            <Form.Control as="select" onChange={this.genderchange}>
              <option />
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="nationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control as="select" onChange={this.nationalitychange}>
              <option />
              <option>Egyptian</option>
              <option>German</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="idtype">
            <Form.Label>ID Type</Form.Label>
            <Form.Control as="select" onChange={this.idtypechange}>
              <option />
              <option>id_type1</option>
              <option>id_type2</option>
            </Form.Control>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="Investorbd">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="Date"
                placeholder="dd/mm/yyyy"
                onChange={this.bdchange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="Investoradd">
              <Form.Label> Your Address</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter Your Address"
                onChange={this.invaddresschange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="InvestorId">
            <Form.Label> Your Social ID Number</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter Your Social ID Number "
              onChange={this.Idchange}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="Investortele">
              <Form.Label> Your Telephone Number</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter Your Telephone Number "
                onChange={this.invtelechange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="Investorfax">
              <Form.Label> Your Fax</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter Your Fax "
                onChange={this.invfaxchange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="Investoremail">
            <Form.Label> Your email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your email "
              onChange={this.invemailchange}
            />
          </Form.Group>
          <BoardMembersEditor ref={this.boardMembersEditor} onChange={board_members => this.setState({ board_members: board_members })} />
          <Button onClick={this.createCompany} variant="primary">
            Submit
          </Button>
          <br />
          {this.check()}
        </Form>
      </div>
    );
  }
}

export default CompanyForm;
