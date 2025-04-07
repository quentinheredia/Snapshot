import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router";

const Login: React.FC = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "300px" }} className="p-4 shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-2">
            <strong>Welcome!</strong>
          </Card.Title>
          <Card.Subtitle className="mb-4 text-center text-muted">
            Sign in to continue.
          </Card.Subtitle>
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="johndoe@email.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Log in
            </Button>
          </Form>
          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to="/sign-up">Sign up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
