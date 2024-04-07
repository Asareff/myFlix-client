import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { MovieCard } from "../MovieCard/MovieCard";

export const MovieView = ({ movies, removeFav, addFav, user }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);

    // Similar Movies
    const similarMovies = movies.filter((m) => m._id !== movieId && m.Genre.Name === movie.Genre.Name);

    return (
        <>
            {/* Movie Details */}
            <Row className="my-5 justify-content-md-center">
                <Col md={7} className="col-12">
                    <img src={movie.ImagePath} alt="movie cover" className="mx-auto w-100" />
                </Col>
                <Col md={5} className="col-12">
                    <div className="my-1">
                        <span className="h1">{movie.Title}</span>
                    </div>
                    {/* Include other movie details here */}
                    <div>
                        {user.FavoriteMovies.includes(movie._id) ? (
                            <Button className="my-2 me-2" onClick={() => removeFav(movie._id)}>Remove from Favorites</Button>
                        ) : (
                            <Button className="my-2 me-2" onClick={() => addFav(movie._id)}>Add to Favorites</Button>
                        )}
                    </div>
                    <Link to={`/`}>
                        <Button className="my-2">Back</Button>
                    </Link>
                </Col>
            </Row>

            {/* Similar Movies */}
            <h2>Similar Movies</h2>
            <Row className="justify-content-center">
                {similarMovies.length !== 0 ? (
                    similarMovies.slice(0, 5).map((movie) => (
                        <Col sm={5} md={4} lg={3} xl={2} className="mx-2 my-3 col-6 similar-movies-img" key={movie._id}>
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
                        <p>There are no similar Movies</p>
                    </Col>
                )}
            </Row>
        </>
    );
};
