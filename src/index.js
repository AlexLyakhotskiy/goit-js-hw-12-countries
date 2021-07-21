import './sass/main.scss';

import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import countryTpl from './templates/country.hbs';
import countriesListTpl from './templates/countries-list.hbs';

const inputEl = document.querySelector('[data-action="input"]');
const countryContainerEl = document.querySelector('#country-container');

inputEl.addEventListener('input', debounce(onInputInject, 500));

function onInputInject({ target: { value } }) {
  countryContainerEl.innerHTML = '';
  if (!value.trim().length) {
    return;
  }
  fetchCountries(value.trim());
}

export function fetchCountries(value) {
  fetch(`https://restcountries.eu/rest/v2/name/${value}`)
    .then(r => r.json())
    .then(data => findQuatityCountries(data))
    .catch(e => {
      error({
        text: `${e}`,
      });
    });
}

function findQuatityCountries(data) {
  if (data.length === 1) {
    renderCountry(data);
    return;
  }
  if (data.length > 1 && data.length <= 10) {
    renderCountriesList(data);
    renderCountryFromList(data);
    return;
  }
  if (data.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
    return;
  }
  if (data.status === 404) {
    error({
      text: 'Nothing matches found.',
    });
  }
}

function renderCountry(data) {
  countryContainerEl.insertAdjacentHTML('beforeend', countryTpl(data));
}

function renderCountriesList(data) {
  countryContainerEl.insertAdjacentHTML('beforeend', countriesListTpl(data));
}

function renderCountryFromList(data) {
  document.querySelector('.countries-list').addEventListener('click', e => {
    if (!e.target.classList.contains('countries-item')) {
      retrun;
    }
    countryContainerEl.innerHTML = '';
    renderCountry([data[e.target.dataset.index]]);
  });
}
