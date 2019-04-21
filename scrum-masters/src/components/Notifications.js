import React, { Component } from "react";
import { Container, Alert, ListGroup, Spinner } from "react-bootstrap";

const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class Notification extends Component{
  id = this.props.match.params.user_id;
  state = {
      notifications : [],
      loading : true,
  }

  componentDidMount(){
      axios.get("http://localhost:3001/api/notification/" + localStorage.getItem("userId")).then(
        notification =>{
          notification.data.sort((a, b) => {
            if (a.date < b.date)
               return 1;
            if (a.date > b.date)
              return -1;
            return 0;
          });
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
        <Container style={{ marginTop: "20px" }}>
          <Alert variant="secondary">
            No notifications
          </Alert>
        </Container>
      );
    else {
      return (
        <Container style={{ marginTop: "20px" }}>
          {this.state.notifications.map(notification => (
            <Alert variant={notification.viewed ? "secondary" : "primary"} key={notification._id}>
              <Alert.Link
                href={"/company/"+notification.target_id}
                onClick ={() => this.handler(notification._id)}
                
              >
              {notification.notif_text}
              </Alert.Link>
              <br />
              {new Date(notification.date).toString()}
            </Alert>
          ))}
        </Container>
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
     <Spinner animation="border" />


     </div>

    )
    return(
        <div>
            {this.rendernotifications()}
        </div>
    )
  }
}

export default Notification