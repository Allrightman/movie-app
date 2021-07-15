const MOVIES_URL = 'https://www.omdbapi.com/?apikey=384ef47d&';

export const request = (url, options) => fetch(`${MOVIES_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });

export const remove = url => request(url, { method: 'DELETE' });

export const getMovieByTitle = title => request('t=' + title);

export const searchMoviesByTitle = title => request('s=' + title);
