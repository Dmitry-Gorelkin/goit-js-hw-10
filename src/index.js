import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 500;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

function onInput(e) {
  const country = e.target.value;
  clear();

  if (!country.trim()) {
    return;
  }

  fetchCountries(country)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.', {
          timeout: 5000,
        });
      } else if (data.length < 2) {
        oneCountry(data);
      } else {
        allCountry(data);
      }
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name', {
        timeout: 5000,
      });
    });
}

function oneCountry(arr) {
  const country = arr
    .map(({ name, population, capital, languages, flags: { svg } }) => {
      const language = languages.map(e => e.name).join(', ');
      return `<h2><img class="icon" src="${svg}" alt="flag" width="30"/>${name}</h2><p><span>Capital: </span>${capital}</p><p><span>Population: </span>${population}</p><p><span>Languages: </span>${language}</p>`;
    })
    .join('');

  refs.list.insertAdjacentHTML('beforeend', country);
}

function allCountry(arr) {
  const list = arr
    .map(({ name, flags: { svg } }) => {
      return `<li><img class="icon" src="${svg}" alt="flag" width="20" />${name}</li>`;
    })
    .join('');

  refs.list.insertAdjacentHTML('beforeend', list);
}

function clear() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
