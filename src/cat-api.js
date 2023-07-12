// Plik: cat-api.js

import axios from 'axios';

// Ustawienie klucza dostępu w nagłówku HTTP dla wszystkich żądań
axios.defaults.headers.common['x-api-key'] =
  'live_YawJLsUjmnQm8rwbY3zEDv7xzzZC7eUCMJC6xUYQE16krBAMqyPYecmZ3GM5IP94';

function fetchBreeds() {
  return new Promise((resolve, reject) => {
    const url = 'https://api.thecatapi.com/v1/breeds';

    // Wyświetlanie animacji ładowania
    const loader = document.querySelector('p.loader');
    loader.style.display = 'block';

    // Ukrywanie listy ras i ewentualnego błędu
    const breedSelect = document.querySelector('select.breed-select');
    breedSelect.style.display = 'none';
    const error = document.querySelector('p.error');
    error.style.display = 'none';

    axios
      .get(url)
      .then(response => {
        const breeds = response.data.map(breed => ({
          value: breed.id,
          label: breed.name,
        }));

        // Ukrywanie animacji ładowania i wyświetlanie listy ras
        loader.style.display = 'none';
        breedSelect.style.display = 'block';

        resolve(breeds);
      })
      .catch(error => {
        // Ukrywanie animacji ładowania i wyświetlanie błędu
        loader.style.display = 'none';
        error.style.display = 'block';
        reject(error);
      });
  });
}

function fetchCatByBreed(breedId) {
  return new Promise((resolve, reject) => {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

    // Wyświetlanie animacji ładowania
    const loader = document.querySelector('p.loader');
    loader.style.display = 'block';

    // Ukrywanie informacji o kocie i ewentualnego błędu
    const catInfo = document.querySelector('div.cat-info');
    catInfo.style.display = 'none';
    const error = document.querySelector('p.error');
    error.style.display = 'none';

    axios
      .get(url)
      .then(response => {
        const cat = response.data[0];

        // Ukrywanie animacji ładowania i wyświetlanie informacji o kocie
        loader.style.display = 'none';
        catInfo.style.display = 'block';

        resolve(cat);
      })
      .catch(error => {
        // Ukrywanie animacji ładowania i wyświetlanie błędu
        loader.style.display = 'none';
        error.style.display = 'block';
        reject(error);
      });
  });
}

export { fetchBreeds, fetchCatByBreed };
