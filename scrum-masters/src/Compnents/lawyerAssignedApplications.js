import React, { Component } from 'react'
import {Badge, Button, ListGroup} from 'react-bootstrap'
const axios = require('axios')
axios.default.adapter = require ('axios/lib/adapters/http')

class lawyerAssignedApplications extends Component {
  state = {
    applications: [],
    isApplicationsShown: false
  }

  showAssignedApplications = () => {
    axios
      .get('http://localhost:3001/api/company/lawyerAssignedApplications/5ca8e9885c3ff610702e3069')
      .then(lawyerAssignedApplication => {
        this.setState({ applications: lawyerAssignedApplication.data })
        this.setState({ isApplicationsShown: true })
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderApplications = () => {
    if(!this.state.isApplicationsShown) return null
    else if (this.state.applications.length === 0)
      return (
        <Badge style={{ fontSize: 15 }} variant="primary">
          No Assigned Applications
        </Badge>
      )
    else {
      return (
        <ul>
          {this.state.applications.map(application => (
            <li key={application._id}>
              <ListGroup.Item action href="#link1" action variant="secondary">
                <strong style={{ color: "steelblue" }}>
                  Company Name:
                </strong>{" "}
                {application.company_name_arabic  }
              </ListGroup.Item>
            </li>
          ))}
        </ul>
      )
    }
  }

  render() {
    return (
      <div>
        <span style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }} className="badge">
          Assigned Applications
        </span>
        <br />
        <Button 
          onClick={this.showAssignedApplications}
          className=" m-2"
          variant="outline-secondary"
        >
          Show Assigned Applications
        </Button>
        {this.renderApplications()}
      </div>
    )
  }
}

export default lawyerAssignedApplications
