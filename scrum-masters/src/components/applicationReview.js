import React, { Component } from "react";
import { Alert, Button, Form, Col } from "react-bootstrap";

import App from "../App";


class applicationReview extends Component{

  state = {
    review_status: false,
    comment_text: "",
    application_id: this.props.match.params.company_id,
    user_id: localStorage.getItem("userId"),
    error: ""
  };

  reviewApplication = () => {
    this.setState({ error: "" })

    const review = {
      comment_text: this.state.comment_text,
      application_id: this.state.application_id,
      user_id: this.state.user_id
    };

    App.api("post", "/comment", review)
      .then(comment => {
        const api = localStorage.getItem("userType") === "lawyer" ? "lawyerReviewCompany" : "reviewerReviewCompany";
        
        App.api("put", "/user/" + api + "/" + this.state.application_id + "/" + localStorage.getItem("userId"), { review_status: this.state.review_status })
          .then(company => {
            this.props.history.push("/company/"+this.state.application_id);
          })
          .catch(err => {
            console.log(err.response.data);
            this.setState({ error: err.response.data });
          });
      })
      .catch(err => {
        this.setState({ error: err.response.data })
      });
  };

  render() {
    return (
      <div>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Review application
        </span>
        <br />
        <Alert style={{ margin: "10px" }} variant="danger" show={this.state.error}>
          {this.state.error}
        </Alert>
        <Form className=" m-4">
          <Form.Row>
            <Form.Group as={Col} controlId="status">
              <Form.Label>Review status</Form.Label>
              <Form.Control
                as="select"
                onChange={e => this.setState({ review_status: e.target.value })}
              >
                <option value={false}>Rejected</option>
                <option value={true}>Approved</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter a comment"
                onChange={e => this.setState({ comment_text: e.target.value })}
              />
            </Form.Group>
          </Form.Row>
          <Button
            onClick={this.reviewApplication}
            className=" m-2"
            variant="outline-secondary"
          >
            Submit review
          </Button>
        </Form>
          
      </div>
    )
  }
}

export default applicationReview;