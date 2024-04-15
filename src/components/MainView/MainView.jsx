import React, { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { MovieCard } from "../MovieCard/MovieCard";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../SignupView/signup-view";
import { NavigationBar } from "../nav-bar/navigation-bar";
import ProfileView from '../ProfileView/ProfileView';
import { MovieView } from '../MovieView/MovieView';
import "./MainView.scss";

const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);


  useEffect(() => {
    fetch('https://movies-service-330159435834.herokuapp.com/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data.movies);
        setFilteredMovies(data.movies); // Initialize filteredMovies with all movies
      });
  }, []);

  useEffect(() => {
    console.log("Selected Genre:", selectedGenre);
    setFilteredMovies(movies.filter(movie => {
      const titleMatches = !search || movie.title.toLowerCase().includes(search.toLowerCase());
      const genreMatches = !selectedGenre || (movie.genre && movie.genre.name.toLowerCase() === selectedGenre.toLowerCase());
      return titleMatches && genreMatches;
    }));
  }, [movies, search, selectedGenre]);
  

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container>
        <Row className="justify-content-center">
          <Routes>
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" /> : <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
              }
            />
            <Route
              path="/signup"
              element={
                user ? <Navigate to="/" /> : <SignupView />
              }
            />
            <Route
              path="/profile/:username"
              element={
                user ? <ProfileView user={user} token={token} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <MovieView
                    movies={movies}
                    user={user}
                  />
                )
              }
            />
            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <div>
                    <div className="filter-container">
                      <input
                        type="text"
                        placeholder="Search by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                      >
                        <option value="">Filter by genre</option>
                        {Array.from(new Set(movies.map(movie => movie['genre.name']))).map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>

                    </div>
                    <div className="movie-cards-container">
                      {filteredMovies.map(movie => (
                        <div key={movie._id} className="movie-card">
                          <MovieCard movie={movie} genreName={movie['genre.name']} />

                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default MainView;
