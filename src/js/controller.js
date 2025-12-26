import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import movieView from './views/movieView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

const controlMovies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    movieView.renderSpinner();
    //1) Loading movie
    await model.loadMovie(id);

    // 2) Rendering movie
    movieView.render(model.state.movie);
  } catch (err) {
    movieView.renderError();
  }
};

const conrolSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResult(query);

    // 3) Render results
    //console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  movieView.addHandlerRender(controlMovies);
  searchView.addHandlerSearch(conrolSearchResults);
};

init();
