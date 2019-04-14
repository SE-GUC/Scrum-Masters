import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Login from "../auth/Login.js";

const navigationbar = () => {
  return (
    <div>
      <Navbar bg="light" color="skyblue" expand="lg">
        <Navbar.Brand>Sumerge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/electronicJournal">Electronic Journals</Nav.Link>
          </Nav>
          <Nav>
            { !localStorage.getItem("userId") && <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>}
            { localStorage.getItem("userId") && <>
              <Nav.Link href="#link">Notifications</Nav.Link>
              { localStorage.getItem("userType") !== "investor" && <>
                <Nav.Link href="/allCompanies">View companies</Nav.Link>
              </>}
              { localStorage.getItem("userType") === "lawyer" && <>
                <Nav.Link href="/lawyerAssignedApplication">My tasks</Nav.Link>
              </>}
              { localStorage.getItem("userType") === "reviewer" && <>
                <Nav.Link href="/reviewerAssignedApplication">My tasks</Nav.Link>
              </>}
              
              <NavDropdown title="" id="basic-nav-dropdown" alignRight>
                <NavDropdown.Item href="/companyform">Company Form</NavDropdown.Item>
                { (localStorage.getItem("userType") === "investor" || localStorage.getItem("userType") === "lawyer") && <>
                  <NavDropdown.Item href="/userCreatedApplication">Created Companies</NavDropdown.Item>
                </>}
                { localStorage.getItem("userType") === "admin" && <>
                  <Nav.Link href="/admin_create">Create accounts</Nav.Link>
                </>}
                <NavDropdown.Divider />
                <NavDropdown.Item href={"/userProfile/" + localStorage.getItem("userId")}>User Profile</NavDropdown.Item>
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
