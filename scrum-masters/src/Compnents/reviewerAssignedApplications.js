import React, { Component } from 'react'
import {Badge, Button, ListGroup} from 'react-bootstrap'
const axios = require('axios')
axios.default.adapter = require ('axios/lib/adapters/http')

class reviewerAssignedApplications extends Component {
  state = {
    applications: [],
    isApplicationsShown: false
  }

  showReviewerAssignedApplications = () => {
    
      axios.get('http://localhost:3001/api/company/reviewerAssignedApplications/5cab87cbdfbd5434c05dd1ba')
           .then(reviewerAssignedApplication => {
            this.setState({ applications: reviewerAssignedApplication.data })
            this.setState({ isApplicationsShown: true })
          })
           .catch(err => {
              console.log(err)
           })
  }

  renderApplications = () => {
    if (!this.state.isApplicationsShown) return null;
    else if (this.state.applications.length === 0)
      return (
        <Badge style={{ fontSize: 15 }} variant="primary">
          No Applications
        </Badge>
      );
    else {
      return (
        <ul>
          {this.state.applications.map(application => (
            <li key={application._id}>
              <ListGroup.Item action href="#link1" variant="secondary">
                <strong style={{ color: "steelblue" }}>
                  Company Name:
                </strong>{" "}
                {application.company_name_arabic  }
              </ListGroup.Item>
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <span style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }} className="badge">
            Reviewer Assigned Companies
        </span>
        <br />
        <Button onClick={this.showReviewerAssignedApplications} className=" m-2" variant="outline-secondary">
            Show reviewer assigned Applications
        </Button>
        {this.renderApplications()}
      </div>
    )
  }
}

export default reviewerAssignedApplications