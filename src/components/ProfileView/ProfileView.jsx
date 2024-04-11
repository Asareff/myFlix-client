import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../MovieCard/MovieCard";
import "./profile-view.scss";

const ProfileView = ({ user, setUser, token, movies, removeFav, addFav }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(moment(user.Birthday).utc().format('YYYY-MM-DD'));

  const navigate = useNavigate();

  const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m._id));

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://movies-service-330159435834.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then(async (response) => {
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

  const handleDelete = () => {
    fetch(`https://movies-service-330159435834.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
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
              <Card.Text>Username: {username}</Card.Text>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>Birthday: {moment(birthday).format('YYYY-MM-DD')}</Card.Text>
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
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                className="mb-2"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="mt-3 me-2">Update</Button>
            <Button onClick={handleDelete} className="mt-3 bg-danger border-danger text-white">Delete User</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2>
        <Row className="justify-content-center">
          {favoriteMovies.length !== 0 ? (
            favoriteMovies.map((movie) => (
              <Col key={movie._id} sm={7} md={5} lg={3} xl={2} className="mx-2 mt-2 mb-5 col-6 similar-movies-img">
                <MovieCard
                  movie={movie}
                  removeFav={removeFav}
                  addFav={addFav}
                  isFavorite={user.FavoriteMovies.includes(movie._id)}
                />
              </Col>
            ))
          ) : (
            <Col>
              <p>There are no favorite movies</p>
            </Col>
          )}
        </Row>
      </Row>
    </Container>
  );
};

export { ProfileView };
