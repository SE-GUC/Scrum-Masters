import React, { Component } from "react";
import { Form, Col, Row, Button, Card } from "react-bootstrap";

const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class CompanyView extends Component {
  state = {
    fetched: false,
    assigned_status: false,
    reviewed_statuslawyer: "",
    reviewed_statusreviewer: "",
    comments: [],
    loadedComments: [],
    ispaid: false,
    established: false,
    _id: "",
    organizational_rule: "Not specified",
    legal_form: "Not specified",
    company_name_arabic: "Not specified",
    company_name_english: "Not specified",
    hq_governorate: "Not specified",
    hq_city: "Not specified",
    hq_address: "Not specified",
    hq_telephone: "Not specified",
    hq_fax: "Not specified",
    capital_currency: "Not specified",
    capital: "Not specified",
    investor_name: "Not specified",
    investor_gender: "Not specified",
    nationality: "Not specified",
    investor_id_type: "Not specified",
    investor_id_number: "Not specified",
    investor_birth_date: "Not specified",
    investor_address: "Not specified",
    investor_telephone: "Not specified",
    investor_fax: "Not specified",
    investor_email: "Not specified",
    company_type: "Not specified",
    investor_type: "Not specified",
    board_members: []
  };

  getCompany = () => {
    axios
      .get("http://localhost:3001/api/company/" + this.props.match.params.company_id)
      .then(company => {
        this.setState(company.data);
        axios.get("http://localhost:3001/api/comment/" + this.props.match.params.company_id)
        .then(comments => {
          this.setState({ loadedComments: comments.data })
          this.state.loadedComments.map(comment => {
            axios.get("http://localhost:3001/api/user/" + comment.user_id)
            .then(user => {
              comment.user = user.data.firstName + " " + user.data.lastName
              this.forceUpdate()
            })
          })
          this.setState({ fetched: true });
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  componentDidMount() {
    this.getCompany();
  }
  
  render() {
    if (!this.state.fetched) {
      return (
        <div />
      );
    }
    
    return (
      <div className="company-view">
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          View company details 
          <Button style={{ margin: "10px" }} as="a" href={"/CompanyUpdate/"+this.props.match.params.company_id}>Edit application</Button> 
          <Button style={{ margin: "10px" }}>Assign to myself</Button>
        </span>
        <Form className="m-4">
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Established status</Form.Label>
              <Form.Control plaintext readOnly defaultValue={this.state.established ? "Established" : "Not established"} />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Assigned status</Form.Label>
              <Form.Control plaintext readOnly defaultValue={this.state.assigned_status ? "Assigned" : "Unassigned"} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Company name in arabic</Form.Label>
              <Form.Control plaintext readOnly defaultValue={this.state.company_name_arabic} />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Company name in english</Form.Label>
              <Form.Control plaintext readOnly defaultValue={this.state.company_name_english} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Legal form</Form.Label>
              <Form.Control plaintext readOnly defaultValue={this.state.legal_form} />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Organizational rule</Form.Label>
              <Form.Control plaintext readOnly defaultValue={this.state.organizational_rule} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Headquarters details</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={"Address: " + this.state.hq_address + ", " + this.state.hq_city + ", " + this.state.hq_governorate + ", telehpone: " + this.state.hq_telephone + ", fax: " + this.state.hq_fax}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Capital</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={this.state.capital + " " + this.state.capital_currency}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Company type</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={this.state.company_type}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor name</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={this.state.investor_name}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Investor gender</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={this.state.investor_gender}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor nationality</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={this.state.nationality}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Investor birth date</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={this.state.investor_birth_date}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor contact info</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={this.state.investor_address + ", telephone: " + this.state.investor_telephone + ", fax: " + this.state.investor_fax + ", email: " + this.state.investor_email}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor ID number</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={this.state.investor_id_number}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Investor ID number</Form.Label>
              <Form.Control plaintext readOnly
                defaultValue={this.state.investor_id_type}
              />
            </Form.Group>
          </Form.Row>
          { this.state.company_type === "ssc" &&
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Investor type</Form.Label>
                <Form.Control plaintext readOnly
                  defaultValue={this.state.investor_type}
                />
              </Form.Group>
            </Form.Row>
          }
        </Form>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Comments
        </span>
        {this.state.comments.length === 0 && 
          <Card className="mx-auto">
            <Card.Body><Card.Text>No comments</Card.Text></Card.Body>
          </Card>
        }
        {this.state.loadedComments.map(comment => (
          <Card className="mx-auto">
            <Card.Body>
              <Card.Title>
                By {comment.user} at {comment.comment_date}
              </Card.Title>
              <Card.Text>{comment.comment_text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default CompanyView;