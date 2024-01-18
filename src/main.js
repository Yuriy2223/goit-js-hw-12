import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

// 41830108-cae6afe398dec34048fd09339;process.env.API_KEY;
const API_KEY = '41830108-cae6afe398dec34048fd09339';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');
const loadMoreButton = document.querySelector('#load-more-button');

let searchQuery = '';
let page = 1;

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async event => {
  event.preventDefault();

  gallery.innerHTML = '';
  searchQuery = event.currentTarget.elements.query.value;
  page = 1;

  await fetchImages();
});

loadMoreButton.addEventListener('click', fetchImages);

async function fetchImages() {
  loader.classList.remove('hidden');
  loadMoreButton.classList.add('hidden');

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );

    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    const images = response.data.hits.map(image => {
      return `<a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" data-large="${image.largeImageURL}">
              </a>`;
    });

    gallery.insertAdjacentHTML('beforeend', images.join(''));
    lightbox.refresh();

    if (response.data.totalHits <= page * 40) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreButton.classList.remove('hidden');
    }

    page += 1;

    const cardHeight = document
      .querySelector('.gallery a')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
    });
  } finally {
    loader.classList.add('hidden');
  }
}
