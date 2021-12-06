// --- Импорт -------------------
import axios from 'axios';

// --- Класс с обработчиками ----
class Api {
  constructor() {
    this.page = 1;
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
    this.Page +=1;
  }

  nextPage() {}
  
  async fetch() {
      this.incrementPage();
        return await axios.get('https://pixabay.com/api/?key=24625422-32b02834f3df76db1a58654ff', {
      params: {
       q: `${this.serchQuery}`,
       page: `${this.page}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,  
      },
        })
   }
  
  //  incrementPage() {
  //     this.page += 1;
  //  }

  //   resetPage() {
  //     this.page = 1;
  //  }

  //  get query() {
  //     return this.serchQuery;
  //  }

  //  set query(newQuery) {
  //     this.serchQuery = newQuery;
  //  }

}

// --- Экспорт -----------------------

export {Api};