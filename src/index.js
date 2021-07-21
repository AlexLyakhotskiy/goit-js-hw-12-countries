import './sass/main.scss';

import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { fetchCountries } from './fetch';
import { renderCountry, renderCountriesList, renderCountryFromList } from './renderCountry';

const inputEl = document.querySelector('[data-action="input"]');
export const countryContainerEl = document.querySelector('#country-container');

inputEl.addEventListener('input', debounce(onInputInject, 500));

function onInputInject({ target: { value } }) {
  countryContainerEl.innerHTML = '';
  if (!value.trim().length) {
    return;
  }

  fetchCountries(value.trim()).then(data => findQuatityCountries(data));
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
