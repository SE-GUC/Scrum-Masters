import React, { Component } from "react";

import {
  Badge,
  Button
} from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");


class applicationReview extends Component{

  state = {
    count:0,
    comment_text: "",
    comment_date: "",
    application_id: "5ca0bdaa284aa32a50743d79",        //not needed
    user_id: "5ca0cfcc93ce191cd4a5f8f2" //not needed
  };

  applicationreviewchange = e => {
    this.setState({ comment_text: e.target.value });
    this.check();
  }

  applicationdatechange = e => {
    this.setState({ comment_date: e.target.value });
  }

  reviewApplication = () => {

    const review = {
      comment_text: this.state.text,
      comment_date: this.state.date,
      application_id: this.state.application_id,
      user_id: this.state.user_id
    };

    axios
      .post("http://localhost:3001/api/comment", review) 
      .then(review => {
        this.setState({ review: [review]});
        this.setState({ count: this.state.count+1});
      })
      .catch(err => {
        console.log(err);
      });
  };

  check = () => {
    if(this.state.comment_text.length === 0)
      return(
        <Badge style={{ fontSize: 15 }} variant="Danger">
          {this.state.error}
        </Badge>
      );
    else
      return(
        <Badge style={{ fontSize: 15 }} variant="primary">
          Your review has been submitted
        </Badge>
      );
  };

  // renderApplication = () => {
  //   if(this.state.count === 0 ) return null;
  //   else {
  //     return (
  //       <ul>
  //         {this.state.company.map(application => (
  //           <li key={application._id}>
  //             <ListGroup.Item action href="#link1" action variant="secondary">
  //               {" "}
  //               <strong style={{ color: "steelblue" }}>
  //                 Application and review :
  //               </strong>{" "}
  //               {application.x}
  //             </ListGroup.Item>{" "}
  //           </li>
  //         ))}
  //       </ul>
  //     )
  //   }
  // }

  //Supposed to have list of application to choose from
  render() {
    return (
      <div>
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Applications
        </span>
        <br />
        <Button
          onClick={this.reviewApplication}
          className=" m-2"
          variant="outline-secondary"
        >
          Submit review
        </Button>
        <input
          type="text"
          value={this.state.value}
          placeholder="Type application comment"
          onChange={this.applicationreviewchange}
          />
          
      </div>
    )
  }
}

export default applicationReview;