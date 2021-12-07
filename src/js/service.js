// --- Импорт ------------------------------
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// --- Класс с обработчиками ---------------
export class Api {
  constructor() {
    this.page = 0;
    this.searchValue = '';
  }
  
  getValue() {
    return this.searchValue;    
  }
  
  saveValue() {
    return this.searchValue = value; 
  }

  getPage() {
    return this.page
  }
  
  incrementPage() {
    this.page +=1;
  }

  resetPage() {
    this.page = 0;
  }

  nextPage() {}

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
}

// --- Просмотрщик изображений --------------
export const hundlerSimpleLightBox = () => {
  return lightbox = new SimpleLightbox(".gallery a", 
  {
    captionSelector: "img", 
  //   captionsData: "alt", 
    captionPosition: "bottom", 
    captionDelay: 250, 
    showCounter: false, 
    scrollZoom: false,     
  }); 
}

