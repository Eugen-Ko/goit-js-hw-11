// --- Импорты ------------------
import '../sass/main.scss';
import Notiflix from 'notiflix';
// import renderCard  from './templase/markup.hbs';
// import {imageOfLightbox} from './js/lightbox.js';
import  {Api} from './service.js'

// --- Инициализация ------------

const refs = {
  gallery : document.querySelector('.gallery'),
  form : document.getElementById('search-form'),
}

const service = new Api();

// --- Обработка ----------------

const onSubmit = (e) => {
  e.preventDefault(e);
  console.log(e.target[0].value);
  service.searchValue = e.target[0].value;

  try {
    if (service.searchValue === '') return Notiflix.Notify.failure('No value entered');  
    
    console.log(response);
    return response;
    }
  catch (error) {
    console.error(error);
  }
}




// --- Слушатели ----------------
refs.form.addEventListener('submit', onSubmit);