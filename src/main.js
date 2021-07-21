import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countreTpl from './templates/countre.hbs';
import countriesListTpl from './templates/countries-list.hbs';

const inputEl = document.querySelector('[data-action="input"]');
const countreContainerEl = document.querySelector('#countre-container');

inputEl.addEventListener('input', debounce(onInputInject, 500));

function onInputInject({ target: { value } }) {
  if (value.length === 0) {
    countreContainerEl.innerHTML = '';
    return;
  }
  countreContainerEl.innerHTML = '';
  fetchCountries(value);
}

function fetchCountries(value) {
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
    renderCountre(data);
    return;
  }
  if (data.length > 1 && data.length <= 10) {
    renderCountriesList(data);
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

function renderCountre(data) {
  countreContainerEl.insertAdjacentHTML('beforeend', countreTpl(data));
}

function renderCountriesList(data) {
  const ul = document.createElement('ul');
  ul.classList.add('countries-list');
  ul.insertAdjacentHTML('beforeend', countriesListTpl(data));
  countreContainerEl.append(ul);
}
