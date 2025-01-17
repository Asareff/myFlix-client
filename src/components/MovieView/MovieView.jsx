import React from "react";
import "./MovieView.scss";
import { useParams, Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);

    if (!movie) {
        console.error("Movie not found:", movieId);
        return <div>Loading...</div>; // or any other fallback UI
    }

    console.log("Selected movie:", movie);

    return (
        <div className="movie-container">
            {/* Movie Details */}
            <Row className="my-5 justify-content-md-center">
                <Col md={7} className="col-12">
                    <img src={movie.imageUrl} alt="movie cover" className="mx-auto w-100 movie-cover" />
                </Col>
                <Col md={5} className="col-12">
                    <div className="my-1">
                        <h1>{movie.title}</h1>
                    </div>
                    <div className="details">
                        <div className="detail-item">
                            <strong>Director:</strong> {movie['director.name']}
                        </div>
                        <div className="detail-item">
                            <strong>Genre:</strong> {movie['genre.name']}
                        </div>
                        <div className="detail-item">
                            <strong>Description:</strong> {movie.description}
                        </div>
                    </div>
                    <Link to={`/`}>
                        <Button className="my-2">Back</Button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
            director: PropTypes.shape({
                name: PropTypes.string
            }),
            genre: PropTypes.shape({
                name: PropTypes.string
            }),
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default MovieView;
