import { API_KEY, API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  movie: {},
};
export const loadMovie = async function (id) {
  try {
    const data = await getJSON(
      `${API_URL}${id}?api_key=${API_KEY}&append_to_response=credits`
    );
    const movie = data;
    state.movie = {
      image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      actors: movie.credits.cast
        .slice(0, 5) // Take first 5 actors
        .map(actor => actor.name),
      director:
        movie.credits.crew.find(person => person.job === 'Director')?.name ||
        'Unknown',
      releaseDate: movie.release_date,
      runTime: movie.runtime,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average.toFixed(2),
    };
    console.log(state.movie);
  } catch (e) {
    throw e;
  }
};
