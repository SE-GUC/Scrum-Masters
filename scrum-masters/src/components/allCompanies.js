import React, { Component } from "react";
import { Spinner, ListGroup } from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class AllCompanies extends Component {
  state = {
    company: [],
    loading:true
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:3001/api/company")
      .then(companies => {
        this.setState({ company: companies.data });
        this.setState({loading:false})
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if(this.state.loading)
     return(
      <div>
      <span
        style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
        className="badge"
      >
        Companies
      </span>
      <br />
      <Spinner animation="border" />;


      </div>

     )
    return (
      <div>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Companies
        </span>
        <br />
        <ul>
          {this.state.company.map(companies => (
            <li key={companies._id}>
              <ListGroup.Item action href={`/company/${companies._id}`} variant="light">
                {""}
                <strong style={{ color: "steelblue" }}>
                  Company Name:
                </strong>{" "}
                {companies.company_name_english}
              </ListGroup.Item>{" "}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AllCompanies;
