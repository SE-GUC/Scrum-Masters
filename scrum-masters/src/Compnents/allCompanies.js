import React, { Component } from "react";
//import logo from './logo.svg';
import { Badge, Button, ListGroup } from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class AllCompanies extends Component {
  state = {
    count: 0,
    company: []
  };

  showCompnies = () => {
    axios
      .get("http://localhost:3001/api/company")
      .then(companies => {
        this.setState({ company: companies.data });
        this.setState({ count: this.state.count + 1 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  rendercompanies = () => {
    if (this.state.count === 0) return null;
    else if (this.state.company.length === 0)
      return (
        <Badge style={{ fontSize: 15 }} variant="primary">
          No Companies
        </Badge>
      );
    else {
      return (
        <ul>
          {this.state.company.map(companies => (
            <li key={companies._id}>
              <ListGroup.Item action href="#link1" action variant="secondary">
                {" "}
                <strong style={{ color: "steelblue" }}>
                  Company Name:
                </strong>{" "}
                {companies.company_name_english}
              </ListGroup.Item>{" "}
            </li>
          ))}
        </ul>
      );
    }
  };

  render() {
    return (
      <div>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Companies
        </span>
        <br />
        <Button
          onClick={this.showCompnies}
          className=" m-2"
          variant="outline-secondary"
        >
          Show Companies
        </Button>
        {this.rendercompanies()}
      </div>
    );
  }
}

export default AllCompanies;
