// --- Импорты ------------------
import '../sass/main.scss';
import Notiflix from 'notiflix';
import cardsMarkUpHbs from '../partials/cardsMarkUp.hbs';

import  {Api, hundlerSimpleLightBox, refresher} from './service.js'
// --- Инициализация ------------

const refs = {
  gallery : document.querySelector('.gallery'),
  form : document.getElementById('search-form'),
  header : document.querySelector('.header'),
  scrollTarget : document.querySelector('.scrollTarget'),
}

const service = new Api();

// фиксируем хедер и отступ по низу---------------------------
const { height: pageHeaderHeight } = refs.header.getBoundingClientRect();
document.body.style.paddingTop = `${pageHeaderHeight + 20}px`;
document.body.style.paddingBottom = `20px`;
// -----------------------------------------------------------

// --- Обработка ----------------

const handler = hits => {
  refs.gallery.insertAdjacentHTML('beforeend', cardsMarkUpHbs(hits))
  hundlerSimpleLightBox();
};

const onSubmit = (e) => {
  e.preventDefault(e);

  refs.gallery.innerHTML = '';

  service.searchValue = e.target[0].value;

  try {
    if (service.searchValue === '') {return Notiflix.Notify.failure('No value entered !!!')};
    
    service.resetPage();
    e.target[0].value = '';

    service.fetch()
      .then(response => {
        if (!response.data.hits.length) 
        { Notiflix.Notify.warning(`Sorry, there are no images matching your search query. Please try again.`);
          return};

        Notiflix.Notify.info(`Hooray! We found ${response.data.total} images !!!`);
        handler(response.data.hits)        
      });
    }
  catch (error) {
    console.error(error);
  }
}

// Прокрутка --------------------
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && service.searchValue !== '') {
        service.fetch().then(response => handler(response.data.hits));
  }}
, {});
observer.observe(refs.scrollTarget);
// ------------------------------

// --- Слушатели ----------------
refs.form.addEventListener('submit', onSubmit);

