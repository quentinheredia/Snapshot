import React, { useState, useEffect } from "react";
import { Navbar as RBNavbar, Nav, Container } from "react-bootstrap";
import NavButton from "./navButton";

const Navbar: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(
    window.pageYOffset
  );
  const [visible, setVisible] = useState<boolean>(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    // Show navbar if scrolling up or near the top; hide if scrolling down.
    const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
    setVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <RBNavbar
      expand="lg"
      style={{
        position: "fixed",
        top: visible ? "0" : "-80px", // Adjust "-80px" if your navbar height changes.
        transition: "top 0.3s",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e0e0e0",
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Container fluid>
        <RBNavbar.Brand
          href="/Home"
          style={{
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#333333",
            marginLeft: "1rem",
          }}
        >
          FINSNAP
        </RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ alignItems: "center" }}>
            <Nav.Link href="/Home" style={{ padding: "0 0.5rem" }}>
              <NavButton>Home</NavButton>
            </Nav.Link>
            <Nav.Link href="/Snapshot" style={{ padding: "0 0.5rem" }}>
              <NavButton>Snapshot</NavButton>
            </Nav.Link>
            <Nav.Link href="/Tax" style={{ padding: "0 0.5rem" }}>
              <NavButton>Tax Calculator</NavButton>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/Login" style={{ marginRight: "1rem" }}>
              <NavButton>Login</NavButton>
            </Nav.Link>
            <Nav.Link href="/Sign-up" style={{ marginRight: "1rem" }}>
              <NavButton>Sign up</NavButton>
            </Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;
