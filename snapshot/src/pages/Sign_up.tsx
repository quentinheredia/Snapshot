import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

interface SignupFormData {
  firstname: string;
  lastname: string;
  email: string;
  // Additional fields can be added here in the future (e.g., dob, salary, etc.)
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Signup failed");
      }
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/Login"), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Create Your Account</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstname" className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder="Enter your first name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastname" className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder="Enter your last name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Future fields (e.g., DOB, salary, etc.) can be added here */}
        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
