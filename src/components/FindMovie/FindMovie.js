import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './FindMovie.css';
import classNames from 'classnames';

import {getMovieByTitle, searchMoviesByTitle} from '../../api/movies';

import { MovieCard } from '../MovieCard';
import {MovieCardSearch} from "../MovieCardSearch";

export const FindMovie = ({ onAdd, onDelete }) => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const movieRequest = () => {
    searchMoviesByTitle(title)
      .then((result) => {
        if (result.Response === 'True') {
          const moviesFromServer = result.Search.map(movie => ({
              title: movie.Title,
              imgUrl: movie.Poster,
              imdbUrl: `https://www.imdb.com/title/${movie.imdbID}`,
              imdbId: movie.imdbID,
            }
          ))
         setMovies(moviesFromServer);
        } else {
          setTitleError(true);
          setTitle('');
        }
      });
  };

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
    setTitleError(false);
  };

  return (
    <>
      <form className="find-movie">
        <div className="field">
          <label className="label" htmlFor="movie-title">
            Movie title
          </label>

          <div className="control">
            <input
              type="text"
              id="movie-title"
              placeholder="Enter a title to search"
              className={classNames('input', { 'is-danger': titleError })}
              value={title}
              onChange={handleTitleChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  movieRequest();
                }
              }}
            />
          </div>

          {titleError && (
            <p className="help is-danger">
              Can&apos;t find a movie with such a title
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              className="button is-light"
              onClick={movieRequest}
            >
              Find a movie
            </button>
          </div>
        </div>
      </form>

      <div className="movies">
        {movies && (
          movies.map(movie => (
            <MovieCardSearch
              movie={movie}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </>
  );
};

FindMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
