import './sass/main.scss';
import { fetchHits } from './js/fetchHits';
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchImages: document.querySelector('.search-form'),
  loudMoreBtn: document.querySelector('.load-more'),
  cardsGallery: document.querySelector('.gallery'),
};
let page = 1;
let query = '';

refs.searchImages.addEventListener('submit', onSearch);
refs.loudMoreBtn.addEventListener('click', onLoadMore);
refs.loudMoreBtn.classList.add('is-hidden');

function onSearch(e) {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value;
  if (!query) {
    Notify.info("Sorry, there are no images matching your search query. Please try again.");
    refs.cardsGallery.insertAdjacentHTML = ''
  }
  refs.loudMoreBtn.classList.remove('is-hidden');
  page = 1;
  fetchHits(query, page)
    .then(hits => {
      clearHitsContainer();
      renderCardsGallery(hits);
      gallery.refresh();
    });
  refs.searchImages.reset();
}

function onLoadMore() {
  fetchHits(query, page)
    .then(renderCardsGallery);
  page += 1;
  if (page * 40 > 500) {
    refs.loudMoreBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.")
  };
}

function renderCardsGallery(hits) {
  const marcup = hits
    .map(({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) => {
      return `
       <div class="photo-card">
  <a href="${largeImageURL}">
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
  </a>
</div>`
    })
    .join();
  refs.cardsGallery.insertAdjacentHTML('beforeend', marcup);
}

function clearHitsContainer() {
  refs.cardsGallery.innerHTML = '';
}

let gallery = new SimpleLightbox('.photo-card a');
gallery.on('show.simplelightbox', function () {
});
