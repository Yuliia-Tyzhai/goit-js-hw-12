import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";




import { createGalleryCardTemplate } from "./js/render-functions.js";
import { fetchPhotos } from "./js/pixabay-api.js";


const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');

let currentPage = 1;
let searchedValue = '';
const perPage = 15;

let lightbox = new SimpleLightbox('.gallery-link');

const showLoader = () => {
  loaderEl.classList.remove('is-hidden');
};

const hideLoader = () => {
  loaderEl.classList.add('is-hidden');
};


const getCardHeight = () => {
  const card = document.querySelector('.gallery-card');
  if (card) {
    return card.getBoundingClientRect().height;
  }
  return 0;
};

const scrollPage = () => {
  const cardHeight = getCardHeight();
  if (cardHeight > 0) {
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });
  }
};

const onSearchFormSubmit = async event => {
  try {
   event.preventDefault();

   searchedValue = searchFormEl.elements.user_query.value.trim();
      if (!searchedValue) {
      iziToast.error({
        message: 'Please enter a search query.',
        position: 'topRight',
      });
      return;
    }

    currentPage = 1;
    loadMoreBtnEl.classList.add('is-hidden');
    showLoader();
    
    const response = await fetchPhotos(searchedValue, currentPage);

    hideLoader();
    
    if (response.data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      galleryEl.innerHTML = '';
      searchFormEl.reset();
      return;
    }

  const galleryCardsTemplate = response.data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');
    galleryEl.innerHTML = galleryCardsTemplate;
    loadMoreBtnEl.classList.remove('is-hidden');
    lightbox.refresh();

  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currentPage++;
    const response = await fetchPhotos(searchedValue, currentPage);
    
    const galleryCardsTemplate = response.data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);

    scrollPage();

    const totalHits = response.data.totalHits;
    const totalPages = Math.ceil(totalHits / perPage);
    
 if (currentPage === totalPages) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    
    lightbox.refresh();

  } catch (err) {
    console.log(err);
  }
};
  

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);