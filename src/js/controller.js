const movieContainer = document.querySelector('.movie');
const API_KEY = '7aa246197b82932d5adb284763498c4d';
import icons from 'url:../img/icons.svg';

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
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const showMovie = async function () {
  try {
    // 1) Loading movie
    renderSpinner(movieContainer);
    await wait(3000);
    const res = await fetch(
      ` https://api.themoviedb.org/3/movie/${674}?api_key=${API_KEY}&append_to_response=credits`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.status_message} (${res.status})`);

    console.log(res, data);
    let movie = data;
    movie = {
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
    console.log(movie);
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
    console.log(data);
    movieContainer.innerHTML = '';
    movieContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};

showMovie();
