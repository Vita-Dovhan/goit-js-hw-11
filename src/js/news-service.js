export default class newsApiService {
  constructor() {
    this.form = '';
    this.page = 1;

  }
  fetchHits() {
    return fetch(`https://pixabay.com/api/?key=25313691-12b0cc3e1565a2c76ff5ddf8f&q=${this.form}
    &lang=en&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        this.incrementPage();
        return data.hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.form;
  }
  set query(newQuery) {
    this.form = newQuery;
  }
}