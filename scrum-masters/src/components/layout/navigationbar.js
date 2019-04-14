import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Login from "../auth/Login.js";

const navigationbar = () => {
  return (
    <div>
      <Navbar bg="light" color="skyblue" expand="lg" >
        <Navbar.Brand>Sumerge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/electronicJournal">Electronic Journals</Nav.Link>
          </Nav>
          <Nav>
            { !localStorage.getItem("userId") && <>
            <Nav className='ml-auto'></Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>}
            { localStorage.getItem("userId") && <>
              <Nav.Link href="#link">Notifications</Nav.Link>
              <Nav.Link href="/unassignedCompanies">Unassigned Companies</Nav.Link>
              <Nav.Link href="/applicationReview">Review your applications</Nav.Link>

              <NavDropdown title="" id="basic-nav-dropdown">
                <NavDropdown.Item href="/companyform">Company Form</NavDropdown.Item>
                <NavDropdown.Item href="/userCreatedApplication">userCreatedApplications</NavDropdown.Item>
                <NavDropdown.Item href="/reviewerAssignedApplication">reviewerAssignedApplications</NavDropdown.Item>
                <NavDropdown.Item href="/lawyerAssignedApplication">lawyerAssignedApplications</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="userProfile">User Profile</NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={() => Login.logout()}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default navigationbar;
