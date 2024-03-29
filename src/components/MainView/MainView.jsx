import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/MovieCard";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../SignupView/signup-view";
import { NavigationBar } from "../nav-bar/navigation-bar";
import { ProfileView } from "../ProfileView/ProfileView";

const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://movies-service-330159435834.herokuapp.com/movies')
      .then(response => response.json())
      .then(data => setMovies(data.movies));
  }, []);

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
              path="/profile"
              element={
                !user ? <Navigate to="/login" replace /> : <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
              }
            />
            <Route
              path="/"
              element={
                !user ? <Navigate to="/login" replace /> : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {movies.map(movie => (
                      <div key={movie._id} style={{ width: '300px', margin: '10px' }}>
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                        <img src={movie.imageUrl} alt={movie.title} style={{ height: '520px', objectFit: 'cover' }} />
                      </div>
                    ))}
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
