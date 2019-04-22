import React, { Component } from "react";
import { Form, Col, Row, Button, Card, Alert, Badge } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import BoardMembersEditor from "./BoardMembersEditor.js";

import App from "../App";

class CompanyView extends Component {
  state = {
    fetched: false,
    thiscomment: "",
    assigned_status: false,
    updatedcomment: "",
    message: "",
    remove: false,
    flag: false,
    reviewed_statuslawyer: false,
    reviewed_statusreviewer: false,
    nowuser: localStorage.getItem("userId"),
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
    receipt_url: null,
    success_msg: null
  };

  getCompany() {
    App.api("get", "/company/" + this.props.match.params.company_id)
      .then(company => {
        this.setState(company.data);
        App.api("get", "/comment/" + this.props.match.params.company_id)
          .then(comments => {
            this.setState({ loadedComments: comments.data });
            this.state.loadedComments.map(comment => {
              App.api("get", "/user/" + comment.user_id).then(user => {
                comment.user = user.data.firstName + " " + user.data.lastName;
                this.forceUpdate();
              });
              return comment;
            });
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
    App.api("post", "/payment/charge/" + this.props.match.params.company_id, {
      token: token.id
    })
      .then(payment => {
        this.setState({ receipt_url: payment.data.charge.eceipt_url });
        this.setState(payment.data.company);
      })
      .catch(err => {
        if (err.response.data.error) {
          this.setState({ error: err.response.data.error });
        } else {
          this.setState({ error: "Failed to process payment" });
        }
      });
  }

  assignedStatus() {
    if (this.state.review_lawyer) {
      return "Assigned to lawyer";
    } else if (this.state.review_reviewer) {
      return "Assigned to reviewer";
    } else if (
      this.state.reviewed_statuslawyer &&
      !this.state.reviewed_statusreviewer
    ) {
      return "Unassigned, waiting to be assigned to reviewer";
    } else if (
      !this.state.reviewed_statuslawyer &&
      !this.state.reviewed_statuslawyer
    ) {
      return "Unassigned, waiting to be assigned to lawyer";
    } else {
      return "Finished reviewal process";
    }
  }

  needsLawyer() {
    return !this.state.reviewed_statuslawyer && !this.state.review_lawyer;
  }

  needsReviewer() {
    return (
      this.state.reviewed_statuslawyer &&
      !this.state.reviewed_statusreviewer &&
      !this.state.review_reviewer
    );
  }

  needsPayment() {
    return (
      this.state.owner == localStorage.getItem("userId") &&
      this.state.fees > 0 &&
      !this.state.ispaid &&
      this.state.reviewed_statusreviewer
    );
  }

  assignToMyself() {
    const api =
      localStorage.getItem("userType") === "lawyer"
        ? "assignLawyer"
        : "assignreviewer";

    App.api(
      "post",
      "/user/" +
        api +
        "/" +
        this.state._id +
        "/" +
        localStorage.getItem("userId")
    )
      .then(company => {
        this.setState({
          success_msg: "You have assigned this case to yourself."
        });
        this.setState(company.data);
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
      });
  }

  unassign() {
    const api =
      localStorage.getItem("userType") === "lawyer"
        ? "unassignLawyer"
        : "unassignReviewer";

    App.api("put", "/user/" + api + "/" + this.state._id)
      .then(company => {
        this.setState({
          success_msg: "You have been unassigned from this case."
        });
        this.setState(company.data);
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
      });
  }
  deletecomment = id => {
    App.api("delete", "/comment/" + id)
      .then(comment => {
        this.setState({ message: " commnet is deleted" });
        window.location.reload();
      })
      .catch(err => {
        this.setState({ message: err.response.data.error });
      });
  };
  deleteapplication = () => {
    App.api("delete", "/company/" + this.props.match.params.company_id).then(
      com => {
        this.props.history.push("/");
      }
    );
  };
  changecomment = comment_id => {
    App.api("post", "/comment/" + comment_id, {
      comment_text: this.state.updatedcomment
    })
      .then(comm => {
        this.setState({ remove: true });
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if (!this.state.fetched) {
      return <div />;
    }

    return (
      <div className="company-view">
        {this.needsPayment() && (
          <StripeCheckout
            stripeKey="pk_test_fMRKRMIpnVRxz8FNmJBBMG3p00CEMX1VKZ"
            image="https://stripe.com/img/documentation/checkout/marketplace.png"
            locale="auto"
            style={{ display: "none" }}
            ref="checkoutBtn"
            currency="EGP"
            amount={this.state.fees * 100}
            token={token => this.pay(token)}
          />
        )}

        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue" }}
          className="badge"
        >
          View company details
          {(localStorage.getItem("userType") === "admin" ||
            localStorage.getItem("userId") === this.state.owner ||
            (localStorage.getItem("userType") === "lawyer" &&
              this.state.reviewed_statuslawyer)) &&
            !this.state.ispaid && (
              <Button
                style={{ margin: "10px" }}
                as="a"
                href={"/CompanyUpdate/" + this.props.match.params.company_id}
              >
                Edit application
              </Button>
            )}
          {this.needsPayment() && (
            <Button
              style={{ margin: "10px" }}
              onClick={() => this.refs.checkoutBtn.onClick()}
            >
              Pay fees ({this.state.fees} EGP)
            </Button>
          )}
          {this.needsPayment() && (
            <Button
              style={{ margin: "10px" }}
              onClick={() => this.refs.checkoutBtn.onClick()}
            >
              Pay fees ({this.state.fees} EGP)
            </Button>
          )}
          {((localStorage.getItem("userType") === "lawyer" &&
            this.needsLawyer()) ||
            (localStorage.getItem("userType") === "reviewer" &&
              this.needsReviewer())) && (
            <Button
              style={{ margin: "10px" }}
              onClick={() => this.assignToMyself()}
            >
              Assign to myself
            </Button>
          )}
          {(this.state.review_lawyer === localStorage.getItem("userId") ||
            this.state.review_reviewer === localStorage.getItem("userId")) && (
            <>
              <Button
                style={{ margin: "10px" }}
                onClick={() => this.unassign()}
              >
                Unassign
              </Button>
              <Button
                style={{ margin: "10px" }}
                as="a"
                href={"/applicationReview/" + this.state._id}
              >
                Review application
              </Button>
            </>
          )}
          {!this.state.established && this.state.nowuser === this.state.owner && (
            <Button variant="danger" onClick={this.deleteapplication}>
              Delete
            </Button>
          )}
        </span>

        <div style={{ paddingLeft: "20px", paddingRight: "20px", margin: "0" }}>
          <Alert variant="danger" show={this.state.error}>
            {this.state.error}
          </Alert>
          <Alert variant="success" show={this.state.receipt_url}>
            Payment processed.{" "}
            <a href={this.state.receipt_url} target="_blank">
              View receipt
            </a>
          </Alert>
          <Alert variant="success" show={this.state.success_msg}>
            {this.state.success_msg}
          </Alert>
        </div>

        <Form className="m-4">
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Company status</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  (this.state.ispaid ? "Paid" : "Not paid") +
                  ", " +
                  (this.state.established ? "established" : "not established")
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Assigned status</Form.Label>
              <Form.Control plaintext readOnly value={this.assignedStatus()} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Company name in arabic</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.company_name_arabic}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Company name in english</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.company_name_english}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Legal form</Form.Label>
              <Form.Control plaintext readOnly value={this.state.legal_form} />
            </Form.Group>
            <Form.Group as={Col} controlId="englishname">
              <Form.Label>Organizational rule</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.organizational_rule}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Headquarters details</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  "Address: " +
                  this.state.hq_address +
                  ", " +
                  this.state.hq_city +
                  ", " +
                  this.state.hq_governorate +
                  ", telephone: " +
                  this.state.hq_telephone +
                  ", fax: " +
                  this.state.hq_fax
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Capital</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.capital + " " + this.state.capital_currency}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Company type</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.company_type}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor name</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.investor_name}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Investor gender</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.investor_gender}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor nationality</Form.Label>
              <Form.Control plaintext readOnly value={this.state.nationality} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Investor birth date</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.investor_birth_date}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor contact info</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  this.state.investor_address +
                  ", telephone: " +
                  this.state.investor_telephone +
                  ", fax: " +
                  this.state.investor_fax +
                  ", email: " +
                  this.state.investor_email
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Investor ID number</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.investor_id_number}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Investor ID number</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={this.state.investor_id_type}
              />
            </Form.Group>
          </Form.Row>
          {this.state.company_type === "ssc" && (
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Investor type</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  value={this.state.investor_type}
                />
              </Form.Group>
            </Form.Row>
          )}
          <BoardMembersEditor
            boardMembers={this.state.board_members}
            readOnly
          />
        </Form>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Comments
        </span>
        {this.state.comments.length === 0 && (
          <Card className="mx-auto">
            <Card.Body>
              <Card.Text>No comments</Card.Text>
            </Card.Body>
          </Card>
        )}
        {this.state.loadedComments.map(comment => (
          <Card className="mx-auto">
            <Card.Body>
              <Card.Title>
                By {comment.user} at {comment.comment_date}
              </Card.Title>
              <Card.Text>
                {comment.comment_text}
                <br />
                {this.state.nowuser === comment.user_id && (
                  <div>
                    {" "}
                    <Button
                      variant="danger"
                      onClick={() => this.deletecomment(comment._id)}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      onClick={() =>
                        this.setState({ flag: true, thiscomment: comment._id })
                      }
                    >
                      Update
                    </Button>
                    {this.state.flag && this.state.thiscomment === comment._id && (
                      <Form className="m-4">
                        <Form.Group as={Col}>
                          <Form.Label>New comment</Form.Label>
                          <Form.Control
                            type="textarea"
                            placeholder="Enter the new comment "
                            defaultValue={comment.comment_text}
                            onChange={e =>
                              this.setState({
                                updatedcomment: e.target.value
                              })
                            }
                          />
                        </Form.Group>
                        <Button onClick={() => this.changecomment(comment._id)}>
                          done
                        </Button>
                      </Form>
                    )}
                  </div>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}

        <Badge variant="danger">{this.state.message}</Badge>
      </div>
    );
  }
}

export default CompanyView;
