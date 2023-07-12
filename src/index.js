import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfoBox = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

fetchBreeds(breedSelect);

breedSelect.addEventListener('change', breedChange);

// obsługa stanu ładowania - wyboru rasy
// w trakcie żądanie HTTP wyswietlana jest animacja ładowania - element p.loader

function breedChange(event) {
  loader.classList.remove('is-hidden');
  catInfoBox.classList.add('is-hidden');
  fetchCatByBreed(event.target.value);
}

export { breedSelect, catInfoBox, loader, error };
