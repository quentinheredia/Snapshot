import React from "react";
import { Container, Button } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#343a40",
        color: "#ffffff",
        borderTop: "1px solid #495057",
        padding: "1rem 0",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          &copy; {new Date().getFullYear()} FINSNAP. All rights reserved.
        </p>
        <Button
          variant="link"
          style={{
            color: "#ffffff",
            textDecoration: "underline",
          }}
        >
          Contact Support
        </Button>
      </Container>
    </footer>
  );
};

export default Footer;
