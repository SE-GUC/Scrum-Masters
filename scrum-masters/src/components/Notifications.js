import React, { Component } from "react";
import { Badge, ListGroup, Spinner } from "react-bootstrap";

const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class Notification extends Component{
  id = this.props.match.params.user_id;
  state = {
      notifications : [],
      loading : false,
  }

  componentDidMount(){
      axios.get("http://localhost:3001/api/notification/" + this.props.match.params.user_id).then(
          notification =>{
          this.setState({notifications : notification.data});
          this.setState({loading : false});}
      )
      .catch(err =>
        {
            console.log(err);
        })
  }

  rendernotifications = () => {
   
    if (this.state.notifications.length === 0)
      return (
        <Badge style={{ fontSize: 15 }} variant="primary">
          No notifications
        </Badge>
      );
    else {
      return (
        <ul>
          {this.state.notifications.map(notifications => (
            <li key={notifications._id}>
              <ListGroup.Item
                action
                href="#link1"
                variant="secondary"
                onClick ={() => this.handler(notifications._id)}
                
              >
                {" "}
                <strong style={{ color: "steelblue" }}>
                  Notification!! :
                </strong>{" "}
                {notifications.notif_text}
              </ListGroup.Item>{" "}
            </li>
          ))}
        </ul>
      );
    }
  };

  handler = async e => {
    
    try {
      await axios.delete('http://localhost:3001/api/notification/' + e) 
      this.setState({alert:"Success"})
    } catch(error) {
       
      this.setState({alert:"Error"})
     console.log(this.state.alert)
     
    }
  };

  render(){
    if(this.state.loading)
    return(
     <div>
     <span
       style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
       className="badge"
     >
       Notifications
     </span>
     <br />
     <Spinner animation="border" />;


     </div>

    )
    return(
        <div>
            {this.rendernotifications}
        </div>
    )
  }
}

export default Notification