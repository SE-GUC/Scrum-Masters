import React, { Component } from "react";
import { Form, Col, Row, Button, Card, Alert } from "react-bootstrap";
import StripeCheckout from 'react-stripe-checkout';

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
    owner: "",
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
    fees: 0,
    board_members: [],
    error: null,
    receipt_url: null
  };

  getCompany() {
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
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  componentDidMount() {
    this.getCompany();
  }
  
  pay(token) {
    axios.post("http://localhost:3001/api/payment/charge/" + this.props.match.params.company_id, { token: token.id })
    .then(payment => {
      this.setState({ receipt_url: payment.data.charge.receipt_url })
      this.setState(payment.data.company)
    })
    .catch(err => {
      if (err.response.data.error) {
        this.setState({ error: err.response.data.error })
      } else {
        this.setState({ error: "Failed to process payment" })
      }
    })
  }
  
  render() {
    if (!this.state.fetched) {
      return (
        <div />
      );
    }
    
    return (
      <div className="company-view">
        <StripeCheckout
          stripeKey="pk_test_fMRKRMIpnVRxz8FNmJBBMG3p00CEMX1VKZ"
          image="https://stripe.com/img/documentation/checkout/marketplace.png"
          locale="auto"
          style={{ display: "none" }}
          ref="checkoutBtn"
          currency="EGP"
          amount={ this.state.fees * 100 }
          token={ token => this.pay(token) }
        />
        
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          View company details 
          { (localStorage.getItem("userType") === "admin" || localStorage.getItem("userId") === this.state.owner) &&
            <Button style={{ margin: "10px" }} as="a" href={"/CompanyUpdate/"+this.props.match.params.company_id}>Edit application</Button> 
          }
          { this.state.fees > 0 && !this.state.ispaid &&
            <Button style={{ margin: "10px" }} onClick={() => this.refs.checkoutBtn.onClick()}>Pay fees ({ this.state.fees } EGP)</Button>
          }
          { (localStorage.getItem("userType") === "laywer" || localStorage.getItem("userType") === "reviewer") && this.state.assigned_status === false &&
            <Button style={{ margin: "10px" }}>Assign to myself</Button>
          }
        </span>
        
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <Alert variant="danger" show={this.state.error}>
            {this.state.error}
          </Alert>
          <Alert variant="success" show={this.state.receipt_url}>
            Payment processed. <a href={this.state.receipt_url} target="_blank">View receipt</a>
          </Alert>
        </div>
        
        <Form className="m-4">
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Company status</Form.Label>
              <Form.Control plaintext readOnly value={(this.state.ispaid ? "Paid" : "Not paid") + ", " + (this.state.established ? "established" : "not established")} />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Assigned status</Form.Label>
              <Form.Control plaintext readOnly value={this.state.assigned_status ? "Assigned" : "Unassigned"} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Company name in arabic</Form.Label>
              <Form.Control plaintext readOnly value={this.state.company_name_arabic} />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Company name in english</Form.Label>
              <Form.Control plaintext readOnly value={this.state.company_name_english} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Legal form</Form.Label>
              <Form.Control plaintext readOnly value={this.state.legal_form} />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Organizational rule</Form.Label>
              <Form.Control plaintext readOnly value={this.state.organizational_rule} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Headquarters details</Form.Label>
              <Form.Control plaintext readOnly
                value={"Address: " + this.state.hq_address + ", " + this.state.hq_city + ", " + this.state.hq_governorate + ", telehpone: " + this.state.hq_telephone + ", fax: " + this.state.hq_fax}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Capital</Form.Label>
              <Form.Control plaintext readOnly
                value={this.state.capital + " " + this.state.capital_currency}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Company type</Form.Label>
              <Form.Control plaintext readOnly
                value={this.state.company_type}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor name</Form.Label>
              <Form.Control plaintext readOnly
                value={this.state.investor_name}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Investor gender</Form.Label>
              <Form.Control plaintext readOnly
                value={this.state.investor_gender}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor nationality</Form.Label>
              <Form.Control plaintext readOnly
                value={this.state.nationality}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Investor birth date</Form.Label>
              <Form.Control plaintext readOnly
                value={this.state.investor_birth_date}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor contact info</Form.Label>
              <Form.Control plaintext readOnly
                value={this.state.investor_address + ", telephone: " + this.state.investor_telephone + ", fax: " + this.state.investor_fax + ", email: " + this.state.investor_email}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor ID number</Form.Label>
              <Form.Control plaintext readOnly
                value={this.state.investor_id_number}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Investor ID number</Form.Label>
              <Form.Control plaintext readOnly
                value={this.state.investor_id_type}
              />
            </Form.Group>
          </Form.Row>
          { this.state.company_type === "ssc" &&
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Investor type</Form.Label>
                <Form.Control plaintext readOnly
                  value={this.state.investor_type}
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