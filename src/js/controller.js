import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';

const movieContainer = document.querySelector('.movie');
//const API_KEY = '7aa246197b82932d5adb284763498c4d';

const renderSpinner = function (parentEl) {
  const markup = `
    <div class ="spinner">
    <svg>
    <use href= "${icons}#icon-loader"</use>
    </svg>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};
const showMovie = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    renderSpinner(movieContainer);
    //1) Loading movie
    await model.loadMovie(id);
    const { movie } = model.state;

    // 2) Rendering movie
    const markup = `
  <figure class="movie__fig">
          <img src="${movie.image}" alt="${movie.title}" class="movie__img" />
          <h1 class="movie__title">
            <span>${movie.title}</span>
          </h1>
        </figure>

        <div class="movie__details">
          <div class="movie__info">
            <svg class="movie__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="movie__info-data movie__info-data--minutes">${
              movie.runTime
            }</span>
            <span class="movie__info-text">minutes</span>
          </div>
          <div class="movie__info">
            <svg class="movie__info-icon">
              <use href="${icons}#icon-star"></use>
            </svg>
            <span class="movie__info-data movie__info-data--rating">${
              movie.rating
            }</span>
            <span class="movie__info-text">rating</span>
          </div>

          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="movie__overview">
          <h2 class="heading--2">Movie Overview</h2>
          <p class="movie__description">
            ${movie.overview}
          </p>
        </div>

        <div class="movie__details-info">
          <h2 class="heading--2">Movie Information</h2>
          <ul class="movie__details-list">
            <li class="movie__detail">
              <svg class="movie__icon">
                <use href="${icons}#icon-calendar"></use>
              </svg>
              <div class="movie__data">
                <span class="movie__label">Release Date</span>
                <span class="movie__value">${movie.releaseDate}</span>
              </div>
            </li>
            <li class="movie__detail">
              <svg class="movie__icon">
                <use href="${icons}#icon-user"></use>
              </svg>
              <div class="movie__data">
                <span class="movie__label">Director</span>
                <span class="movie__value">${movie.director}</span>
              </div>
            </li>
            <li class="movie__detail">
              <svg class="movie__icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <div class="movie__data">
                <span class="movie__label">Cast</span>
                <span class="movie__value">${movie.actors.join(', ')}</span>
              </div>
            </li>
          </ul>
        </div> 
        `;
    movieContainer.innerHTML = '';
    movieContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showMovie));
