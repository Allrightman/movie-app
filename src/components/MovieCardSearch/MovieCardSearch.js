import React from 'react';

import './MovieCardSearch.css';

import PropTypes from 'prop-types';

export const MovieCardSearch = ({ movie, onAdd }) => (
  <div className="card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img
          src={movie.imgUrl}
          alt="Film logo"
        />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/IMDb_Logo_Square.svg"
              alt="imdb"
            />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-8">{movie.title}</p>
        </div>
      </div>

      <div className="content">
        {movie.description}
        <br />
        <a href={movie.imdbUrl}>IMDB</a>
      </div>

      <button
        onClick={() => onAdd(movie)}
        className="button is-light"
      >
        Add to favorite
      </button>
    </div>
  </div>
);

MovieCardSearch.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imdbUrl: PropTypes.string.isRequired,
};
