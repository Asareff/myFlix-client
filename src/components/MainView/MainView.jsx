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
  const [viewMovies, setViewMovies] = useState([]);

  useEffect(() => {
    if (token) {
      fetch("https://movies-service-330159435834.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setViewMovies(data);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
    }
  }, [token]);

  // Ensure viewMovies is initialized as an array
  useEffect(() => {
    setViewMovies(movies);
  }, [movies]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onSearch={(query) => {
          setViewMovies(movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
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
                  <>
                    {viewMovies && Array.isArray(viewMovies) && viewMovies.length > 0 ? (
                      viewMovies.map(movie => (
                        <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))
                    ) : (
                      <Col style={{ color: "white" }}>
                        <p>The list is empty. Loading data from API...</p>
                      </Col>
                    )}
                  </>
                )
              }
            />
            <Route
              path=""
              element={<Navigate to="/" />} // This handles the case when there's no route specified
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default MainView;
