import './sass/main.scss';
import NewsApiService from './js/news-service';
import { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchImages: document.querySelector('.search-form'),
  loudMoreBtn: document.querySelector('.load-more'),
  cardsGallery: document.querySelector('.gallery'),
};
const newsApiService = new NewsApiService();

refs.searchImages.addEventListener('submit', onSearch);
refs.loudMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  if (!newsApiService.query) {
    Notify.info('Sorry, there are no images matching your search query. Please try again.');
    refs.cardsGallery.insertAdjacentHTML = ''
  }
  clearHitsContainer();
  newsApiService.resetPage();
  newsApiService.fetchHits().then(renderCardsGallery);
  refs.searchImages.reset();
}
function onLoadMore() {
  newsApiService.fetchHits().then(renderCardsGallery);
}
function renderCardsGallery(hits) {
  const marcup = hits
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `
       <div class="photo-card">
  <img src="${webformatURL}" width ="310" height="160" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`
    })
    .join();
  refs.cardsGallery.insertAdjacentHTML('beforeend', marcup);
}
function clearHitsContainer() {
  refs.cardsGallery.innerHTML = '';
}

// const gallery = new SimpleLightbox('.photo-card div');
// gallery.on('show.simplelightbox', function () {

// });
