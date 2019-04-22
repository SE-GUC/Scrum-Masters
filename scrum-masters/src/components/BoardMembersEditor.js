import React, { Component } from "react";
import { Badge, Button, Form, Col, Row } from "react-bootstrap";

class BoardMembersEditor extends Component {
  state = {
    loaded_board_members: this.props.boardMembers ? this.props.boardMembers : [],
    board_members: this.props.boardMembers ? this.props.boardMembers : [],
    readOnly: this.props.readOnly
  };
  
  componentWillReceiveProps(nextProps) {
    this.setState({ readOnly: nextProps.readOnly });
    if (nextProps.boardMembers && this.state.loaded_board_members !== nextProps.boardMembers) {
      this.setState({ board_members: nextProps.boardMembers, loaded_board_members: nextProps.boardMembers });
    }
  }
  
  getNew() {
    return {
      name: "",
      type: "",
      nationality: "",
      gender: "",
      id_type: "",
      id_number: "",
      birth_date: "",
      address: "",
      position: "",
    };
  }
  
  extend() {
    this.setState({ board_members: this.state.board_members.concat(this.getNew()) }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.stripIds());
      }
    });
  }
  
  delete(obj) {
    this.setState({ board_members: this.state.board_members.filter(board_member => {
      return board_member !== obj;
    })}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.stripIds());
      }
    });
  }
  
  formChange(obj, path, value) {
    this.state.board_members.find(board_member => {
      return board_member === obj;
    })[path] = value;
    this.forceUpdate();
    if (this.props.onChange) {
      this.props.onChange(this.stripIds());
    }
  }
  
  stripIds() {
    return this.state.board_members.map(board_member => {
      var copy = Object.assign(board_member, {});
      delete(copy._id);
      return copy;
    });
  }

  render() {
    var index = 1;
    return <>
      <h4>Board Members {!this.state.readOnly && <Button variant="success" onClick={() => this.extend()}>Add</Button>}</h4>
      {this.state.readOnly && this.state.board_members.length == 0 && <p>No board members</p>}
      {this.state.board_members.map(board_member => (<>
        <Row>
          <Col xs={1} style={{ paddingRight: 0 }}>
            {this.state.readOnly && <span style={{ fontWeight: "bold" }}>#{index++}</span> }
            {!this.state.readOnly && 
              <Form.Group>
                <Button variant="danger" block onClick={() => this.delete(board_member)}>Delete</Button>
              </Form.Group>}
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  readOnly={this.state.readOnly}
                  placeholder="Name"
                  title="Name"
                  value={board_member.name}
                  onChange={e => this.formChange(board_member, "name", e.target.value)}
                />
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  readOnly={this.state.readOnly}
                  disabled={this.state.readOnly}
                  title="Type"
                  value={board_member.type}
                  onChange={e => this.formChange(board_member, "type", e.target.value)}>
                  <option value="" disabled>Type</option>
                  <option>type1</option>
                  <option>type2</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  readOnly={this.state.readOnly}
                  disabled={this.state.readOnly}
                  title="Nationality"
                  value={board_member.nationality}
                  onChange={e => this.formChange(board_member, "nationality", e.target.value)}>
                  <option value="" disabled>Nationality</option>
                  <option>Egyptian</option>
                  <option>German</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  readOnly={this.state.readOnly}
                  disabled={this.state.readOnly}
                  title="Gender"
                  value={board_member.gender}
                  onChange={e => this.formChange(board_member, "gender", e.target.value)}>
                  <option value="" disabled>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  readOnly={this.state.readOnly}
                  disabled={this.state.readOnly}
                  title="ID type"
                  value={board_member.id_type}
                  onChange={e => this.formChange(board_member, "id_type", e.target.value)}>
                  <option value="" disabled>ID type</option>
                  <option>type1</option>
                  <option>type2</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control
                  type="number"
                  readOnly={this.state.readOnly}
                  placeholder="ID number"
                  title="ID number"
                  value={board_member.id_number}
                  onChange={e => this.formChange(board_member, "id_number", e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="date"
                  readOnly={this.state.readOnly}
                  placeholder="Birth date"
                  title="Birth date"
                  value={board_member.birth_date.substring(0, 10)}
                  onChange={e => this.formChange(board_member, "birth_date", e.target.value)}
                />
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  readOnly={this.state.readOnly}
                  placeholder="Address"
                  title="Address"
                  value={board_member.address}
                  onChange={e => this.formChange(board_member, "address", e.target.value)}
                />
              </Form.Group>
              
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  readOnly={this.state.readOnly}
                  disabled={this.state.readOnly}
                  value={board_member.position}
                  title="Position"
                  onChange={e => this.formChange(board_member, "position", e.target.value)}>
                  <option value="" disabled>Position</option>
                  <option>Manager</option>
                  <option>Employee</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
      </>))}
    </>;
  }
}

export default BoardMembersEditor;
