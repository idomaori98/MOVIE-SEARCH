import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import movieView from './views/movieView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

if (module.hot) {
  module.hot.accept();
}

const controlMovies = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log('=== controlMovies ===');
    console.log('Current hash:', id);
    if (!id) return;
    movieView.renderSpinner();
    // 0)
    resultsView.render(model.getSearchResultsPage());
    bookmarksView.render(model.state.bookmarks);
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
    const data = await model.loadSearchResult(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage(1));

    // 4) Render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotToPage) {
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(gotToPage));

  // 2) render new pagination buttons
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  // 1) Add/ Remove bookmarks
  if (!model.state.movie.bookmarked) {
    model.addBookmark(model.state.movie);
  } else {
    model.deleteBookmark(model.state.movie.id);
  }
  // 2) Render movie view
  movieView.render(model.state.movie);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  movieView.addHandlerRender(controlMovies);
  movieView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(conrolSearchResults);
  paginationView._addHandlerClick(controlPagination);
};

init();
