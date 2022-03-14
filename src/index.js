import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import API from './fetchImages ';

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
gallery.style.listStyleType = "none";

const markupHeader = `<h1 class="visually-hidden"></h1>`;
form.insertAdjacentHTML('afterend', markupHeader);
const h1 = document.querySelector('h1')

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

h1.textContent = event.currentTarget.searchQuery.value

    API.fetchImages(event)
    .then(renderImages)
    .catch(onFetchError)
}

function renderImages(images) {
    console.log(images.hits);
    
    if (images.hits.length === 0) {Notify.failure('Sorry, there are no images matching your search query. Please try again.')} else { 
  const markup = images.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<li class="gallery__item"><a class="gallery__link" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
  <ul class="gallery__info"><li><h2>Likes</h2><p>${likes}</p></li><li><h2>Views</h2><p>${views}</p></li><li><h2>Comments</h2><p>${comments}</p></li><li><h2>Downloads</h2><p>${downloads}</p></li></ul>
</a></li>
  `).join('');
  
  gallery.insertAdjacentHTML('afterbegin', markup);
}
}

function onFetchError(error) {
    Notify.failure('Oops, there is no country with that name');
    console.log(error);
};
// function handleSubmit(event) {
//     event.preventDefault();

//     fetch(
//         `https://pixabay.com/api/?key=26121476-a97ee3888781a95bbdf240963&q=${event.currentTarget.searchQuery.value}&image_type=photo&orientation=horizontal&safesearch=true`,
//     )
//     .then(r => r.json())
//     .then(console.log)
// }   

