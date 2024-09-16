// src/index.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import PropTypes from 'prop-types'; // Import PropTypes for type-checking props
import MainView from './components/MainView/MainView';
import MovieView from './components/MovieView/MovieView';

const MyFlixApplication = () => {
  const [currentView, setCurrentView] = useState('main');
  const [movies, setMovies] = useState([]); // State to store fetched movies

  useEffect(() => {
    // Function to fetch data from the API
    const fetchMovies = async () => {
      try {
        // GET request to the /movies endpoint of your API
        const response = await axios.get('http://your-api-url.com/movies');
        // Updated the state with the fetched movies
        setMovies(response.data.movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Calls the fetchMovies function when the component mounts
    fetchMovies();
  }, []);

  const handleCardClick = () => {
    setCurrentView('movie');
  };

  const handleBackButtonClick = () => {
    setCurrentView('main');
  };

  return (
    <div>
      {currentView === 'main' ? (
        <MainView movies={movies} handleCardClick={handleCardClick} />
      ) : (
        <MovieView movie={selectedMovie} handleBackButtonClick={handleBackButtonClick} />
      )}
    </div>
  );
};

// Defines PropTypes for MyFlixApplication component
MyFlixApplication.propTypes = {
  movies: PropTypes.array.isRequired,
};

// Finding the root of your app
const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);

// Tells React to render my app in the root DOM element
root.render(<MyFlixApplication />);
