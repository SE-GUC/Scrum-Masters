import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const navigationbar = () => {
  return (
    <div className="nav">
      <Navbar bg="light" color="skyblue" expand="lg">
        <Navbar.Brand>Sumerge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Notifications</Nav.Link>
            <Nav.Link href="/unassignedCompanies">
              Unassigned Companies
            </Nav.Link>
            <Nav.Link href="/inv">investor</Nav.Link>
            <Nav.Link href="/applicationReview">
              Review your applications
            </Nav.Link>

            <Nav.Link href="/lawyerAssignedApplication">
              lawyerAssignedApplications
            </Nav.Link>
            <Nav.Link href="/reviewerAssignedApplication">
              reviewerAssignedApplications
            </Nav.Link>
            <Nav.Link href="/userCreatedApplication">
              userCreatedApplications
            </Nav.Link>

            <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Sign out</NavDropdown.Item>
              <NavDropdown.Item href="/companyform">
                Company Form
              </NavDropdown.Item>
              <NavDropdown.Item href="CompanyUpdate">
                Update Company
              </NavDropdown.Item>
              <NavDropdown.Item href="/signup">
                signUp investor
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Contact us</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default navigationbar;
