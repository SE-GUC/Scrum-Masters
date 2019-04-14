import React, { Component } from "react";
import {
  Spinner,
  ListGroup,
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class AllCompanies extends Component {
  state = {
    company: [],
    loading: true,
    showUnreviewed: false,
    showUnAssigned: false
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:3001/api/company")
      .then(companies => {
        this.setState({ company: companies.data });
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
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
          {this.state.company.map(companies => (
            <>
              {console.log(companies)}
              {(!this.state.showUnAssigned || !companies.review_lawyer) &&
                (!this.state.showUnreviewed ||
                  (!companies.review_reviewer &&
                    companies.reviewed_statuslawyer)) && (
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
                )}
            </>
          ))}
        </ul>
      </div>
    );
  }
}

export default AllCompanies;
