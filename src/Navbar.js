import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";

const Navbarcomp = ( props ) => {
    return (

        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand ><img src="https://static.pexels.com/photos/36753/flower-purple-lical-blosso.jpg" width="50 px" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link >About</Nav.Link>
                        <Nav.Link >{ ( <button onClick={ props.onClickHandler }> Connect Wallet </button> ) } </Nav.Link>
                        <Nav.Link >{ props.isAuthenticated ? <div>{ props.signer }</div> : <div>Not logged in</div> } </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navbarcomp;
