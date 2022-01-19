import './sass/main.scss';
import NewsApiService from './js/news-service';
import { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchEl: document.querySelector('.search-form'),
  loudMoreBtn: document.querySelector('.load-more'),
  card: document.querySelector('.gallery'),
};
const newsApiService = new NewsApiService();

refs.searchEl.addEventListener('submit', onSearch);
refs.loudMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchHits().then(render);

}
function onLoadMore() {
  newsApiService.fetchHits().then(render);
}


function render(hits) {

  const marcup = hits
    .map(element => {
      return `
       <div class="photo-card">
  <img src="${element.webformatURL}" width ="310" height="160" alt="${element.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${element.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${element.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${element.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${element.downloads}
    </p>
  </div>
</div>`
    })
    .join();
  refs.card.insertAdjacentHTML('beforeend', marcup);
}


const gallery = new SimpleLightbox('.gallery div');
gallery.on('show.simplelightbox', function () {

});
