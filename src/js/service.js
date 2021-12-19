// --- Импорт ------------------------------
import '../sass/main.scss';

import cardsMarkUpHbs from '../partials/cardsMarkup.hbs';

import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import  { refs, 
          service,
          notiflixInfo,
          notiflixFailure,
          notiflixWarning,
        } from './hw11';

// --- Класс с обработчиками ---------------
export class Api {
  constructor() {
    this.page = 1;
    this.searchValue = '';
  }
  
  incrementPage() {
    this.page +=1;
  }

  resetPage() {
    this.page = 1;
  }

  async fetch() {
    this.incrementPage();
    return await axios({
      method: 'get',
      url: 'https://pixabay.com/api/', 
      params: { 
        key : '24592652-81dd428b6cc1f580195381066',
        q : `${this.searchValue}`,
        page: `${this.page}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,  
      },
    });
  }
};

// --- Просмотрщик изображений --------------
const hundlerSimpleLightBox = () => {
  const lightbox = new SimpleLightbox(".gallery a", 
  {
    captionSelector: "img", 
  //   captionsData: "alt", 
    captionPosition: "bottom", 
    captionDelay: 250, 
    showCounter: false, 
    scrollZoom: false,     
  }); 
  return lightbox; 
}

// --- фиксируем хедер и отступ по низу---------
export const fixedHeader = () => {
  const { height: pageHeaderHeight } = refs.header.getBoundingClientRect();
  document.body.style.paddingTop = `${pageHeaderHeight + 20}px`;
  document.body.style.paddingBottom = `20px`;
}

// --- Обработка галлереи -------
// export 
const handler = hits => {
  refs.gallery.insertAdjacentHTML('beforeend', cardsMarkUpHbs(hits))
  hundlerSimpleLightBox();
};

// --- Подготовка страницы -------
export const pagePreparation = e => {
  e.preventDefault(e);
  refs.gallery.innerHTML = '';
  service.searchValue = e.target[0].value;
}

// --- Сброс счетчика и поля инпут ----
const refreshConst = (e) => {
  service.resetPage();
  e.target[0].value = '';
};

// --- Обработка ответа -------
const responseHandler = (response) => {
  if (!response.data.hits.length) 
     { return notiflixWarning()}          
  notiflixInfo(response.data.total);
  handler(response.data.hits) 
};

// --- Обработка try ------------
export const tryHandler = (e) => {
  if (service.searchValue === '') {return notiflixFailure};
  refreshConst(e);
  service.fetch()
    .then(response => responseHandler(response))
}

// --- Прокрутка ------------------
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && service.searchValue !== '') {
        service.fetch().then(response => handler(response.data.hits));
  }}
 , {});

export const scrolling = () => {
  observer.observe(refs.scrollTarget);
}
