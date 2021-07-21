import { error } from '@pnotify/core';

export function fetchCountries(value) {
  return fetch(`https://restcountries.eu/rest/v2/name/${value}`)
    .then(r => r.json())
    .then(data => data)
    .catch(e => {
      error({
        text: `${e}`,
      });
    });
}
