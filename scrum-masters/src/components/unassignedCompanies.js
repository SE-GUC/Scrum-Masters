import React, { Component } from "react";
import SuccessAlert from  './SuccessAlert'
import ErrorAlert from './ErrorAlert'

import {
  Badge,
  Button,
  ListGroup
} from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class AllUnassignedCompanies extends Component {
  state = {
    count: 0,
    company: [],
    lawyerId: "5caa32e5a18bd1622048e8b7",
    alert : ''
  };

  showUnassignedCompnies = () => {
    axios
      .get("http://localhost:3001/api/company/listUnassignedApplications")
      .then(companies => {
        this.setState({ company: companies.data });
        this.setState({ count: this.state.count + 1 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handler = async e => {
    
    try {
      await axios.post('http://localhost:3001/api/user/assignLawyer/' + e + '/' + this.state.lawyerId) 
      this.setState({alert:"Success"})
    } catch(error) {
       
      this.setState({alert:"Error"})
     console.log(this.state.alert)
     
    }
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
              <ListGroup.Item
                action
                href="#link1"
                variant="secondary"
                onClick ={() => this.handler(companies._id)}
                
              >
                {" "}
                <strong style={{ color: "steelblue" }}>
                  Company Name:
                </strong>{" "}
                {companies.company_name_arabic  }
                
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
          onClick={this.showUnassignedCompnies}
          className=" m-2"
          variant="outline-secondary"
        >
        
          Show Unassigned Companies
        </Button>
        {this.rendercompanies()}
        <hr/>
        {this.state.alert==="Success"?<SuccessAlert/>:null}
        {this.state.alert==="Error"?<ErrorAlert/>:null}
        <hr/>
      </div>
    );
  }
}

export default AllUnassignedCompanies;
