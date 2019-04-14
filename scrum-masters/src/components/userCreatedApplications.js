import React, { Component } from 'react'
import {Badge, Button, ListGroup} from 'react-bootstrap'
const axios = require('axios')
axios.default.adapter = require ('axios/lib/adapters/http')

class userCreatedApplications extends Component {
  state = {
    applications: [],
    isApplicationsShown: false
  }

  showUserCreatedApplications = () => {
    axios
         .get('http://localhost:3001/api/company/userCreatedApplications/'+localStorage.getItem("userId"))
         .then(userCreatedApplication => {
           this.setState({ applications: userCreatedApplication.data })
           this.setState({ isApplicationsShown: true })
         })
         .catch(err => {
           console.log(err)
         })
  }

  renderApplications = () => {
    if (!this.state.isApplicationsShown) return null
    else if (this.state.applications.length === 0)
      return (
        <Badge style={{ fontSize: 15 }} variant="primary">
          No Created Applications
        </Badge>
      )
    else {
      return (
        <ul>
          {this.state.applications.map(application => (
            <li key={application._id}>
              <ListGroup.Item action href="#link1" variant="secondary">
                <strong style={{ color: "steelblue" }}>
                  Company Name:
                </strong> {" "}
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
        <span
            style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }} className="badge">
            Created Companies
        </span>
        <br />
        <Button onClick={this.showUserCreatedApplications} className=" m-2" variant="outline-secondary">
          Show Created Companies
        </Button>
        {this.renderApplications()}
      </div>
    )
  }
}

export default userCreatedApplications