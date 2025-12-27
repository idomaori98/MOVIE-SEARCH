import { API_KEY, API_URL, API_SEARCH, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  movie: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
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
  } catch (e) {
    throw e;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_SEARCH}${API_KEY}&query=${query}`);
    console.log(data);
    state.search.results = data.results.map(movie => {
      return {
        id: movie.id,
        rating: movie.rating,
        title: movie.original_title,
        image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        overview: movie.overview,
        rating: movie.vote_average.toFixed(2),
        releaseDate: movie.release_date,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
