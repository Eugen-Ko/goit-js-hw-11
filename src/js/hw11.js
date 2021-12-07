// --- Импорты ------------------
import '../sass/main.scss';
import Notiflix from 'notiflix';
import cardsMarkUpHbs from '../partials/cardsMarkUp.hbs';

import  {Api, hundlerSimpleLightBox} from './service.js'

// --- Инициализация ------------

const refs = {
  gallery : document.querySelector('.gallery'),
  form : document.getElementById('search-form'),
}

const service = new Api();

// --- Обработка ----------------

const handler = hits => {
  refs.gallery.insertAdjacentHTML('beforeend', cardsMarkUpHbs(hits))
  hundlerSimpleLightBox();
};

const onSubmit = (e) => {
  e.preventDefault(e);

  service.searchValue = e.target[0].value;

  try {
    if (service.searchValue === '') {return Notiflix.Notify.failure('No value entered')};
    
    service.resetPage();
    service.fetch()
      .then(response => {
        Notiflix.Notify.info(`Found ${response.data.total} photos !!!`);
        handler(response.data.hits)});
    }
  catch (error) {
    console.error(error);
  }
}

// --- Слушатели ----------------
refs.form.addEventListener('submit', onSubmit);