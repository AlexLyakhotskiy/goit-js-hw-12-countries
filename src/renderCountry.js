import countryTpl from './templates/country.hbs';
import countriesListTpl from './templates/countries-list.hbs';
import { countryContainerEl } from './index';

export function renderCountry(data) {
  countryContainerEl.insertAdjacentHTML('beforeend', countryTpl(data));
}

export function renderCountriesList(data) {
  countryContainerEl.insertAdjacentHTML('beforeend', countriesListTpl(data));
}

export function renderCountryFromList(data) {
  document.querySelector('.countries-list').addEventListener('click', e => {
    if (!e.target.classList.contains('countries-item')) {
      return;
    }
    countryContainerEl.innerHTML = '';
    renderCountry([data[e.target.dataset.index]]);
  });
}
