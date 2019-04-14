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
    reviewed_statuslawyer: false,
    reviewed_statusreviewer: false,
    review_reviewer:{},
    review_lawyer:{},
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

  //STILL NEEDS TO ALTER review_lawyer/review_reviewer THAT REVIEWED IN COMPANY
  reviewHandler = () => {
    axios
      .get("http://localhost:3001/api/user/"+this.state.user_id)
      .then(user => {
        console.log(user)
          if (user.data.type === 'reviewer'){
              this.setState({ reviewed_statusreviewer: true });
              this.setState({ review_reviewer: user.data });
          }
          else if(user.data.type === 'lawyer'){
              this.setState({ reviewed_statuslawyer: true });
              this.setState({ review_lawyer: user.data });
              console.log(this.state);
          }
          else{
            this.setState({ msg:"review error" })
          }
      })
      .catch(err => {
        console.log(err);
      })
      
   } 

  reviewApplication = () => {
    this.reviewHandler();
    axios
      .put("http://localhost:3001/api/company/"+this.state.application_id, 
      {'reviewed_statusreviewer': this.state.reviewed_statusreviewer,
       'reviewed_statuslawyer': this.state.reviewed_statuslawyer,
       'review_reviewer': this.state.review_reviewer,
       'review_lawyer': this.state.review_lawyer
    })
      .then(res => {
        this.setState({ msg: res.data.msg })
      })
      .catch(err => {
        this.setState({ msg:"Error occured" })
      })
  }

  //STILL NEEDS TO BE ADDED COMPANY
  commentApplication = () => {

    const comment = {
      comment_text: this.state.comment_text,
      application_id: this.state.application_id,
      user_id: this.state.user_id
    };
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
           <InputGroup.Text>Comment</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl 
            as="textarea" 
            aria-label="With textarea"
            onChange={this.applicationcommentchange} />
        </InputGroup>
       
          
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
