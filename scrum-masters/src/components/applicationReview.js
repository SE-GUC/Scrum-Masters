import React, { Component } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {
  Button,
  Badge
} from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");


class applicationReview extends Component{

  state = {
    count:0,
    comment_text: "",
    comment_date: "",
    reviewed_statuslawyer: false,
    reviewed_statusreviewer: false,
    review_reviewer:null,
    review_lawyer:null,
    comments:[],
    msg:"",
    application_id: "5ca0bdaa284aa32a50743d79",        //not needed
    user_id: "5ca0cfcc93ce191cd4a5f8f2" //not needed
  };

  
  applicationcommentchange = e => {
    this.setState({ comment_text: e.target.value });
  }

  applicationdatechange = e => {
    this.setState({ comment_date: e.target.value });
  }

  // reviewHandler = () => {
  //   if ()
  // } 

  reviewApplication = () => {
    axios
      .put("http://localhost:3001/api/company/"+this.state.application_id, 
      {'reviewed_reviewer': this.state.reviewed_reviewer,
       'reviewed_lawyer': this.state.reviewed_lawyer,
       'review_reviewer': this.state.review_reviewer,
       'review_lawyer': this.state.review_lawyer})
      .then(res => {
        this.setState({ msg: res.data.msg })
      })
      .catch(err => {
        this.setState({ msg:"Error occured" })
      })
  }

  commentApplication = () => {

    const comment = {
      comment_text: this.state.text,
      comment_date: this.state.date,
      application_id: this.state.application_id,
      user_id: this.state.user_id
    };
    console.log(comment)
    axios
      .post("http://localhost:3001/api/comment", comment) 
      .then(res => {
        this.setState({ msg: res.data.msg })
      })
      .catch(err => {
        this.setState({ msg:"Error occured" })
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
          Your comment has been submitted
        </Badge>
      );
  };

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
          onClick={this.commentApplication}
          className=" m-2"
          variant="outline-secondary"
        >
          Submit comment
        </Button>
        <Button
          onClick={this.reviewApplication}
          className=" m-2"
          variant="outline-secondary"
        >
          Submit review
        </Button>

        <InputGroup>
          <InputGroup.Prepend>
           <InputGroup.Text 
          onChange={this.applicationcommentchange}>Comment</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>
        {/* <input
          type="text"
          value={this.state.value}
          placeholder="Type application comment"
          onChange={this.applicationcommentchange}
          /> */}
          
      </div>
    )
  }
}

export default applicationReview;

// foo = arrayOfStuff => {
//   return(
//     !arrayofStuff? <p>nothing to show here</p>:arrayOfStuff.map((item, index) => {
//       <p>item.info || 'default value' </p>
//     })
//   )
// }
