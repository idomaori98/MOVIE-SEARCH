import View from './View';
import icons from 'url:../../img/icons.svg';

class AddMovieView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-movie-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-movie');
  _btnClose = document.querySelector('btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _generateMarkup() {}
}
export default new AddMovieView();
