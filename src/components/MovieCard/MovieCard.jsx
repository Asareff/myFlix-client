import React from "react"
import "./MovieCard.scss";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";


export const MovieCard = ({ movie }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (movie && movie.imageUrl) {
      setImage(movie.imageUrl);
    }
  }, [movie]);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Row>
          <Col>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button variant="link">Open</Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    _id: PropTypes.string
  }).isRequired,
  genreName: PropTypes.string.isRequired, // Add genreName prop
};