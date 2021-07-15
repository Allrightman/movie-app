import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';

import data from './api/movies.json';

import { MoviesList } from './components/MoviesList';
import { FindMovie } from './components/FindMovie';

export const App = () => {
  const [movies, setMovies] = useState(data);

  const addMovie = (newMovie) => {
    if (!movies.some(({ imdbId }) => newMovie.imdbId === imdbId)) {
      setMovies(currentMovies => [...currentMovies, newMovie]);
    }
  };

  const deleteMovie = (imdbId) => {
    const filteredMovies = movies.filter(movie => movie.imdbId !== imdbId);
    setMovies(filteredMovies);
  };

  return <>
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/home">
          Home
        </Link>
        <Link className="navbar-item" to="/favorite">
          Favorite movies
        </Link>
      </div>
    </nav>

    <div className="page">
      <Route path="/home">
        <FindMovie onAdd={addMovie} onDelete={deleteMovie} />
      </Route>
      <Route path="/favorite">
        <div className="page-content">
          <h2 className="subtitle">My favorite movies</h2>
          <MoviesList movies={movies} />
        </div>
      </Route>
    </div>
  </>
};
