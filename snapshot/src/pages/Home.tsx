import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Home: React.FC = () => {
  return (
    <div>
      {/* Main Banner */}
      <Container fluid className="py-5 bg-light">
        <Row className="align-items-center">
          <Col md={{ span: 6, offset: 1 }}>
            <h1 className="fw-bold">Welcome to Financial Snapshot</h1>
            <p className="lead">
              Get a quick, clear view of your financial health. Enter your
              income details to see a breakdown of your earnings, future
              projections, and even learn how many work hours it takes to afford
              everyday expenses.
            </p>
            <p>
              For a more detailed, high-resolution snapshot of your finances,
              log in and access personalized insights.
            </p>
            <Button variant="primary" href="/Login">
              Log In for Detailed Snapshot
            </Button>
          </Col>
          <Col md={4}>
            {/* Placeholder for a main graph or image */}
            <Card className="border-0 shadow-sm">
              <Card.Body
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px" }}
              >
                <span className="text-muted">
                  [Main Graph / Image Placeholder]
                </span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Snapshot Section */}
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Snapshot</h2>
            <p className="text-center">
              See a comprehensive breakdown of your salary—from hourly to
              yearly—with future earnings projections.
            </p>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body
                className="d-flex justify-content-center align-items-center"
                style={{ height: "250px" }}
              >
                <span className="text-muted">
                  [Earnings Projections Graph Placeholder]
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <Button
              variant="outline-primary"
              size="lg"
              href="/Snapshot"
              className="mb-3"
            >
              View Snapshot
            </Button>
            <p>
              Get an instant view of your earnings breakdown and future
              projections with our Snapshot tool.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Tax Calculator Section */}
      <Container fluid className="py-5 bg-light">
        <Row className="align-items-center">
          <Col md={6} className="d-flex flex-column justify-content-center">
          <Col
            md={{ span: 5, offset: 1 }}
            className="d-flex flex-column justify-content-center"
          >
            <Button
              variant="outline-success"
              size="lg"
              href="/Tax"
              className="mb-3"
            >
              Tax Calculator
            </Button>
            <p>
              Quickly calculate your after-tax income and understand your
              take-home pay with our built-in tax calculator.
            </p>
          </Col>
          <Col md={6}>
          <Col md={5}>
            <Card className="border-0 shadow-sm">
              <Card.Body
                className="d-flex justify-content-center align-items-center"
                style={{ height: "250px" }}
              >
                <span className="text-muted">
                  [Tax Calculation Graph / Image Placeholder]
                </span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Login Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body
                className="d-flex justify-content-center align-items-center"
                style={{ height: "250px" }}
              >
                <span className="text-muted">
                  [Login Page Preview Placeholder]
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <Button
              variant="outline-dark"
              size="lg"
              href="/Login"
              className="mb-3"
            >
              Login
            </Button>
            <p>
              For personalized, detailed insights into your financial profile,
              log in to access additional features.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
