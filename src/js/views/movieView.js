import icons from 'url:../../img/icons.svg';

class MovieView {
  #parentElement = document.querySelector('.movie');
  #data;
  #errorMessage = 'We could not find the movie. Please try another one!';
  #message = '';
  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
      <div class ="spinner">
      <svg>
      <use href= "${icons}#icon-loader"</use>
      </svg>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this.#errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href ="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
    <p> ${message}</p>
    </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this.#message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href ="${icons}#icon-smile"></use>
        </svg>
      </div>
    <p> ${message}</p>
    </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    return `
      <figure class="movie__fig">
            <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="movie__img" />

            <h1 class="movie__title">
              <span>${this.#data.title}</span>
            </h1>
          </figure>
  
          <div class="movie__details">
            <div class="movie__info">
              <svg class="movie__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="movie__info-data movie__info-data--minutes">${
                this.#data.runTime
              }</span>
              <span class="movie__info-text">minutes</span>
            </div>
            <div class="movie__info">
              <svg class="movie__info-icon">
                <use href="${icons}#icon-star"></use>
              </svg>
              <span class="movie__info-data movie__info-data--rating">${
                this.#data.rating
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
              ${this.#data.overview}
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
                  <span class="movie__value">${this.#data.releaseDate}</span>
                </div>
              </li>
              <li class="movie__detail">
                <svg class="movie__icon">
                  <use href="${icons}#icon-user"></use>
                </svg>
                <div class="movie__data">
                  <span class="movie__label">Director</span>
                  <span class="movie__value">${this.#data.director}</span>
                </div>
              </li>
              <li class="movie__detail">
                <svg class="movie__icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <div class="movie__data">
                  <span class="movie__label">Cast</span>
                  <span class="movie__value">${this.#data.actors.join(
                    ', '
                  )}</span>
                </div>
              </li>
            </ul>
          </div> 
          `;
  }
}
export default new MovieView();
