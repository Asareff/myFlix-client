import "./MovieCard.scss";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieCard = ({ movie, user, setUser, token }) => {
  const isFavorite = user?.FavoriteMovies?.find((m) => m === movie._id);
  const [image, setImage] = useState("");

  const handleFavoriteButton = () => {
    const method = isFavorite ? "delete" : "post";
    fetch(
      `https://movies-service-330159435834.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method,
      }
    )
      .then((result) => result.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    if (movie.imageUrl) {
      setImage(movie.imageUrl);
    }
  }, [movie]);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        <Row>
          <Col>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button variant="link">Open</Button>
            </Link>
          </Col>
        </Row>
        <Col>
          <Button variant="link" onClick={handleFavoriteButton}>
            {isFavorite ? "Remove" : "Add"} favorite
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string
    }),
    imageUrl: PropTypes.string,
    _id: PropTypes.string
  }).isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};
