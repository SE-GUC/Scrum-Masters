import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const navigationbar = () => {
  return (
    <div>
      <Navbar bg="light" color="skyblue" expand="lg">
        <Navbar.Brand>Sumerge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Notifications</Nav.Link>
            <Nav.Link href="/unassignedCompanies">Unassigned Companies</Nav.Link>
            <Nav.Link href="/allCompanies">All Companies</Nav.Link>
            <Nav.Link href="/applicationReview">Review your applications</Nav.Link> 
            <Nav.Link href="/register">Register investor</Nav.Link>
            <Nav.Link href='/lawyerAssignedApplication'>lawyerAssignedApplications</Nav.Link>
            <Nav.Link href='/reviewerAssignedApplication'>reviewerAssignedApplications</Nav.Link>
            <Nav.Link href='/userCreatedApplication'>userCreatedApplications</Nav.Link>
            <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Sign out</NavDropdown.Item>
              <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/companyform">
                Company Form
              </NavDropdown.Item>
              <NavDropdown.Item href="CompanyUpdate">
                Update Company
              </NavDropdown.Item>
              <NavDropdown.Item href="/">settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Contact us</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default navigationbar;
