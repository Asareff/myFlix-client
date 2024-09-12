import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email
    };

    fetch("https://movies-service-330159435834.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.href = "/login";
      } else {
        alert("Signup failed");
      }
    })
    .catch(error => {
      console.error("Error signing up:", error);
      alert("Something went wrong");
    });
  };

  return (
    <Container>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label></Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label></Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn draw-border">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};
