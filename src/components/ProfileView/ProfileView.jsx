import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import "./profile-view.scss";

export const ProfileView = ({ user, setUser, token, movies }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  let favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  // Update user info
  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Email: email,
    };

    fetch(
      `https://movies-service-330159435834.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Update was successful");
        } else {
          alert("Update failed");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  // Delete a User
  const handleDelete = () => {
    fetch(`https://movies-service-330159435834.herokuapp.com/users${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("User has been deleted");
        localStorage.clear();
        navigate("/"); // go back to home page
      } else {
        alert("Something went wrong.");
      }
    });
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="text-center text-md-start ms-3">
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>Username:{user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} className="mt-5">
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="5"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className="mb-3"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" onClick={handleUpdate} className="mt-3 me-2">
              Update
            </Button>
            <Button
              onClick={handleDelete}
              className="mt-3 bg-danger border-danger text-white"
            >
              Deactivate
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center mx-3 my-4">
        <h2 className="profile-title">Favorite movies</h2>
        {favoriteMovies.map((movie) => {
          return (
            <Col key={movie._id} className="m-3">
              <MovieCard
                movie={movie}
                token={token}
                setUser={setUser}
                user={user}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
