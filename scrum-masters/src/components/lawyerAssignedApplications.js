import React, { Component } from 'react'
import {Badge, Button, ListGroup} from 'react-bootstrap'

import App from "../App";

class lawyerAssignedApplications extends Component {
    state = {
     applications: [],
     isApplicationsShown: false
    }

  componentDidMount = () => {
    App.api("get", "/company/lawyerAssignedApplications/"+localStorage.getItem("userId"))
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
              <ListGroup.Item action href={"/company/"+application._id} variant="secondary">
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
          Assigned Tasks
        </span>
        <br />
        {this.renderApplications()}
      </div>
    )
  }
}

export default lawyerAssignedApplications
