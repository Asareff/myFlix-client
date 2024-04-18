import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      username: username,
      password: password
    };
    
    fetch("https://movies-service-330159435834.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        console.log("User stored in localStorage:", data.user);
        console.log("Token stored in localStorage:", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((error) => {
      alert("Login failed. Please try again.");
      console.error("Error during login:", error);
    });
  };
  

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label className="form-label"></Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3" 
            className="form-control"
            placeholder="Username"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label className="form-label"></Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control" 
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn draw-border">
          Log In
        </Button>
      </Form>
    </div>
  );
};
