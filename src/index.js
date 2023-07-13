import * as catApi from './cat-api';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const apiKey =
  'live_YawJLsUjmnQm8rwbY3zEDv7xzzZC7eUCMJC6xUYQE16krBAMqyPYecmZ3GM5IP94';

breedSelect.addEventListener('change', handleChange);
breedSelect.classList.add('hidden');
error.classList.add('hidden');

function addList(items) {
  const markup = items
    .map(item => {
      return `<option value=${item.reference_image_id}>${item.name} </option>`;
    })
    .join('');
  breedSelect.innerHTML = markup;
}

//creating post on website with cat name, image and descripion
function addPost(item) {
  const markup = `
  <img class="postImage" src="${item.url}" alt="">
  <div>
    <h1>${item.breeds[0].name}</h1>
    <p>${item.breeds[0].description}</p>
    <p><b>Temperament: </b>${item.breeds[0].temperament}</p>
  </div>
  `;
  catInfo.innerHTML = markup;
}

function handleChange(event) {
  loader.classList.remove('hidden');
  catInfo.classList.add('hidden');
  catApi
    .fetchCatByBreed(event.currentTarget.value)
    .then(function (response) {
      addPost(response);
      loader.classList.add('hidden');
      catInfo.classList.remove('hidden');
      error.classList.add('hidden');
    })
    .catch(function (error) {
      Notiflix.Notify.failure(
        'Upps! Coś poszło nie tak. Odśwież stronę jeszcze raz.'
      );
      error.classList.remove('hidden');
      loader.classList.add('hidden');
      console.log(error);
    });
}

catApi.init(apiKey);
catApi
  .fetchBreeds()
  .then(function (response) {
    addList(response);
    loader.classList.add('hidden');
    breedSelect.classList.remove('hidden');
    error.classList.add('hidden');
    const select = new SlimSelect({
      select: breedSelect,
    });
  })
  .catch(function (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    error.classList.remove('hidden');
    loader.classList.add('hidden');
    console.log(error);
  });
