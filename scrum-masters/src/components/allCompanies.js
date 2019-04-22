import React, { Component } from "react";
import {
  Spinner,
  ListGroup,
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";

import App from "../App";

class AllCompanies extends Component {
  state = {
    company: [],
    loading: true,
    showUnreviewed: false,
    showUnAssigned: false
  };

  componentDidMount = () => {
    App.api("get", "/company")
      .then(companies => {
        this.setState({ company: companies.data });
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  getFilteredCompanies() {
    if (!this.state.showUnreviewed && !this.state.showUnAssigned) {
      return this.state.company;
    } else if (this.state.showUnreviewed) {
      return this.state.company.filter(company => {
        return company.reviewed_statuslawyer && !company.reviewed_statusreviewer && !company.review_reviewer;
      });
    } else {
      return this.state.company.filter(company => {
        return !company.reviewed_statuslawyer && !company.review_lawyer;
      });
    }
  }
  
  render() {
    if (this.state.loading)
      return (
        <div>
          <span
            style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
            className="badge"
          >
            Companies
          </span>
          <Spinner animation="border" />
        </div>
      );
    return (
      <div>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Companies
        </span>
        <br />
        <br />
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton
              value={1}
              onClick={() =>
                this.setState({ showUnAssigned: false, showUnreviewed: false })
              }
            >
              All Companies
            </ToggleButton>
            <ToggleButton
              value={2}
              onClick={() =>
                this.setState({ showUnAssigned: true, showUnreviewed: false })
              }
            >
              UnAssigned Companies
            </ToggleButton>
            <ToggleButton
              value={3}
              onClick={() =>
                this.setState({ showUnAssigned: false, showUnreviewed: true })
              }
            >
              UnReviewed companies
            </ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        <br />
        <ul>
          {this.getFilteredCompanies().map(companies => (
            <>
              <li key={companies._id}>
                <ListGroup.Item
                  action
                  href={`/company/${companies._id}`}
                  variant="light"
                >
                  {""}
                  <strong style={{ color: "steelblue" }}>
                    Company Name:
                  </strong>{" "}
                  {companies.company_name_english}
                </ListGroup.Item>{" "}
              </li>
            </>
          ))}
        </ul>
      </div>
    );
  }
}

export default AllCompanies;
