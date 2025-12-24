import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import movieView from './views/movieView.js';

//const API_KEY = '7aa246197b82932d5adb284763498c4d';

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
    alert(err);
  }
};
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlMovies)
);
