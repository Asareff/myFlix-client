import React, { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
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

   // Add Favorite Movie
   const addFav = (id) => {

    fetch(`https://movies-service-330159435834.herokuapp.com/users/${user.Username}/movies/${id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed to add");
        }
    }).then((user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            //setIsFavorite(true);
        }
    }).catch(error => {
        console.error('Error: ', error);
    });
};

 // Remove Favorite Movie
 const removeFav = (id) => {

  fetch(`https://movies-service-330159435834.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then((response) => {
      if (response.ok) {
          return response.json();
      } else {
          alert("Failed to remove")
      }
  }).then((user) => {
      if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          //setIsFavorite(false);
      }
  }).catch(error => {
      console.error('Error: ', error);
  });
};

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
          {/* Login route */}
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
            }
          />
          {/* Signup route */}
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/" /> : <SignupView />
            }
          />
          {/* Profile route */}
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  user={user}
                  setUser={setUser}
                  token={token}
                  movies={movies}
                  removeFav={removeFav}
                  addFav={addFav}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Movies route */}
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                  {movies.map(movie => (
                    <div key={movie._id} style={{ width: '300px', margin: '10px' }}>
                      <MovieCard
                        movie={movie}
                        onAddToFavorites={() => addFav(movie._id)}
                        onRemoveFromFavorites={() => removeFav(movie._id)}
                      />
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