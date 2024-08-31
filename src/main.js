import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";




import { createGalleryCardTemplate } from "./js/render-functions.js";
import { fetchPhotos } from "./js/pixabay-api.js";


const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');

let lightbox = new SimpleLightbox('.gallery-link');

const showLoader = () => {
  loaderEl.classList.remove('is-hidden');
};

const hideLoader = () => {
  loaderEl.classList.add('is-hidden');
};

const onSearchFormSubmit = async event => {
  try {
   event.preventDefault();

   const searchedValue = searchFormEl.elements.user_query.value.trim();
      if (!searchedValue) {
      iziToast.error({
        message: 'Please enter a search query.',
        position: 'topRight',
      });
      return;
    }

    showLoader();
    
    const response = await fetchPhotos(searchedValue);

    console.log(response);

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
        lightbox.refresh();

  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);